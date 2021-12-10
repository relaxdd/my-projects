import { FC } from "react";
import { Link } from "react-router-dom";
import css from "../../assets/scss/modules/friends/FriendItem.module.scss";
import IFriend from "../../types/IFriend";

interface FriendProps {
  friend: IFriend;
}

const FriendItem: FC<FriendProps> = ({ friend }) => {
  return (
    <div className={css.wrapper}>
      <Link to={`/user/${friend.username}`} className={css.avatarWrapper}>
        <img
          src={
            !friend.avatar
              ? "http://placehold.it/60"
              : `${process.env.REACT_APP_SERVER_URL}/images/${friend.avatar}`
          }
          alt="user-avatar"
          className={css.avatarImage}
        />
      </Link>

      <div className={css.userInfo}>
        <Link to={`/user/${friend.username}`} className={css.userLink}>
          {friend.fullName}
        </Link>
        <img
          src={`${process.env.REACT_APP_SERVER_URL}/images/2021/10/interface-pack/more.png`}
          alt="more-actions"
          className={css.moreActions}
        />
      </div>
    </div>
  );
};

export default FriendItem;
