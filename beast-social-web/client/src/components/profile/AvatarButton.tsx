import { FC } from "react";
import FriendsService from "../../services/FriendsService";

interface ProfileButtonProps {
  relations: string;
  myId: string;
  FriendUsername: string;
  setRelation: (rel: string) => void;
}

const AvatarButton: FC<ProfileButtonProps> = ({
  relations,
  myId,
  FriendUsername,
  setRelation,
}) => {
  const addToFriends = async () => {
    const friendRel = await FriendsService.addNewFriend(myId, FriendUsername);
    setRelation(friendRel || "noFriend");
  };

  const cancelFriendRequest = async () => {
    const friendRel = await FriendsService.cancelFriendRequest(
      myId,
      FriendUsername
    );
    setRelation(friendRel || "noFriend");
  };

  const acceptFriendsRequest = async () => {
    const friendRel = await FriendsService.acceptFriendsRequest(
      myId,
      FriendUsername
    );
    setRelation(friendRel || "noFriend");
  };

  const removeFromFriends = async () => {
    const friendRel = await FriendsService.removeFromFriends(
      myId,
      FriendUsername
    );
    setRelation(friendRel || "noFriend");
  };

  switch (relations) {
    case "noFriend":
      return (
        <button
          type="button"
          className="btn btn-primary w-100 mt-3"
          onClick={addToFriends}
        >
          Добавить в друзья
        </button>
      );
    case "ISubscribed":
      return (
        <button
          type="button"
          className="btn btn-primary w-100 mt-3"
          onClick={cancelFriendRequest}
        >
          Отменить заявку
        </button>
      );
    case "subscribedToMe":
      return (
        <button
          type="button"
          className="btn btn-primary w-100 mt-3"
          onClick={acceptFriendsRequest}
        >
          Принять заявку
        </button>
      );
    case "isFriends":
      return (
        <button
          type="button"
          className="btn btn-primary w-100 mt-3"
          onClick={removeFromFriends}
        >
          Удалить из друзей
        </button>
      );
    default:
      return (
        <button
          type="button"
          className="btn btn-primary w-100 mt-3"
          onClick={addToFriends}
        >
          Добавить в друзья
        </button>
      );
  }
};

export default AvatarButton;
