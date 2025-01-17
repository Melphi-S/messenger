import { Pages } from "./types/types.ts";
import Handlebars, { TemplateDelegate } from "handlebars/runtime";
import "./components/Button/Button.scss";
import "./components/Input/Input.scss";
import "./components/SearchInput/SearchInput.scss";
import "./components/BackButton/BackButton.scss";
import "./components/ProfileFieldsContainer/ProfileFieldsContainer.scss";
import "./components/ProfilePageLayout/ProfilePageLayout.scss";
import "./components/Avatar/Avatar.scss";
import "./components/Popup/Popup.scss";
import "./components/AvatarEditPopup/AvatarEditPopup.scss";
import "./components/ErrorPageTemplate/ErrorPageTemplate.scss";

import Login from "./pages/Login/Login.hbs";
import Signup from "./pages/Signup/Signup.hbs";
import Chats from "./pages/Chats/Chats.hbs";
import Profile from "./pages/Profile/Profile.hbs";
import ProfileChange from "./pages/ProfileChange/ProfileChange.hbs";
import PasswordChange from "./pages/PasswordChange/PasswordChange.hbs";
import NotFound from "./pages/NotFound/NotFound.hbs";
import Error from "./pages/Error/Error.hbs";
import "./pages/Chats/Chats.scss";
import "./pages/Profile/Profile.scss";

import Button from "./components/Button/Button.hbs";
import Input from "./components/Input/Input.hbs";
import SearchInput from "./components/SearchInput/SearchInput.hbs";
import BackButton from "./components/BackButton/BackButton.hbs";
import ProfileFieldsContainer from "./components/ProfileFieldsContainer/ProfileFieldsContainer.hbs";
import ProfilePageLayout from "./components/ProfilePageLayout/ProfilePageLayout.hbs";
import Avatar from "./components/Avatar/Avatar.hbs";
import Popup from "./components/Popup/Popup.hbs";
import AvatarEditPopup from "./components/AvatarEditPopup/AvatarEditPopup.hbs";
import ErrorPageTemplate from "./components/ErrorPageTemplate/ErrorPageTemplate.hbs";

Handlebars.registerPartial("Button", Button);
Handlebars.registerPartial("Input", Input);
Handlebars.registerPartial("SearchInput", SearchInput);
Handlebars.registerPartial("BackButton", BackButton);
Handlebars.registerPartial("ProfileFieldsContainer", ProfileFieldsContainer);
Handlebars.registerPartial("ProfilePageLayout", ProfilePageLayout);
Handlebars.registerPartial("Avatar", Avatar);
Handlebars.registerPartial("Popup", Popup);
Handlebars.registerPartial("AvatarEditPopup", AvatarEditPopup);
Handlebars.registerPartial("ErrorPageTemplate", ErrorPageTemplate);

const pagesList: Record<Pages, TemplateDelegate> = {
  [Pages.ROOT]: Login,
  [Pages.LOGIN]: Login,
  [Pages.SIGNUP]: Signup,
  [Pages.CHATS]: Chats,
  [Pages.PROFILE]: Profile,
  [Pages.PROFILE_CHANGE]: ProfileChange,
  [Pages.PASSWORD_CHANGE]: PasswordChange,
  [Pages.NOT_FOUND]: NotFound,
  [Pages.ERROR]: Error,
};

class App {
  state: {
    currentPage: TemplateDelegate<any>;
    openedPopup: null | HTMLElement;
  };
  element: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: Login,
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
    const navigationButtons = document.querySelectorAll("[data-navigate]");
    const avatarEditButton = document.querySelector("#change-avatar");

    navigationButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        if (e.target && e.target instanceof HTMLElement) {
          e.preventDefault();
          const newPage = e.target.getAttribute("data-navigate") as Pages;
          window.history.pushState({}, "", newPage);
          this.render();
        }
      });
    });

    const removePopup = () => {
      const popup = document.querySelector(".popup");
      popup && popup.remove();
    };

    avatarEditButton &&
      avatarEditButton.addEventListener("click", () => {
        const page = document.querySelector(".page");
        const popup = AvatarEditPopup({});
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

  handleUrlChange() {
    window.addEventListener("popstate", () => {
      this.render();
    });
  }
}

const app = new App();

app.handleUrlChange();

export default app;
