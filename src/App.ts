import { Pages } from "./types/types.ts";
import { LoginPage } from "./pages/Login";
import { Block } from "./core/Block.ts";
import { SignupPage } from "./pages/Signup";
import { ChatsPage } from "./pages/Chats";
import { MOCK_CHATS } from "./api/mockAPI.ts";
import { getFromLS, LSKeys } from "./utils/LS.ts";
import { Chat } from "./components/Chat";
import { ProfilePage } from "./pages/Profile";
import { ProfileChangePage } from "./pages/ProfileChange";
import { PasswordChangePage } from "./pages/PasswordChange";
import { NotFoundPage } from "./pages/NotFound";
import { ErrorPage } from "./pages/Error";

const pagesList: Record<Pages, () => Block> = {
  [Pages.ROOT]: () => new LoginPage(),
  [Pages.LOGIN]: () => new LoginPage(),
  [Pages.SIGNUP]: () => new SignupPage(),
  [Pages.CHATS]: () =>
    new ChatsPage({
      activeChat: getFromLS(LSKeys.LAST_CHAT)
        ? new Chat({
            chat:
              MOCK_CHATS.find(
                (chat) => String(chat.id) === getFromLS(LSKeys.LAST_CHAT),
              ) || MOCK_CHATS[0],
          })
        : null,
    }),
  [Pages.PROFILE]: () => new ProfilePage(),
  [Pages.PROFILE_CHANGE]: () => new ProfileChangePage(),
  [Pages.PASSWORD_CHANGE]: () => new PasswordChangePage(),
  [Pages.NOT_FOUND]: () => new NotFoundPage(),
  [Pages.ERROR]: () => new ErrorPage(),
};

class App {
  state: {
    currentPage: Block;
    openedPopup: null | HTMLElement;
  };
  element: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: pagesList["/"](),
      openedPopup: null,
    };
    this.element = document.getElementById("app");
  }

  render() {
    if (this.element) {
      const pathname = window.location.pathname;
      if (pathname in pagesList) {
        this.state.currentPage = pagesList[pathname as Pages]();
        this.element.innerHTML = "";
        this.element.append(this.state.currentPage.getContent());
      } else {
        this.navigate("/not-found");
      }
    }
  }

  navigate(to: string) {
    window.history.pushState({}, "", to);
    this.render();
  }

  handleUrlChange() {
    window.addEventListener("popstate", () => {
      this.render();
    });
  }
}

export const app = new App();

app.handleUrlChange();

export default app;
