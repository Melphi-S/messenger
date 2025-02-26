import { ProfilePageLayout } from "../../components/ProfilePageLayout";
import { validateInput } from "../../utils/validation.ts";
import { getFormData } from "../../utils/getFormData.ts";
import { BlockProps } from "../../core/Block.ts";
import { ChangeProfileDTO, User } from "../../api/userAPI";
import { withAuthCheck } from "../../HOCs/withAuthCheck.ts";
import { userController } from "../../controllers/UserController.ts";
import { router } from "../../main.ts";

interface Props extends BlockProps {
  currentUser: User;
}

class ProfileChangePage extends ProfilePageLayout {
  constructor({ currentUser }: Props) {
    super({
      currentUser,
      // language=hbs
      inputs: `
          {{{ component "Input" label="Email" type="text" name="email" value=currentUser.email placeholder="Enter email" disabled=false oneLine=true events=handleEmailEvents}}}
          {{{ component "Input" label="Login" type="text" name="login" value=currentUser.login placeholder="Enter login" disabled=false oneLine=true events=handleLoginEvents}}}
          {{{ component "Input" label="First name" type="text" name="first_name" value=currentUser.firstName placeholder="Enter first name" disabled=false oneLine=true events=handleFirstNameEvents }}}
          {{{ component "Input" label="Second name" type="text" name="second_name" value=currentUser.secondName placeholder="Enter second name" disabled=false oneLine=true events=handleSecondNameEvents}}}
          {{{ component "Input" label="Nickame" type="text" name="display_name" value=currentUser.displayName placeholder="Enter nickname" disabled=false oneLine=true events=handleNicknameEvents }}}
          {{{ component "Input" label="Phone" type="text" name="phone" value=currentUser.phone placeholder="Enter phone" disabled=false oneLine=true events=handlePhoneEvents }}}
      `,
      // language=hbs
      buttons: `
          {{{ component "Button" text="Save" type="submit" view="primary" events=handleButtonEvents }}}
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
      handleNicknameEvents: {
        blur: () => validateInput(this, "display_name", "name"),
      },
      handlePhoneEvents: {
        blur: () => validateInput(this, "phone", "phone"),
      },
      handleButtonEvents: {
        click: async () => {
          const body = getFormData(this);

          if (body) {
            await userController.changeProfileData(body as ChangeProfileDTO);
            router.go("/profile");
          }
        },
      },
    });
  }
}

export default withAuthCheck(ProfileChangePage, "private");
