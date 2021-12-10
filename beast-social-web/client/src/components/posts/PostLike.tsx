import React, { FC, useState } from "react";
import Loader from "../ui/Loader";
import css from "../../assets/scss/modules/Post.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setLikeResponseData,
  setPostLike,
} from "../../store/reducers/PostSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { enumSetLikePage, setLikeDataProps, whoLikedType } from "../../types";

interface PostLikeProps {
  likes: number;
  whoLiked: whoLikedType[];
  postId: string;
  typePage: enumSetLikePage;
}

const PostLike: FC<PostLikeProps> = ({ likes, whoLiked, postId, typePage }) => {
  const dispatch = useAppDispatch();
  const { isAuth, user } = useAppSelector((store) => store.UserReducer);

  const ILikedPost = Boolean(
    isAuth && user
      ? whoLiked.find((whoLikedUser) => whoLikedUser.userId === user.id)
      : false
  );

  const [liked, setLiked] = useState<boolean>(ILikedPost);
  const [qtyLikes, setQtyLikes] = useState<number>(likes);
  const [isLoading, setLoading] = useState<boolean>(false);

  const onLikeHandler = async () => {
    if (!isAuth || !user) return false;
    setLoading(true);

    const setLikeData: setLikeDataProps = {
      postId,
      isLiked: liked,
      whoLiked: user.id,
      typePage,
    };

    dispatch(setPostLike(setLikeData))
      .then(unwrapResult)
      .then((res) => {
        const data = res as setLikeResponseData;

        setLiked((prev) => !prev);
        setQtyLikes(data.qtyLikes);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setLoading(false));
  };

  if (isLoading) {
    return (
      <div className={css.likeLoader}>
        <Loader variant="primary" size="26px" />
      </div>
    );
  }

  return (
    <div
      className={`${css.footerBlock} ${liked ? css.likeBlock__liked : ""}`}
      onClick={onLikeHandler}
    >
      <span className={"material-icons " + css.likeIcon}>
        {liked ? "thumb_up_alt" : "thumb_up_off_alt"}
      </span>
      <span className={css.likeCoun}>{qtyLikes}</span>
    </div>
  );
};

export default PostLike;
