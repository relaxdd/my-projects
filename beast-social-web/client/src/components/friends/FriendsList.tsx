import React, { useEffect, useState } from "react";
import css from "../../assets/scss/modules/friends/Friends.module.scss";
import { useAppSelector } from "../../hooks/redux";
import FriendsService from "../../services/FriendsService";
import IFriend from "../../types/IFriend";
import Loader from "../ui/Loader";
import FriendItem from "./FriendItem";

const FriendsList: React.FC = () => {
  // redux store
  const { user } = useAppSelector((store) => store.UserReducer);
  // state
  const [friends, setFriends] = useState<IFriend[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) return;

    FriendsService.getMyFriends(user.id)
      .then((friends) => setFriends(friends ?? []))
      .finally(() => setLoading(false));
  }, [user]);

  if (isLoading) {
    return (
      <div className="text-center my-4">
        <Loader />
      </div>
    );
  }

  return (
    <div className={css.originBoxWrapper}>
      <div className={css.originBoxHeader}>Мои друзья</div>
      <div className={css.originBoxContent}>
        {friends.length ? (
          friends.map((friend) => (
            <FriendItem friend={friend} key={friend.userId} />
          ))
        ) : (
          <p>Вы не добавили ни одного друга</p>
        )}
      </div>
    </div>
  );
};

export default FriendsList;
