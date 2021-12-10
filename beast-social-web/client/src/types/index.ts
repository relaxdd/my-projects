export interface INavItem {
  path: string;
  image: string;
  name: string;
}

export interface whoLikedType {
  userId: string;
}

export enum TypeRelationEnum {
  noFriends = "noFriends",
  ISubscribed = "ISubscribed",
  subscribedToMe = "subscribedToMe",
  isFriends = "isFriends",
}

export interface ITypeRelation {
  friend: string;
  typeRelation: string;
  _id: string;
}

export interface paramsItem {
  username: string;
}

export enum EnumPostsOrderby {
  desc = "desc",
  asc = "asc",
}

export interface newPostProps {
  userId: string;
  postBody: string;
}

export enum enumSetLikePage {
  postPage = "postPage",
  feedPage = "feedPage"
}

export interface setLikeDataProps {
  postId: string;
  isLiked: boolean;
  whoLiked: string;
  typePage: enumSetLikePage;
}

export interface ResError {
  readonly message?: string;
  readonly errors: any[];
}
