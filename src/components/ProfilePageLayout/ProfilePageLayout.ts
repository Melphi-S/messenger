import { Block, BlockProps } from "../../core/Block.ts";
import { ArrowButton } from "../ArrowButton";
import { Avatar } from "../Avatar";
import "./ProfilePageLayout.scss";
import { Popup } from "../Popup";
import { AvatarEdit } from "../AvatarEditPopup";
import { Input } from "../Input";
import { Button } from "../Button";
import { User } from "../../api/models/user.model.ts";
import { withAuthCheck } from "../../HOCs/withAuthCheck.ts";

interface Props extends BlockProps {
  inputs: Input[];
  buttons: Button[];
  currentUser: User;
}

export class ProfilePageLayout extends Block {
  constructor({ inputs, buttons, currentUser }: Props) {
    super({
      backButton: new ArrowButton({
        direction: "left",
        type: "button",
        events: {
          click: () => history.back(),
        },
      }),
      avatar: new Avatar({
        size: "l",
        edit: true,
        imageSrc:
          "https://ya-praktikum.tech/api/v2/resources" + currentUser?.avatar ||
          "",
        events: {
          click: () => {
            this.getChildren().popup.changeProps({ hidden: false });
          },
        },
      }),
      popup: new Popup({
        content: new AvatarEdit(),
        hidden: true,
      }),
      inputs: inputs,
      buttons: buttons,
      currentUser,
    });
  }

  protected render() {
    super.render();

    // language=hbs
    return `
      <main class="page page_type_sidebar">
        <div class="profile-sidebar">
            {{{ backButton }}}
        </div>
        <div class="profile-main">
          {{{ avatar }}}
          <div class="profile-wrapper">
            <div class="fields-container">
              {{{ inputs }}}
            </div>
            <div class="buttons-container">
              {{{ buttons }}}
            </div>
          </div>
        </div>
        {{{ popup }}}
      </main>
    `;
  }
}

export default ProfilePageLayout;
