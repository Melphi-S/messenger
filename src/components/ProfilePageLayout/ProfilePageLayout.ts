import { Block, BlockProps } from "../../core/Block.ts";
import "./ProfilePageLayout.scss";
import { User } from "../../api/userAPI/user.model.ts";
import { AvatarEdit } from "../AvatarEditPopup";
import { Popup } from "../Popup";
import { ArrowButton } from "../ArrowButton";
import Handlebars from "handlebars";

interface Props extends BlockProps {
  inputs: string;
  currentUser: User;
}

export class ProfilePageLayout extends Block {
  constructor({ currentUser, ...props }: Props) {
    super({
      ...props,
      currentUser,
      avatarEvents: {
        click: () => {
          this.getChildren().popup.changeProps({ hidden: false });
        },
      },
      popup: new Popup({
        content: new AvatarEdit(),
        hidden: true,
      }),
      backButton: new ArrowButton({
        direction: "left",
        type: "button",
        events: {
          click: () => history.back(),
        },
      }),
    });
  }

  protected render() {
    super.render();

    console.log("RENDER PROFILE");

    const inputs = Handlebars.compile(this.getProps().inputs)(this.getProps());

    const buttons = Handlebars.compile(this.getProps().buttons)(
      this.getProps(),
    );

    // language=hbs
    return `
      <main class="page page_type_sidebar">
        <div class="profile-sidebar">
            {{{ backButton }}}
        </div>
        <div class="profile-main">
          {{{ component "Avatar" size='l' edit='true' imageSrc=currentUser.avatar events=avatarEvents}}}
          <div class="profile-wrapper">
            <div class="fields-container">
              ${inputs}
            </div>
            <div class="buttons-container">
              ${buttons}
            </div>
          </div>
        </div>
        {{{ popup }}}
      </main>
    `;
  }
}
