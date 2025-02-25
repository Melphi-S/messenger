import "./styles/index.scss";
import { Pages } from "./types/types.ts";
import { LoginPage } from "./pages/Login";
import { Block } from "./core/Block.ts";
import { SignupPage } from "./pages/Signup";
import ChatsPage from "./pages/Chats";
import { ProfilePage } from "./pages/Profile";
import ProfileChangePage from "./pages/ProfileChange";
import { PasswordChangePage } from "./pages/PasswordChange";
import { NotFoundPage } from "./pages/NotFound";
import { ErrorPage } from "./pages/Error";
import { Router } from "./core/Router.ts";
import "./utils/handlebarsHelpers.ts";

const pagesList: Record<Pages, { route: typeof Block; auth: boolean }> = {
  [Pages.ROOT]: { route: LoginPage, auth: false },
  [Pages.LOGIN]: { route: LoginPage, auth: false },
  [Pages.SIGNUP]: { route: SignupPage, auth: false },
  [Pages.CHATS]: { route: ChatsPage, auth: true },
  [Pages.PROFILE]: { route: ProfilePage, auth: true },
  [Pages.PROFILE_CHANGE]: { route: ProfileChangePage, auth: true },
  [Pages.PASSWORD_CHANGE]: { route: PasswordChangePage, auth: true },
  [Pages.NOT_FOUND]: { route: NotFoundPage, auth: true },
  [Pages.ERROR]: { route: ErrorPage, auth: true },
};

// export let router: Router;
//
// export const createNewRouter = () => {
//   router = new Router("app");
//
//   Object.entries(pagesList).forEach(([key, value]) => {
//     router.use(key, value.route, value.auth);
//   });
//
//   router.start();
// };
//
// createNewRouter();

export const router = new Router("app");

Object.entries(pagesList).forEach(([key, value]) => {
  router.use(key, value.route, value.auth);
});

document.addEventListener("DOMContentLoaded", () => {
  router.start();
});
