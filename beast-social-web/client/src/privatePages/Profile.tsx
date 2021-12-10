import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import PostList from "../components/posts/PostsList";
import ProfileTopInfo from "../components/profile/ProfileTopInfo";
import ProfileAvatar from "../components/profile/ProfileAvatar";
import Loader from "../components/ui/Loader";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchUserInfoByName } from "../store/reducers/UserInfoSlice";
import {
  addNewPost,
  fetchPostsByName,
  removePost,
} from "../store/reducers/PostSlice";
import { newPostProps, paramsItem } from "../types";
import { setSelfProfile } from "../store/reducers/UserSlice";

const Profile = () => {
  // redux store
  const dispatch = useAppDispatch();
  const { isUserInfoLoading } = useAppSelector(
    (store) => store.UserInfoReducer
  );
  const { posts, isPostsLoading } = useAppSelector(
    (store) => store.PostReducer
  );
  const { user, selfProfile } = useAppSelector((store) => store.UserReducer);
  // other
  const params = useParams<paramsItem>();

  useEffect(() => {
    const promisePost = dispatch(fetchPostsByName(params.username));
    const promiseUser = dispatch(fetchUserInfoByName(params.username));

    return () => {
      promisePost.abort();
      promiseUser.abort();
    };
  }, [params.username, dispatch]);

  // Тут было определение selfProfile ? -> setAuthor || setUserInfo

  useEffect(() => {
    if (!user) return;
    dispatch(setSelfProfile(user.username === params.username));
  }, [user, params.username, dispatch]);

  // useEffect(() => {
  //   if (selfChecked) {
  //     getUserInfo(selfProfile, () => {
  //       setAuthor(selfProfile ? userInfo : weAsGuest);
  //     });
  //   }
  //   // eslint-disable-next-line
  // }, [selfProfile, selfChecked]);

  // useEffect(() => {
  //   if (!isLoading) getPosts();
  //   // eslint-disable-next-line
  // }, [page, params.username]);

  if (isUserInfoLoading) {
    return (
      <div className="text-center mb-4">
        <Loader />
      </div>
    );
  }

  const addPostHandler = async (postBody: string) => {
    if (!user) return false;

    const newPost: newPostProps = { userId: user.id, postBody };
    dispatch(addNewPost(newPost));
  };

  const removePostHandler = async (id: string) => {
    dispatch(removePost(id));
  };

  const changePage = () => {
    // args -> page: number
    console.log("Смена страницы");
  };

  return (
    <Row>
      <Col xs="8">
        <ProfileTopInfo />
        {/* Данные о госте мы будет сетить в стор */}
        {!isPostsLoading && posts ? (
          <PostList
            toAuthor={selfProfile ? params.username : "..."}
            posts={posts}
            setPage={changePage}
            addPostHandler={addPostHandler}
            removePostHandler={removePostHandler}
            formVisible={selfProfile}
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

export default Profile;
