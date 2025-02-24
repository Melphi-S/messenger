import { Block } from "../../core/Block.ts";
import { Button } from "../Button";
import { Input } from "../Input";
import "./AddUserPopup.scss";

interface Props {
  chatId: number;
}

export class AddUserPopup extends Block {
  constructor({ chatId }: Props) {
    super({
      input: new Input({
        name: "login",
        type: "text",
        value: "",
        placeholder: "Enter user login",
      }),
      submitButton: new Button({
        text: "Upload",
        view: "primary",
        type: "submit",
        disabled: true,
        events: {
          click: async () => {
            console.log("CLICK");
          },
        },
      }),
    });
  }

  protected render() {
    super.render();

    // language=hbs
    return `
      <form class="add-user-form">
        {{{ input }}}
        {{{ submitButton }}}
      </form>
    `;
  }
}
