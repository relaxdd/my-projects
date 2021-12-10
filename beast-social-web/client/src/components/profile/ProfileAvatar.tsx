import { useEffect, useState } from "react";
import { useParams } from "react-router";
import FriendsService from "../../services/FriendsService";
import AvatarButton from "./AvatarButton";
import { paramsItem, TypeRelationEnum } from "../../types";
import AddAvatarModal from "../modal/AddAvatarModal";
import { Link } from "react-router-dom";
import { EDIT_ENUM } from "../../router/pathRoutes";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import css from "../../assets/scss/modules/Profile.module.scss";
import { deleteUserAvatar } from "../../store/reducers/UserInfoSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ProfileAvatar = () => {
  // react store
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((store) => store.UserInfoReducer);
  const { user, selfChecked, selfProfile } = useAppSelector(
    (store) => store.UserReducer
  );
  // state
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [avatarLoading, setAvatarLoading] = useState<boolean>(true);
  const [avatar, setAvatar] = useState<string | null>(userInfo?.avatar ?? null);
  const [relations, setRelation] = useState<string>(TypeRelationEnum.noFriends);
  // params
  const params = useParams<paramsItem>();

  const onHideHandler = () => setModalShow(false);
  const onShowHandler = () => setModalShow(true);

  const changeAvatar = (avatar: string | null = null) => {
    setAvatar(avatar ? SERVER_URL + "/images" + avatar : null);
  };

  const avatarHandler = (avatar = null) => {
    changeAvatar(avatar);
  };

  const deleteAvatarHandle = () => {
    if (!user) return false;

    dispatch(deleteUserAvatar(user.id))
      .then(unwrapResult)
      .then(() => changeAvatar());
  };

  useEffect(() => {
    if (!userInfo) return;
    changeAvatar(userInfo.avatar);
  }, [userInfo]);

  useEffect(() => {
    if (user && !selfProfile && selfChecked) {
      FriendsService.checkTypeRelation(user.id, params.username).then(
        (typeRel) => {
          if (typeRel) setRelation(typeRel);
        }
      );
    }
  }, [params.username, user, selfProfile, selfChecked]);

  const styles = {
    dispaly: avatarLoading ? "none" : "",
    minHeight: avatarLoading ? "255px" : "",
  };

  return (
    <div className={css.originBoxContainer}>
      <div className={css.originBoxWrapper} style={{ padding: "20px" }}>
        <div className={css.userAvatarWrapper}>
          <div style={styles}>
            <img
              src={avatar ?? "http://placehold.it/260"}
              alt="user-avatar"
              style={{ display: avatarLoading ? "none" : "" }}
              className={css.userInfoAvatar}
              onLoad={() => {
                setAvatarLoading(false);
              }}
            />
          </div>
          {selfProfile && (
            <div className={css.userAvatarEditWrapper}>
              <div className={css.userAvatarEdit}>
                <div className={css.avatarEditItem} onClick={onShowHandler}>
                  <img
                    src={`${SERVER_URL}/images/2021/10/cloud-upload-wh.png`}
                    alt="update-avatar"
                    className={css.avatarEditItemImg}
                  />
                  <span className={css.avatarEditItemText}>
                    Обновить фотографию
                  </span>
                </div>
                {avatar && (
                  <div
                    className={css.avatarEditItem}
                    onClick={deleteAvatarHandle}
                  >
                    <img
                      src={`${SERVER_URL}/images/2021/10/cross-wh.png`}
                      alt="remove-avatar"
                      className={css.avatarEditItemImg}
                    />
                    <span className={css.avatarEditItemText}>
                      Удалить фотографию
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {/* TODO: Вынести в отдельный компонент */}
        {user ? (
          selfProfile ? (
            <>
              <Link to={EDIT_ENUM.PRIMARY}>
                <button type="button" className="btn btn-primary w-100 mt-3">
                  Редактировать
                </button>
              </Link>
              <AddAvatarModal
                show={modalShow}
                onHide={onHideHandler}
                setNewAvatar={avatarHandler}
              />
            </>
          ) : (
            <AvatarButton
              relations={relations}
              myId={user.id}
              FriendUsername={params.username}
              setRelation={(rel: string) => setRelation(rel)}
            />
          )
        ) : null}
      </div>
    </div>
  );
};

export default ProfileAvatar;
