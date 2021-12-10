import { whoLikedType } from "./index";

export default interface IPost {
  _id: string;
  userId: string;
  date: string;
  body: string;
  views: number;
  likes: number;
  fixed?: boolean;
  whoLiked: whoLikedType[];
}
