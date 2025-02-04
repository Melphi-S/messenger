import { AuthLayout } from "../../components/AuthLayout/AuthLayout.ts";
import { Input } from "../../components/Input/Input.ts";
import {
  validateInput,
  validatePasswordMatch,
  ValidationRuleKey,
} from "../../utils/validation.ts";
import { Button } from "../../components/Button/Button.ts";
import app from "../../App.ts";
import { getFormData } from "../../utils/getFormData.ts";

export class SignupPage extends AuthLayout {
  constructor() {
    super({
      title: "Sign up",
      inputs: [
        new Input({
          label: "Email",
          type: "text",
          name: "email",
          value: "",
          disabled: false,
          placeholder: "Enter email",
          events: {
            blur: () => validateInput(this, "email", "email"),
          },
        }),
        new Input({
          label: "Login",
          type: "text",
          name: "login",
          value: "",
          disabled: false,
          placeholder: "Enter login",
          events: {
            blur: () => validateInput(this, "login", "login"),
          },
        }),
        new Input({
          label: "First name",
          type: "text",
          name: "first_name",
          value: "",
          disabled: false,
          placeholder: "Enter first name",
          events: {
            blur: () => validateInput(this, "first_name", "name"),
          },
        }),
        new Input({
          label: "Second name",
          type: "text",
          name: "second_name",
          value: "",
          disabled: false,
          placeholder: "Enter second name",
          events: {
            blur: () => validateInput(this, "second_name", "name"),
          },
        }),
        new Input({
          label: "Phone",
          type: "text",
          name: "phone",
          value: "",
          disabled: false,
          placeholder: "Enter phone",
          events: {
            blur: () => validateInput(this, "phone", "phone"),
          },
        }),
        new Input({
          label: "Password",
          type: "password",
          name: "password",
          value: "",
          disabled: false,
          placeholder: "Enter password",
          events: {
            blur: () => validateInput(this, "password", "password"),
          },
        }),
        new Input({
          label: "Repeat password",
          type: "password",
          name: "repeat_password",
          value: "",
          disabled: false,
          placeholder: "Enter password again",
          events: {
            blur: () =>
              validateInput(this, "repeat_password", null, () =>
                validatePasswordMatch(this.getElement()),
              ),
          },
        }),
      ],
      buttons: [
        new Button({
          view: "primary",
          type: "submit",
          text: "Sign up",
          events: {
            click: (e) => {
              e.preventDefault();
              const inputsToValidate: [string, ValidationRuleKey][] = [
                ["email", "email"],
                ["login", "login"],
                ["first_name", "name"],
                ["second_name", "name"],
                ["phone", "phone"],
                ["password", "password"],
                ["repeat_password", "password"],
              ];

              let hasError = false;

              for (const [name, rule] of inputsToValidate) {
                const error =
                  name !== "repeat_password"
                    ? validateInput(this, name, rule)
                    : validateInput(this, "repeat_password", null, () =>
                        validatePasswordMatch(this.getElement()),
                      );
                if (error) {
                  hasError = true;
                }
              }

              if (!hasError) {
                const body = getFormData(this, ["repeat_password"]);

                //TODO Change to real API request
                console.log(body);

                app.navigate("/chats");
              }
            },
          },
        }),
        new Button({
          view: "secondary",
          type: "button",
          text: "Sign in",
          events: {
            click: (e) => {
              e.preventDefault();
              app.navigate("/login");
            },
          },
        }),
      ],
    });
  }
}
