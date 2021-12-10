import { FC, useLayoutEffect, useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import css from "../../assets/scss/modules/Post.module.scss";
import formatPostDate from "../../utils/formatPostDate";
import PostLike from "./PostLike";
import IPost from "../../types/IPost";
import { useAppSelector } from "../../hooks/redux";
import { Link } from "react-router-dom";
import { enumSetLikePage } from "../../types";
import $api from "../../http";

interface PostProps {
  post: IPost;
  toAuthor: string | null;
  fixed?: boolean;
  removePostHandler?: (id: string) => void;
}

const Post: FC<PostProps> = ({ post, toAuthor, fixed, removePostHandler }) => {
  // redux toolkit store
  const userInfo = useAppSelector((state) => state.UserInfoReducer.userInfo);

  const { selfProfile, selfChecked } = useAppSelector(
    (state) => state.UserReducer
  );
  // state
  const [visibleActions, setVisibleActions] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  // ref and others
  const contentRef = useRef<HTMLDivElement | null>(null);
  const maxHeightText = 170;

  useLayoutEffect(() => {
    const containerHeight = contentRef.current;
    if (containerHeight) {
      setShowMore(containerHeight?.scrollHeight > maxHeightText);
    }
  }, []);

  const removePost = () => {
    if (selfChecked && selfProfile && removePostHandler) {
      removePostHandler(post._id);
    }
  };

  const fixPost = () => {
    $api
      .post("/posts/fixpost", { postId: post._id })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Col xs="12">
      <div className={css.postWrapper}>
        <div className={css.postHeader}>
          <div className={css.headerLeft}>
            <Link to={"/user/" + toAuthor ?? "..."}>
              <img
                src={
                  !userInfo?.avatar
                    ? "http://placehold.it/45"
                    : `${process.env.REACT_APP_SERVER_URL}/images/${userInfo.avatar}`
                }
                alt="user-avatar"
                className={css.userAvatar}
              />
            </Link>

            <div className={css.postInfo}>
              <div
                className={`${css.postAuthor}  ${
                  post?.fixed && css.postAuthorFix
                }`}
              >
                <span>
                  {`${userInfo?.firstName ?? "Без"} ${
                    userInfo?.lastName ?? "Имени"
                  }`}
                </span>
                {fixed && (
                  <span className={`material-icons ${css.postFixedIcon}`}>
                    push_pin
                  </span>
                )}
              </div>
              <span className={css.postDate}>{formatPostDate(post.date)}</span>
            </div>
          </div>

          {selfChecked && selfProfile ? (
            <div
              className={`${css.headerRight}  ${
                visibleActions ? css.headerRight__visible : ""
              }`}
              onMouseOver={() => setVisibleActions(true)}
              onMouseOut={() => setVisibleActions(false)}
            >
              <div className={css.headerActionsMenuToggler}>
                <span className="material-icons">more_horiz</span>
              </div>
              <div className={css.headerActionsMenu}>
                <div className={css.headerActionsMenuItem} onClick={removePost}>
                  Удалить запись
                </div>
                {typeof post?.fixed !== "undefined" &&
                  (!post?.fixed ? (
                    <div
                      className={css.headerActionsMenuItem}
                      onClick={fixPost}
                    >
                      Закрепить запись
                    </div>
                  ) : (
                    <div className={css.headerActionsMenuItem}>
                      Открепить запись
                    </div>
                  ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className={css.postBody}>
          <div className={css.postContent}>
            <p
              className={`${css.postText} ${
                !showMore ? css.postText__full : ""
              }`}
              style={showMore ? { maxHeight: maxHeightText } : {}}
              ref={contentRef}
            >
              {post.body}
            </p>
            {showMore ? (
              <span
                className={css.textBtnFull}
                onClick={() => setShowMore(false)}
              >
                Показать полностью...
              </span>
            ) : null}
          </div>
          <div className={css.postFooterWrapper}>
            <hr className={css.postDriver} />
            <div className={css.postFooter}>
              <div className={`${css.footerBlock} ${css.postViews}`}>
                <span className={"material-icons " + css.viewsIcon}>
                  visibility
                </span>

                <span className={css.viewsCount}>{post.views}</span>
              </div>
              <div className={css.additionalInfo}>
                <span className="material-icons" style={{ alignSelf: "end" }}>
                  chat_bubble_outline
                </span>
                <PostLike
                  likes={post.likes}
                  whoLiked={post.whoLiked}
                  postId={post._id}
                  typePage={enumSetLikePage.postPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default Post;
