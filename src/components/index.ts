import Handlebars from "handlebars/runtime";

import Button from "./Button/Button.hbs";
import Input from "./Input/Input.hbs";
import SearchInput from "./SearchInput/SearchInput.hbs";
import BackButton from "./ArrowButton/BackButton.hbs";
import ProfileFieldsContainer from "./ProfileFieldsContainer/ProfileFieldsContainer.hbs";
import ProfilePageLayout from "./ProfilePageLayout/ProfilePageLayout.hbs";
import Avatar from "./Avatar/Avatar.hbs";
import Popup from "./Popup/Popup.hbs";
import AvatarEditPopup from "./AvatarEditPopup/AvatarEditPopup.hbs";
import ErrorPageTemplate from "./ErrorPageTemplate/ErrorPageTemplate.hbs";

import "./Button/Button.scss";
import "./Input/Input.scss";
import "./SearchInput/SearchInput.scss";
import "./ArrowButton/ArrowButton.scss";
import "./ProfileFieldsContainer/ProfileFieldsContainer.scss";
import "./ProfilePageLayout/ProfilePageLayout.scss";
import "./Avatar/Avatar.scss";
import "./Popup/Popup.scss";
import "./AvatarEditPopup/AvatarEditPopup.scss";
import "./ErrorPageTemplate/ErrorPageTemplate.scss";

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

export {
  Button,
  Input,
  SearchInput,
  BackButton,
  ProfileFieldsContainer,
  ProfilePageLayout,
  Avatar,
  Popup,
  AvatarEditPopup,
  ErrorPageTemplate,
};
