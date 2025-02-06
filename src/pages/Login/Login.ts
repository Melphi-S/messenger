import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { AuthLayout } from "../../components/AuthLayout";
import { validateInput, ValidationRuleKey } from "../../utils/validation.ts";
import app from "../../App.ts";
import { getFormData } from "../../utils/getFormData.ts";

export class LoginPage extends AuthLayout {
  constructor() {
    super({
      title: "Sign in",
      inputs: [
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
      ],
      buttons: [
        new Button({
          view: "primary",
          type: "submit",
          text: "Sign in",
          events: {
            click: (e) => {
              e.preventDefault();

              const inputsToValidate: [string, ValidationRuleKey][] = [
                ["login", "login"],
                ["password", "password"],
              ];

              let hasError = false;

              for (const [name, rule] of inputsToValidate) {
                if (validateInput(this, name, rule)) {
                  hasError = true;
                }
              }

              if (!hasError) {
                const body = getFormData(this);

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
          text: "Create account",
          events: {
            click: (e) => {
              e.preventDefault();
              app.navigate("/signup");
            },
          },
        }),
      ],
    });
  }
}
