import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import PostList from "../components/posts/PostsList";
import ProfileAvatar from "../components/profile/ProfileAvatar";
import ProfileTopInfo from "../components/profile/ProfileTopInfo";
import Loader from "../components/ui/Loader";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchPostsByName } from "../store/reducers/PostSlice";
import {
  fetchUserInfoByName,
  fetchUserInfoByNameReject,
} from "../store/reducers/UserInfoSlice";
import { setSelfProfile } from "../store/reducers/UserSlice";
import { paramsItem } from "../types";

const ProfileN = () => {
  // redux toolkit
  const dispatch = useAppDispatch();
  // redux store
  const { isUserInfoLoading } = useAppSelector(
    (store) => store.UserInfoReducer
  );
  const { posts, isPostsLoading } = useAppSelector(
    (store) => store.PostReducer
  );
  // history
  const params = useParams<paramsItem>();
  const history = useHistory<History>();

  useEffect(() => {
    dispatch(setSelfProfile(false));

    const promiseUser = dispatch(fetchUserInfoByName(params.username));
    const promisePost = dispatch(fetchPostsByName(params.username));

    promiseUser.then(unwrapResult).catch((err: fetchUserInfoByNameReject) => {
      if (err.status === 404) history.push("/");
    });

    return () => {
      promiseUser.abort();
      promisePost.abort();
    };
  }, [params.username, dispatch, history]);

  if (isUserInfoLoading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  const changePage = () => {
    // args -> page: number
    console.log("Смена страницы");
  };

  return (
    <Row>
      <Col xs="8">
        <ProfileTopInfo />
        {!isPostsLoading && posts ? (
          <PostList
            toAuthor={params.username}
            posts={posts}
            setPage={changePage}
          />
        ) : (
          <div className="text-center mb-4">
            <Loader variant="warning" />
          </div>
        )}
      </Col>
      <Col xs="4">
        <ProfileAvatar />
      </Col>
    </Row>
  );
};

export default ProfileN;
