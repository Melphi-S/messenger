import { Block } from "../../core/Block.ts";
import { Button } from "../Button/Button.ts";
import "./AvatarEdit.scss";

export class AvatarEdit extends Block {
  constructor() {
    super("div", {
      selectButton: new Button({
        text: "Select file",
        view: "secondary",
        type: "button",
        events: {
          click: (e) => {
            e.stopPropagation();
            console.log("loaded");
          },
        },
      }),
      submitButton: new Button({
        text: "Upload",
        view: "primary",
        type: "submit",
        events: {
          click: (e) => {
            e.stopPropagation();
            console.log("loaded");
          },
        },
      }),
    });
  }

  protected render() {
    super.render();

    // language=hbs
    return `
      <div class="avatar-edit-popup">
        <p class="avatar-edit-popup__text">
           Upload new image
        </p>
        {{{selectButton}}}
        {{{submitButton}}}
      </div>
    `;
  }
}
