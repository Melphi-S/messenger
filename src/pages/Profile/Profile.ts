import { ProfilePageLayout } from "../../components/ProfilePageLayout/ProfilePageLayout.ts";
import { Button } from "../../components/Button/Button.ts";
import app from "../../App.ts";
import { Input } from "../../components/Input/Input.ts";
import { currentUser } from "../../api/mockAPI.ts";

export class ProfilePage extends ProfilePageLayout {
  constructor() {
    super({
      inputs: [
        new Input({
          label: "Email",
          type: "text",
          name: "email",
          value: currentUser.email,
          disabled: true,
          placeholder: "Enter email",
          oneLine: true,
        }),
        new Input({
          label: "Login",
          type: "text",
          name: "login",
          value: currentUser.login || "",
          disabled: true,
          placeholder: "Enter login",
          oneLine: true,
        }),
        new Input({
          label: "First name",
          type: "text",
          name: "first_name",
          value: currentUser.firstName,
          disabled: true,
          placeholder: "Enter first name",
          oneLine: true,
        }),
        new Input({
          label: "Second name",
          type: "text",
          name: "second_name",
          value: currentUser.secondName,
          disabled: true,
          placeholder: "Enter second name",
          oneLine: true,
        }),
        new Input({
          label: "Nickname",
          type: "text",
          name: "display_name",
          value: currentUser.displayName,
          disabled: true,
          placeholder: "Enter second name",
          oneLine: true,
        }),
        new Input({
          label: "Phone",
          type: "text",
          name: "phone",
          value: currentUser.phone,
          disabled: true,
          placeholder: "Enter phone",
          oneLine: true,
        }),
      ],
      buttons: [
        new Button({
          text: "Change your data",
          type: "button",
          view: "secondary",
          events: {
            click: () => {
              app.navigate("/profile-change");
            },
          },
        }),
        new Button({
          text: "Change your password",
          type: "button",
          view: "secondary",
          events: {
            click: () => {
              app.navigate("/password-change");
            },
          },
        }),
        new Button({
          text: "Log out",
          type: "button",
          view: "danger",
          events: {
            click: () => {
              app.navigate("/login");
            },
          },
        }),
      ],
    });
  }
}
