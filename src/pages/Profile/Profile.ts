import { ProfilePageLayout } from "../../components/ProfilePageLayout";
import { User } from "../../api/userAPI/user.model.ts";
import { BlockProps } from "../../core/Block.ts";
import { withAuthCheck } from "../../HOCs/withAuthCheck.ts";
import { router } from "../../main.ts";
import { authController } from "../../controllers/AuthController.ts";
import { store } from "../../store/Store.ts";

interface Props extends BlockProps {
  currentUser: User;
}

class ProfilePage extends ProfilePageLayout {
  constructor({ currentUser }: Props) {
    super({
      currentUser,
      // language=hbs
      inputs: `
          {{{ component "Input" label="Email" type="text" name="email" value=currentUser.email placeholder="Enter email" disabled=true oneLine=true }}}
          {{{ component "Input" label="Login" type="text" name="login" value=currentUser.login placeholder="Enter login" disabled=true oneLine=true }}}
          {{{ component "Input" label="First name" type="text" name="email" value=currentUser.firstName placeholder="Enter first name" disabled=true oneLine=true }}}
          {{{ component "Input" label="Second name" type="text" name="second_name" value=currentUser.secondName placeholder="Enter second name" disabled=true oneLine=true }}}
          {{{ component "Input" label="Nickame" type="text" name="display_name" value=currentUser.displayName placeholder="Enter nickname" disabled=true oneLine=true }}}
          {{{ component "Input" label="Phone" type="text" name="phone" value=currentUser.phone placeholder="Enter phone" disabled=true oneLine=true }}}
      `,
      // language=hbs
      buttons: `
          {{{ component "Button" text="Change your data" type="button" view="secondary" events=handleDataChangeClick }}}
          {{{ component "Button" text="Change your password" type="button" view="secondary" events=handlePasswordChangeClick }}}
          {{{ component "Button" text="Log out" type="button" view="danger" events=handleLogout }}}
      `,
      handleDataChangeClick: {
        click: () => {
          router.go("/profile-change");
        },
      },
      handlePasswordChangeClick: {
        click: () => {
          router.go("/password-change");
        },
      },
      handleLogout: {
        click: async () => {
          const logout = await authController.logout();
          if (logout) {
            store.destroy();
            router.go("/login");
          }
        },
      },
    });
  }
}

export default withAuthCheck(ProfilePage, "private");
