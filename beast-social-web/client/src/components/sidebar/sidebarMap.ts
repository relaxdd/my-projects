import {
  FEED_PATH,
  FRIENDS_PATH,
  PHOTOS_PATH,
  TRACKS_PATH,
} from "../../router/pathRoutes";
import { INavItem } from "../../types";

const sidebarMap: INavItem[] = [
  {
    path: FEED_PATH,
    image: "/2021/10/interface-pack/newspaper.png",
    name: "Новости",
  },
  {
    path: FRIENDS_PATH,
    image: "/2021/10/add-friend.png",
    name: "Друзья",
  },
  {
    path: PHOTOS_PATH,
    image: "/2021/10/interface-pack/picture.png",
    name: "Фотографии",
  },
  {
    path: TRACKS_PATH,
    image: "/2021/10/musical-note.png",
    name: "Музыка",
  },
];

export default sidebarMap;
