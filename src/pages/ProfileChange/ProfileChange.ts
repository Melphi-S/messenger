import { ProfilePageLayout } from "../../components/ProfilePageLayout";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { currentUser } from "../../api/mockAPI.ts";
import { validateInput, ValidationRuleKey } from "../../utils/validation.ts";
import { getFormData } from "../../utils/getFormData.ts";

export class ProfileChangePage extends ProfilePageLayout {
  constructor() {
    super({
      inputs: [
        new Input({
          label: "Email",
          type: "text",
          name: "email",
          value: currentUser.email,
          disabled: false,
          placeholder: "Enter email",
          oneLine: true,
          events: {
            blur: () => validateInput(this, "email", "email"),
          },
        }),
        new Input({
          label: "Login",
          type: "text",
          name: "login",
          value: currentUser.login || "",
          disabled: false,
          placeholder: "Enter login",
          oneLine: true,
          events: {
            blur: () => validateInput(this, "login", "login"),
          },
        }),
        new Input({
          label: "First name",
          type: "text",
          name: "first_name",
          value: currentUser.firstName,
          disabled: false,
          placeholder: "Enter first name",
          oneLine: true,
          events: {
            blur: () => validateInput(this, "first_name", "name"),
          },
        }),
        new Input({
          label: "Second name",
          type: "text",
          name: "second_name",
          value: currentUser.secondName,
          disabled: false,
          placeholder: "Enter second name",
          oneLine: true,
          events: {
            blur: () => validateInput(this, "second_name", "name"),
          },
        }),
        new Input({
          label: "Nickname",
          type: "text",
          name: "display_name",
          value: currentUser.displayName,
          disabled: false,
          placeholder: "Enter second name",
          oneLine: true,
          events: {
            blur: () => validateInput(this, "display_name", "name"),
          },
        }),
        new Input({
          label: "Phone",
          type: "text",
          name: "phone",
          value: currentUser.phone,
          disabled: false,
          placeholder: "Enter phone",
          oneLine: true,
          events: {
            blur: () => validateInput(this, "phone", "phone"),
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
                ["email", "email"],
                ["login", "login"],
                ["first_name", "name"],
                ["second_name", "name"],
                ["display_name", "name"],
                ["phone", "phone"],
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
              }
            },
          },
        }),
      ],
    });
  }
}
