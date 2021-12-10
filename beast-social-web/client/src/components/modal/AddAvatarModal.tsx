import { useRef, useState, ChangeEvent } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import css from "../../assets/scss/modules/AddAvatar.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { updateUserAvatar } from "../../store/reducers/UserInfoSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { IUserDto } from "../../types/IUser";

interface AddAvatarModalProps {
  setNewAvatar: (avatar: any) => void;
  onHide: () => void;
  show: boolean;
}

function AddAvatarModal({ setNewAvatar, ...props }: AddAvatarModalProps) {
  // redux store
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.UserReducer.user) as IUserDto;
  // state
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onClickHanle = () => {
    if (fileInputRef?.current) fileInputRef?.current.click();
  };

  const clearFile = () => {
    setFile(null);
    setImage(null);
  };

  const onHideModal = () => {
    props.onHide();
    setTimeout(() => clearFile(), 300);
  };

  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (!e.target) throw new Error("Ошибка во время чтения файла!");

      const result = e.target.result as string;

      setFile(file);
      setImage(result);
    };

    reader.readAsDataURL(file);
  };

  const uploadFile = () => {
    const formData = new FormData();

    formData.append("userId", user.id);
    formData.append("image", file as File);

    dispatch(updateUserAvatar(formData))
      .then(unwrapResult)
      .then((avatar) => {
        setNewAvatar(avatar);
      })
      .finally(() => onHideModal());
  };

  return (
    <Modal
      {...props}
      onHide={onHideModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className={css.newAvatarTitle}>
          Загрузка новой фотографии
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center py-4">
        {file && image ? (
          <>
            <div>
              <img
                src={image}
                alt="file"
                style={{ height: "auto", maxWidth: "100%" }}
              />
            </div>
            <div className={css.fileData}>
              <p className={css.fileName}>{file.name}</p>
            </div>
          </>
        ) : (
          <>
            <p className="mb-4">
              Вы можете загрузить изображение только в формате JPG или PNG.
            </p>
            <input
              type="file"
              accept="image/png,image/jpeg"
              className="d-none"
              onChange={selectFile}
              ref={fileInputRef}
            />
            <Button onClick={onClickHanle}>Выбрать файл</Button>
          </>
        )}
      </Modal.Body>
      {file ? (
        <Modal.Footer>
          <Button variant="secondary" onClick={clearFile}>
            Вернуться
          </Button>
          <Button variant="primary" onClick={uploadFile}>
            Сохранить
          </Button>
        </Modal.Footer>
      ) : (
        <Modal.Footer className="justify-content-center">
          <span style={{ fontSize: 14 }}>
            Если у вас возникают проблемы с загрузкой, попробуйте выбрать
            фотографию меньшего размера.
          </span>
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default AddAvatarModal;
