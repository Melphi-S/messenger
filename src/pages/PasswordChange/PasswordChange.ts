import { ProfilePageLayout } from "../../components/ProfilePageLayout/ProfilePageLayout.ts";
import { Button } from "../../components/Button/Button.ts";
import { Input } from "../../components/Input/Input.ts";
import {
  validateInput,
  validatePasswordMatch,
  ValidationRuleKey,
} from "../../utils/validation.ts";
import { getFormData } from "../../utils/getFormData.ts";
import app from "../../App.ts";

export class PasswordChangePage extends ProfilePageLayout {
  constructor() {
    super({
      inputs: [
        new Input({
          label: "Current password",
          type: "password",
          name: "current_password",
          value: "",
          disabled: false,
          placeholder: "Enter current password",
          oneLine: true,
          events: {
            blur: () => validateInput(this, "current_password", "password"),
          },
        }),
        new Input({
          label: "New password",
          type: "password",
          name: "password",
          value: "",
          disabled: false,
          placeholder: "Enter new password",
          oneLine: true,
          events: {
            blur: () => validateInput(this, "password", "password"),
          },
        }),
        new Input({
          label: "Repeat new password",
          type: "password",
          name: "repeat_password",
          value: "",
          disabled: false,
          placeholder: "Repeat new password",
          oneLine: true,
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
          text: "Save",
          type: "submit",
          view: "primary",
          events: {
            click: (e) => {
              e.preventDefault();
              const inputsToValidate: [string, ValidationRuleKey][] = [
                ["current_password", "password"],
                ["password", "password"],
                ["repeat_password", "password"],
              ];

              let hasError = false;

              for (let [name, rule] of inputsToValidate) {
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

                app.navigate("/profile");
              }
            },
          },
        }),
      ],
    });
  }
}
