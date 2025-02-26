export enum Pages {
  ROOT = "/",
  LOGIN = "/login",
  SIGNUP = "/signup",
  CHATS = "/chats",
  PROFILE = "/profile",
  PROFILE_CHANGE = "/profile-change",
  PASSWORD_CHANGE = "/password-change",
  NOT_FOUND = "/not-found",
  ERROR = "/error",
}

// значением ключа объекта может быть любой тип
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Indexed<T = any> = {
  [key in string]: T;
};
