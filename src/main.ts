import "./styles/index.scss";
import { Pages } from "./types/types.ts";
import { LoginPage } from "./pages/Login";
import { Block } from "./core/Block.ts";
import { SignupPage } from "./pages/Signup";
import ChatsPage from "./pages/Chats";
import { ProfilePage } from "./pages/Profile";
import { ProfileChangePage } from "./pages/ProfileChange";
import { PasswordChangePage } from "./pages/PasswordChange";
import { NotFoundPage } from "./pages/NotFound";
import { ErrorPage } from "./pages/Error";
import { Router } from "./core/Router.ts";

const pagesList: Record<Pages, typeof Block> = {
  [Pages.ROOT]: LoginPage,
  [Pages.LOGIN]: LoginPage,
  [Pages.SIGNUP]: SignupPage,
  [Pages.CHATS]: ChatsPage,
  [Pages.PROFILE]: ProfilePage,
  [Pages.PROFILE_CHANGE]: ProfileChangePage,
  [Pages.PASSWORD_CHANGE]: PasswordChangePage,
  [Pages.NOT_FOUND]: NotFoundPage,
  [Pages.ERROR]: ErrorPage,
};

export const router = new Router("app");

Object.entries(pagesList).forEach(([key, value]) => {
  router.use(key, value);
});

document.addEventListener("DOMContentLoaded", () => {
  router.start();
});
