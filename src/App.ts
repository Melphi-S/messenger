import { Pages } from "./types/types.ts";
import { TemplateDelegate } from "handlebars/runtime";
import * as components from "./components";
import * as pages from "./pages";

const pagesList: Record<Pages, TemplateDelegate> = {
  [Pages.ROOT]: pages.Login,
  [Pages.LOGIN]: pages.Login,
  [Pages.SIGNUP]: pages.Signup,
  [Pages.CHATS]: pages.Chats,
  [Pages.PROFILE]: pages.Profile,
  [Pages.PROFILE_CHANGE]: pages.ProfileChange,
  [Pages.PASSWORD_CHANGE]: pages.PasswordChange,
  [Pages.NOT_FOUND]: pages.NotFound,
  [Pages.ERROR]: pages.Error,
};

class App {
  state: {
    currentPage: TemplateDelegate<any>;
    openedPopup: null | HTMLElement;
  };
  element: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: pages.Login,
      openedPopup: null,
    };
    this.element = document.getElementById("app");
  }

  render() {
    window.addEventListener("popstate", function () {});
    if (this.element) {
      const pathname = window.location.pathname;
      if (pathname in pagesList) {
        this.state.currentPage = pagesList[pathname as Pages];
        this.element.innerHTML = this.state.currentPage({});
      } else {
        this.state.currentPage = pagesList[Pages.NOT_FOUND];
        this.element.innerHTML = this.state.currentPage({});
      }
      this.addListeners();
    }
  }

  addListeners() {
    const navigationButtons = document.querySelectorAll(
      "button[data-navigate]",
    );
    const avatarEditButton = document.querySelector("#change-avatar");
    const form = document.querySelector("form");

    form &&
      form.addEventListener("submit", (e) => {
        this.navigate(e);
      });

    navigationButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        this.navigate(e);
      });
    });

    const removePopup = () => {
      const popup = document.querySelector(".popup");
      popup && popup.remove();
    };

    avatarEditButton &&
      avatarEditButton.addEventListener("click", () => {
        const page = document.querySelector(".page");
        const popup = components.AvatarEditPopup({});
        page && page.insertAdjacentHTML("beforeend", popup);

        const overlay = document.querySelector(".popup__overlay");
        overlay && overlay.addEventListener("click", removePopup);
      });

    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        removePopup();
      }
    });
  }

  navigate(e: Event) {
    if (e.target && e.target instanceof HTMLElement) {
      e.preventDefault();
      const newPage = e.target.getAttribute("data-navigate") as Pages;
      window.history.pushState({}, "", newPage);
      this.render();
    }
  }

  handleUrlChange() {
    window.addEventListener("popstate", () => {
      this.render();
    });
  }
}

const app = new App();

app.handleUrlChange();

export default app;
