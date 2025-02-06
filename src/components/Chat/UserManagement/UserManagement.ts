import { Block } from "../../../core/Block.ts";
import "./UserManagement.scss";
import { Hint } from "../../Hint";
import { HintButton } from "../../HintButton";
import app from "../../../App.ts";

export class UserManagement extends Block {
  constructor() {
    super("div", {
      hint: new Hint({
        position: "bottom",
        content: [
          new HintButton({
            type: "add",
            text: "Add user",
            events: {
              click: () => app.navigate("/error"),
            },
          }),
          new HintButton({
            type: "delete",
            text: "Delete user",
            events: {
              click: () => app.navigate("/error"),
            },
          }),
        ],
      }),
    });
  }

  protected render() {
    super.render();
    // language=hbs
    return `
      <div class="user-management">
        <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="1.5" cy="2" r="1.5" fill="#1E1E1E"/>
          <circle cx="1.5" cy="8" r="1.5" fill="#1E1E1E"/>
          <circle cx="1.5" cy="14" r="1.5" fill="#1E1E1E"/>
        </svg>
        {{{ hint }}}
      </div>
    `;
  }
}
