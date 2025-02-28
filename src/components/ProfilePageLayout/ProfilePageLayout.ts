import { Block } from "../../core/Block.ts";
import { ArrowButton } from "../ArrowButton";
import { Avatar } from "../Avatar";
import { currentUser } from "../../api/mockAPI.ts";
import "./ProfilePageLayout.scss";
import { Popup } from "../Popup";
import { AvatarEdit } from "../AvatarEditPopup";
import { Input } from "../Input";
import { Button } from "../Button";

interface Props {
  inputs: Input[];
  buttons: Button[];
}

export class ProfilePageLayout extends Block {
  constructor({ inputs, buttons }: Props) {
    super("main", {
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
        imageSrc: currentUser.avatar,
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
