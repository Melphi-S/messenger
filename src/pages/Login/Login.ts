import { AuthLayout } from "../../components/AuthLayout";
import { validateInput } from "../../utils/validation.ts";
import { getFormData } from "../../utils/getFormData.ts";
import { router } from "../../main.ts";
import { authController } from "../../controllers/AuthController.ts";
import { SignUpDTO } from "../../api/authAPI";
import { withAuthCheck } from "../../HOCs/withAuthCheck.ts";

class LoginPage extends AuthLayout {
  constructor() {
    super({
      title: "Sign in",
      // language=hbs
      inputs: `
          {{{ component "Input" label="Login" type="text" name="login" value="" placeholder="Enter login" disabled=false events=handleLoginEvents}}}
          {{{ component "Input" label="Password" type="password" name="password" value="" placeholder="Enter password" disabled=false events=handlePasswordEvents}}}
                `,
      // language=hbs
      buttons: `
          {{{ component "Button" text="Sign in" type="submit" view="primary" events=handleSubmitEvents isDisabled=true}}}
          {{{ component "Button" text="Create account" type="button" view="secondary" events=handleGoSignupEvents }}}
      `,
      handleLoginEvents: {
        blur: () => validateInput(this, "login", "login"),
      },
      handlePasswordEvents: {
        blur: () => validateInput(this, "password", "password"),
      },
      handleSubmitEvents: {
        click: async (e: Event) => {
          e.preventDefault();
          const body = getFormData(this);

          const login = await authController.signin(body as SignUpDTO);

          if (login) {
            await authController.getCurrentUser();
            router.go("/chats");
          }
        },
      },
      handleGoSignupEvents: {
        click: async () => {
          router.go("/signup");
        },
      },
    });
  }
}

export default withAuthCheck(LoginPage, "public");
