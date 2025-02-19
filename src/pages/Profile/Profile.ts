import { ProfilePageLayout } from "../../components/ProfilePageLayout";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { User } from "../../api/models/user.model.ts";
import { BlockProps } from "../../core/Block.ts";
import { withAuthCheck } from "../../HOCs/withAuthCheck.ts";

interface Props extends BlockProps {
  currentUser: User;
}

class ProfilePage extends ProfilePageLayout {
  constructor({ currentUser }: Props) {
    super({
      currentUser,
      inputs: ProfilePage.createInputs(currentUser),
      buttons: ProfilePage.createButtons(),
    });
  }

  static createInputs(currentUser: User) {
    return [
      new Input({
        label: "Email",
        type: "text",
        name: "email",
        value: currentUser?.email || "",
        disabled: true,
        placeholder: "Enter email",
        oneLine: true,
      }),
      new Input({
        label: "Login",
        type: "text",
        name: "login",
        value: currentUser?.login || "",
        disabled: true,
        placeholder: "Enter login",
        oneLine: true,
      }),
      new Input({
        label: "First name",
        type: "text",
        name: "first_name",
        value: currentUser?.firstName || "",
        disabled: true,
        placeholder: "Enter first name",
        oneLine: true,
      }),
      new Input({
        label: "Second name",
        type: "text",
        name: "second_name",
        value: currentUser?.secondName || "",
        disabled: true,
        placeholder: "Enter second name",
        oneLine: true,
      }),
      new Input({
        label: "Nickname",
        type: "text",
        name: "display_name",
        value: currentUser?.displayName || "",
        disabled: true,
        placeholder: "Enter nickname",
        oneLine: true,
      }),
      new Input({
        label: "Phone",
        type: "text",
        name: "phone",
        value: currentUser?.phone || "",
        disabled: true,
        placeholder: "Enter phone",
        oneLine: true,
      }),
    ];
  }

  static createButtons() {
    return [
      new Button({
        text: "Change your data",
        type: "button",
        view: "secondary",
        events: {
          click: () => {},
        },
      }),
      new Button({
        text: "Change your password",
        type: "button",
        view: "secondary",
        events: {
          click: () => {},
        },
      }),
      new Button({
        text: "Log out",
        type: "button",
        view: "danger",
        events: {
          click: () => {},
        },
      }),
    ];
  }

  componentDidUpdate() {
    const currentUser = this.getProps().currentUser;

    if (currentUser) {
      const newInputs = ProfilePage.createInputs(currentUser);
      this.changeLists({ inputs: newInputs });

      this.getChildren().avatar.changeProps({
        imageSrc: currentUser.avatar
          ? "https://ya-praktikum.tech/api/v2/resources" + currentUser.avatar
          : "",
      });
    }

    return true;
  }
}

export default withAuthCheck(ProfilePage, "private");
