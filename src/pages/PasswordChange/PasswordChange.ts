import { ProfilePageLayout } from "../../components/ProfilePageLayout";
import {
  validateInput,
  validatePasswordMatch,
} from "../../utils/validation.ts";
import { getFormData } from "../../utils/getFormData.ts";
import { BlockProps } from "../../core/Block.ts";
import { ChangePasswordDTO, User } from "../../api/userAPI";
import { userController } from "../../controllers/UserController.ts";
import { router } from "../../main.ts";
import { withAuthCheck } from "../../HOCs/withAuthCheck.ts";

interface Props extends BlockProps {
  currentUser: User;
}

class PasswordChangePage extends ProfilePageLayout {
  constructor({ currentUser }: Props) {
    super({
      currentUser,
      // language=hbs
      inputs: `
          {{{ component "Input" label="Current password" type="password" name="oldPassword" value="" placeholder="Enter current password" disabled=false oneLine=true events=handleCurrentPasswordEvents}}}
          {{{ component "Input" label="New password" type="password" name="newPassword" value="" placeholder="Enter new password" disabled=false oneLine=true events=handleNewPasswordEvents}}}
          {{{ component "Input" label="Repeat new password" type="password" name="repeat_password" value="" placeholder="Repeat new password" disabled=false oneLine=true events=handleRepeatNewPasswordEvents}}}
      `,
      // language=hbs
      buttons: `
          {{{ component "Button" text="Save" type="submit" view="primary" events=handleButtonEvents }}}
      `,
      handleCurrentPasswordEvents: {
        blur: () => validateInput(this, "oldPassword", "password"),
      },
      handleNewPasswordEvents: {
        blur: () => validateInput(this, "newPassword", "password"),
      },
      handleRepeatNewPasswordEvents: {
        blur: () =>
          validateInput(this, "repeat_password", null, () =>
            validatePasswordMatch(
              this.getElement(),
              "newPassword",
              "repeat_password",
            ),
          ),
      },
      handleButtonEvents: {
        click: async () => {
          const body = getFormData(this, ["repeat_password", "avatar"]);

          if (body) {
            const res = await userController.changePassword(
              body as ChangePasswordDTO,
            );
            if (res) {
              router.go("/profile");
            }
          }
        },
      },
    });
  }
}

export default withAuthCheck(PasswordChangePage, "private");
