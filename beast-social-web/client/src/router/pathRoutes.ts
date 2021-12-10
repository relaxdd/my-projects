export const FEED_PATH = "/feed";
export const USER_PATH = "/user";
export const FRIENDS_PATH = "/friends";
export const PHOTOS_PATH = "/photos";
export const TRACKS_PATH = "/audio";
export const EDIT_PATH = "/edit";

export const EDIT_ENUM = {
  PRIMARY: `${EDIT_PATH}/primary`,
  CONTACTS: `${EDIT_PATH}/contacts`,
  ACCESS: `${EDIT_PATH}/access`,
} as const;
