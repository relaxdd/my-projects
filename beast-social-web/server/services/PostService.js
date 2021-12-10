import PostModel from "../models/PostModel.js";
import { DateTime } from "luxon";
import UserModel from "../models/UserModel.js";
import UserInfoModel from "../models/UserInfoModel.js";
import FriendsModel from "../models/FriendsModel.js";
import ApiError from "../exceptions/ApiError.js";
import FullUserDto from "../dtos/FullUserDto.js";

class PostService {
  create = async ({ userId, postBody }) => {
    const newPost = await PostModel.create({
      userId,
      date: DateTime.local(),
      body: postBody,
      fixed: false,
      whoLiked: [],
    });

    return newPost;
  };

  delete = async (id) => {
    const deletedPost = await PostModel.findByIdAndDelete(id);
    return deletedPost;
  };

  findOne = async (userId) => {
    const onePost = await PostModel.findOne({ userId });
    return onePost;
  };

  findAllByUserId = async (userId) => {
    const userPosts = await PostModel.find({ userId });
    return userPosts;
  };

  findAllByUsername = async (username) => {
    const user = await UserModel.findOne({ username });

    if (!user) throw ApiError.NotFound();

    const userPosts = await PostModel.find({ userId: user._id.toHexString() });

    return userPosts;
  };

  // TODO: Когда feeds разростоться, вынести в отдельный компонет
  findAllFeeds = async (userId) => {
    function insertUserInfo(posts, fullDto) {
      const newPosts = posts.map((post) => ({
        ...post._doc,
        userInfo: fullDto,
      }));

      return newPosts;
    }

    const friends = await FriendsModel.findOne({ userId });
    const meUser = await UserModel.findOne({ _id: userId });
    const myInfo = await UserInfoModel.findOne({ userId });
    const myFullDto = new FullUserDto(meUser, myInfo);
    const myPosts = await PostModel.find({ userId });

    if (!myPosts) {
      throw ApiError.BadRequest("Ошибка при получении своих постов");
    }

    const fullMyPosts = insertUserInfo(myPosts, myFullDto);
    const feeds = [...fullMyPosts];

    async function collectFeeds() {
      for (const friend of friends.friendsList) {
        const friendUser = await UserModel.findOne({ _id: friend.userId });
        const friendInfo = await UserInfoModel.findOne({
          userId: friend.userId,
        });

        const friendFullDto = new FullUserDto(friendUser, friendInfo);
        const friendPosts = await PostModel.find({ userId: friend.userId });

        const fullFriendsPosts = insertUserInfo(friendPosts, friendFullDto);

        feeds.push(...fullFriendsPosts);
      }
    }

    await collectFeeds();

    return feeds;
  };

  setLike = async ({ postId, isLiked, whoLiked }) => {
    const post = await PostModel.findOne({ _id: postId });
    post.likes = !isLiked ? post.likes + 1 : post.likes - 1;

    if (!isLiked) {
      post.whoLiked.push({ userId: whoLiked });
    } else {
      post.whoLiked = post.whoLiked.filter(
        (user) => user.userId.toHexString() !== whoLiked
      );
    }

    await post.save();
    return post.likes;
  };

  fixPost = async (postId) => {
    const pinPost = await PostModel.findOne({ fixed: true });

    if (pinPost) {
      pinPost.fixed = false;
    }

    const post = await PostModel.findOne({ _id: postId });
    post.fixed = true

    await pinPost.save();
    await post.save();

    return true;
  };
}

export default new PostService();
