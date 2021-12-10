import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import css from "../../assets/scss/modules/PostList.module.scss";
import { PostContext } from "../../Contexts";
import { useAppSelector } from "../../hooks/redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import PreviewImg from "./form/PreviewImg";
// Date.now().toString(36) + Math.random().toString(36).substr(2)

const PostForm = ({ toAuthor }: { toAuthor: string }) => {
  const { userInfo } = useAppSelector((state) => state.UserInfoReducer);
  const { addPostHandler } = useContext(PostContext);
  // state
  const [newPost, setNewPost] = useState<string>("");
  const [visibleFull, setVisible] = useState<boolean>(false);
  // images
  const [postImages, setPostImages] = useState<string[]>([]);
  const [_, setPostFiles] = useState<File[]>([]);
  const [imagesList, setImagesList] = useState<HTMLImageElement[]>([]);
  const [countList, setCountList] = useState<number>(0);
  // ref
  const formRef = useRef<HTMLTextAreaElement | null>(null);
  const postFormRef = useRef<HTMLDivElement | null>(null);
  const loadImagesRef = useRef<HTMLInputElement | null>(null);
  const imgWrapperRef = useRef<HTMLDivElement | null>(null);
  // others
  const SERVER = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

  useOutsideClick(postFormRef, () => {
    if (newPost) return false;
    setVisible(false);
  });

  const imageClickHanler = () => {
    if (loadImagesRef?.current) {
      setPostImages([]);
      setImagesList([]);
      loadImagesRef?.current.click();
    }
  };

  const addPostProccessing = async () => {
    if (!newPost) return false;
    await addPostHandler(newPost);
    setNewPost("");
    setVisible(false);
    if (formRef) formRef?.current?.removeAttribute("style");
  };

  // ChangeEvent<HTMLTextAreaElement> само по себе перестало работать
  const resize = (_e: any) => {
    const event = _e || window.event;
    const getElement = event.target;

    if (getElement) {
      getElement.style.height = "auto";
      getElement.style.height =
        Math.max(getElement.scrollHeight, getElement.offsetHeight) + "px";
    }
  };

  const selectFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    setCountList(files.length);

    files.forEach((file) => {
      if (!file.type.match("image")) return;
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (!e.target) throw new Error("Ошибка во время чтения файла!");
        const result = e.target.result as string;

        setPostImages((prev) => [...prev, result]);
        setPostFiles((prev) => [...prev, file]);
      };

      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    setCountList(postImages.length);
  }, [postImages]);

  const fillArr = (node: HTMLImageElement) => {
    setImagesList((prev) => [...prev, node]);
  };

  useEffect(() => {
    if (countList < 2 || countList > 3 || !imgWrapperRef.current) return;

    if (imagesList.length === countList) {
      const imgWrapper = imgWrapperRef.current as HTMLDivElement;
      const imgWrapperGap = parseInt(getComputedStyle(imgWrapper).gap);
      let totalWidth = 0;

      const wrapperWidth =
        Number(imgWrapper.getBoundingClientRect().width.toFixed(2)) -
        imgWrapperGap * (countList - 1);

      imagesList.forEach((img) => {
        totalWidth += Number(img.getBoundingClientRect().width.toFixed(2));
      });

      const maxHeightWrap = wrapperWidth / (totalWidth / 190);

      imagesList.forEach((img) => {
        img.style.maxHeight = `${maxHeightWrap}px`;
      });
    }
  }, [imagesList, countList]);

  const removePreviewImg = (i: number) => {
    setPostImages((prev) => prev.filter((_, ind) => ind !== i));
    setImagesList((prev) => prev.filter((_, ind) => ind !== i));
  };

  return (
    <div className={css.postFormWrapper} ref={postFormRef}>
      <div className={css.postFormContent}>
        <div>
          <div className={css.postFormTop}>
            <Link to={"/user/" + toAuthor}>
              <img
                src={
                  !userInfo?.avatar
                    ? "http://placehold.it/35"
                    : `${process.env.REACT_APP_SERVER_URL}/images/${userInfo.avatar}`
                }
                alt="user-avatar"
                className={css.postFormAvatar}
              />
            </Link>
            <textarea
              className={css.postFormInput}
              placeholder="Что у вас нового?"
              rows={1}
              value={newPost}
              onFocus={() => setVisible(true)}
              onInput={(e: ChangeEvent<HTMLTextAreaElement>) => {
                setNewPost(e.target.value);
                resize(e);
              }}
              ref={formRef}
            />
          </div>
          <div
            className={css.previewImageWrapper}
            ref={imgWrapperRef}
            style={{ display: Boolean(postImages.length) ? "flex" : "none" }}
          >
            {postImages.map((img, i) => {
              return (
                <PreviewImg
                  img={img}
                  i={i}
                  length={countList}
                  fillArr={fillArr}
                  removePreviewImg={removePreviewImg}
                  key={i}
                />
              );
            })}
          </div>
        </div>

        {visibleFull && (
          <>
            <hr className={css.postFormDriver} />
            <div className={css.postFormBottom}>
              <div className={css.postFormWidgets}>
                <div
                  className={css.postFormWidgetsItem}
                  title="Добавить в пост фотографию"
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={selectFiles}
                    ref={loadImagesRef}
                    className="d-none"
                  />
                  <img
                    src={`${SERVER}/icons/camera.png`}
                    alt="add-photos"
                    onClick={imageClickHanler}
                  />
                </div>
                <div
                  className={css.postFormWidgetsItem}
                  title="Добавить в пост трек"
                >
                  <img
                    src={`${SERVER}/icons/musical-note.png`}
                    alt="add-music"
                    style={{ height: 21 }}
                  />
                </div>
                <div
                  className={css.postFormWidgetsItem}
                  title="Открыть в редакторе"
                  style={{ marginLeft: 6 }}
                >
                  <img
                    src={`${SERVER}/icons/html-editor.png`}
                    alt="add-music"
                    style={{ height: 22 }}
                  />
                </div>
              </div>
              <div className={css.postFormShare}>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!Boolean(newPost)}
                  onClick={() => addPostProccessing()}
                >
                  Поделиться
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostForm;
