import IPost from "./IPost";
import IUserFull from "./IUserFull";

export default interface IPostWithUser extends IPost {
  userInfo: IUserFull;
}
