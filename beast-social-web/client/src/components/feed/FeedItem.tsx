import { FC, useLayoutEffect, useRef, useState } from "react";
import Col from "react-bootstrap/Col";
// import PostLike from "./PostLike";
import { Link } from "react-router-dom";
import css from "../../assets/scss/modules/Post.module.scss";
import { enumSetLikePage } from "../../types";
import IPostWithUser from "../../types/IPostWithUser";
import formatPostDate from "../../utils/formatPostDate";
import PostLike from "../posts/PostLike";

interface FeedItemProps {
  feed: IPostWithUser;
}

const FeedItem: FC<FeedItemProps> = ({ feed }) => {
  // state
  const [visibleActions, setVisibleActions] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  // ref and others
  const { userInfo } = feed;
  const contentRef = useRef<HTMLDivElement | null>(null);
  const maxHeightText = 170;

  useLayoutEffect(() => {
    const containerHeight = contentRef.current;
    if (containerHeight) {
      setShowMore(containerHeight?.scrollHeight > maxHeightText);
    }
  }, []);

  return (
    <Col xs="12">
      <div className={css.postWrapper}>
        <div className={css.postHeader}>
          <div className={css.headerLeft}>
            <Link to={"/user/" + userInfo.username ?? "..."}>
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
              <span className={css.postAuthor}>
                {`${userInfo?.firstName ?? "Без"} ${
                  userInfo?.lastName ?? "Имени"
                }`}
              </span>
              <span className={css.postDate}>{formatPostDate(feed.date)}</span>
            </div>
          </div>

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
              <div className={css.headerActionsMenuItem}>
                Действие с записью 1
              </div>
              <div className={css.headerActionsMenuItem}>
                Действие с записью 2
              </div>
            </div>
          </div>
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
              {feed.body}
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

                <span className={css.viewsCount}>{feed.views}</span>
              </div>
              <div className={css.additionalInfo}>
                <span className="material-icons" style={{ alignSelf: "end" }}>
                  chat_bubble_outline
                </span>
                <PostLike
                  likes={feed.likes}
                  whoLiked={feed.whoLiked}
                  postId={feed._id}
                  typePage={enumSetLikePage.feedPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default FeedItem;
