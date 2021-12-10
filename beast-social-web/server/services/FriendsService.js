import FriendsModel from "../models/FriendsModel.js";
import UserModel from "../models/UserModel.js";
import ApiError from "../exceptions/ApiError.js";

class FriendsService {
  addNewFriend = async ({ fromId, toUsername }) => {
    const user = await UserModel.findOne({ username: toUsername });

    let friends = await FriendsModel.findOne({ userId: fromId });
    let friends2 = await FriendsModel.findOne({
      userId: user._id,
    });

    const checkFriend = friends2.friendsList.find(
      (friend) => friend.userId === fromId
    );

    if (checkFriend) {
      throw ApiError.BadRequest(
        "Пользователь уже подписан на вас, обновите страницу"
      );
    }

    // Товарищ
    friends2.friendsList.push({
      userId: fromId,
      typeRelation: "subscribedToMe",
    });

    // Я
    friends.friendsList.push({
      userId: user._id,
      typeRelation: "ISubscribed",
    });

    await friends2.save();
    await friends.save();

    const currFriend = friends.friendsList.find(
      (friend) => friend.userId.toHexString() === user._id.toHexString()
    );

    return currFriend.typeRelation;
  };

  acceptFriendsRequest = async ({ fromId, toUsername }) => {
    const { _id } = await UserModel.findOne({ username: toUsername });

    const friends = await FriendsModel.findOne({ userId: fromId });
    const friends2 = await FriendsModel.findOne({ userId: _id.toHexString() });

    const currFriend = friends.friendsList.find(
      (friend) => friend.userId.toHexString() === _id.toHexString()
    );

    const currFriend2 = friends2.friendsList.find(
      (friend) => friend.userId.toHexString() === fromId
    );

    currFriend.typeRelation = "isFriends";
    currFriend2.typeRelation = "isFriends";

    await friends.save();
    await friends2.save();

    return currFriend.typeRelation;
  };

  removeFromFriends = async ({ fromId, toUsername }) => {
    const { _id } = await UserModel.findOne({ username: toUsername });

    const friends = await FriendsModel.findOne({ userId: fromId });
    const friends2 = await FriendsModel.findOne({ userId: _id.toHexString() });

    const currFriend = friends.friendsList.find(
      (friend) => friend.userId.toHexString() === _id.toHexString()
    );

    const currFriend2 = friends2.friendsList.find(
      (friend) => friend.userId.toHexString() === fromId
    );

    currFriend.typeRelation = "subscribedToMe";
    currFriend2.typeRelation = "ISubscribed";

    await friends.save();
    await friends2.save();

    return currFriend.typeRelation;
  };

  cancelFriendRequest = async ({ fromId, toUsername }) => {
    const user = await UserModel.findOne({ username: toUsername });

    const friends = await FriendsModel.findOne({ userId: fromId });
    const friends2 = await FriendsModel.findOne({
      userId: user._id.toHexString(),
    });

    function removeFromMyFriends() {
      friends.friendsList = friends.friendsList.filter(
        (friend) => friend.userId.toHexString() !== user._id.toHexString()
      );
    }

    const chechFriend = friends2.friendsList.find(
      (friend) => friend.userId.toHexString() === fromId
    );

    // Проверка на то что если друг принял дружбы а мы хотим отменить ее
    if (!chechFriend) {
      removeFromMyFriends();
      await friends.save();

      return "noFriends";
    }

    if (chechFriend.typeRelation === "isFriends") {
      return "isFriends";
    }

    // Иначе удаляем
    removeFromMyFriends();

    friends2.friendsList = friends2.friendsList.filter(
      (friend) => friend.userId.toHexString() !== fromId
    );

    await friends.save();
    await friends2.save();

    return "noFriends";
  };

  checkTypeRelation = async ({ fromId, toUsername }) => {
    const { _id } = await UserModel.findOne({ username: toUsername });
    const friends = await FriendsModel.findOne({ userId: fromId });
    const noFriends = "noFriends";

    if (!friends) return noFriends;

    const currFriend = friends.friendsList.find(
      (friend) => friend.userId.toHexString() === _id.toHexString()
    );

    if (!currFriend) return noFriends;

    return currFriend.typeRelation;
  };
}

export default new FriendsService();
