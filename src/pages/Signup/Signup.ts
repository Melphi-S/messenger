import { AuthLayout } from "../../components/AuthLayout";
import { Input } from "../../components/Input";
import {
  validateInput,
  validatePasswordMatch,
  ValidationRuleKey,
} from "../../utils/validation.ts";
import { Button } from "../../components/Button";
import { getFormData } from "../../utils/getFormData.ts";
import { router } from "../../main.ts";
import { authController } from "../../controllers/AuthController.ts";
import { SignUpDTO } from "../../api/ authAPI";
import { withAuthCheck } from "../../HOCs/withAuthCheck.ts";

class SignupPage extends AuthLayout {
  constructor() {
    super({
      title: "Sign up",
      // language=hbs
      inputs: `
        {{{ component "Input" label="Email" type="text" name="email" value=currentUser.email placeholder="Enter email" events=handleEmailEvents}}}
        {{{ component "Input" label="Login" type="text" name="login" value=currentUser.login placeholder="Enter login" events=handleLoginEvents}}}
        {{{ component "Input" label="First name" type="text" name="first_name" value=currentUser.firstName placeholder="Enter first name" events=handleFirstNameEvents }}}
        {{{ component "Input" label="Second name" type="text" name="second_name" value=currentUser.secondName placeholder="Enter second name" events=handleSecondNameEvents}}}
        {{{ component "Input" label="Phone" type="text" name="phone" value=currentUser.phone placeholder="Enter phone" events=handlePhoneEvents }}}
        {{{ component "Input" label="Password" type="password" name="password" value="" placeholder="Enter password" events=handlePasswordEvents}}}
        {{{ component "Input" label="Repeat password" type="password" name="repeat_password" value="" placeholder="Repeat password" events=handleRepeatPasswordEvents}}}
                `,
      // language=hbs
      buttons: `
          {{{ component "Button" text="Sign up" type="submit" view="primary" events=handleSubmitEvents }}}
          {{{ component "Button" text="Sign in" type="button" view="secondary" events=handleGoSigninEvents }}}
      `,
      handleEmailEvents: {
        blur: () => validateInput(this, "email", "email"),
      },
      handleLoginEvents: {
        blur: () => validateInput(this, "login", "login"),
      },
      handleFirstNameEvents: {
        blur: () => validateInput(this, "first_name", "name"),
      },
      handleSecondNameEvents: {
        blur: () => validateInput(this, "second_name", "name"),
      },
      handlePhoneEvents: {
        blur: () => validateInput(this, "phone", "phone"),
      },
      handlePasswordEvents: {
        blur: () => validateInput(this, "password", "password"),
      },
      handleRepeatPasswordEvents: {
        blur: () =>
          validateInput(this, "repeat_password", null, () =>
            validatePasswordMatch(
              this.getElement(),
              "password",
              "repeat_password",
            ),
          ),
      },
      handleSubmitEvents: {
        click: async (e: Event) => {
          e.preventDefault();
          const body = getFormData(this);

          const login = await authController.signup(body as SignUpDTO);

          if (login) {
            await authController.getCurrentUser();
            router.go("/chats");
          }
        },
      },
      handleGoSigninEvents: {
        click: async () => {
          router.go("/login");
        },
      },
    });
  }
}

export default withAuthCheck(SignupPage, "public");
