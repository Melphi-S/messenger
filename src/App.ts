import { Pages } from "./types/types.ts";
import { LoginPage } from "./pages/Login/Login.ts";
import { Block } from "./core/Block.ts";
import { SignupPage } from "./pages/Signup/Signup.ts";
import { ChatsPage } from "./pages/Chats/Chats.ts";
import { MOCK_CHATS } from "./api/mockAPI.ts";
import { getFromLS, LSKeys } from "./utils/LS.ts";
import { Chat } from "./components/Chat/Chat.ts";

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
  // [Pages.PROFILE]: pages.Profile,
  // [Pages.PROFILE_CHANGE]: pages.ProfileChange,
  // [Pages.PASSWORD_CHANGE]: pages.PasswordChange,
  // [Pages.NOT_FOUND]: pages.NotFound,
  // [Pages.ERROR]: pages.Error,
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
      }
    }
  }

  // addListeners() {
  //   const navigationButtons = document.querySelectorAll(
  //     "button[data-navigate]",
  //   );
  //   const avatarEditButton = document.querySelector("#change-avatar");
  //   const form = document.querySelector("form");
  //
  //   form &&
  //     form.addEventListener("submit", (e) => {
  //       this.navigate(e);
  //     });
  //
  //   navigationButtons.forEach((button) => {
  //     button.addEventListener("click", (e) => {
  //       this.navigate(e);
  //     });
  //   });
  //
  //   const removePopup = () => {
  //     const popup = document.querySelector(".popup");
  //     popup && popup.remove();
  //   };
  //
  //   avatarEditButton &&
  //     avatarEditButton.addEventListener("click", () => {
  //       const page = document.querySelector(".page");
  //       const popup = components.AvatarEditPopup({});
  //       page && page.insertAdjacentHTML("beforeend", popup);
  //
  //       const overlay = document.querySelector(".popup__overlay");
  //       overlay && overlay.addEventListener("click", removePopup);
  //     });
  //
  //   document.addEventListener("keyup", (e) => {
  //     if (e.key === "Escape") {
  //       removePopup();
  //     }
  //   });
  // }

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
