import { Block } from "../../core/Block.ts";
import { Button } from "../Button";
import { Input } from "../Input";
import "./AddChatPopup.scss";
import { validateInput } from "../../utils/validation.ts";
import { getFormData } from "../../utils/getFormData.ts";
import { chatController } from "../../controllers/ChatController.ts";

export class AddChatPopup extends Block {
  constructor() {
    super({
      input: new Input({
        name: "title",
        type: "text",
        value: "",
        placeholder: "Enter new chat name",
        events: {
          blur: () => validateInput(this, "title", "message"),
        },
      }),
      submitButton: new Button({
        text: "Create new chat",
        view: "primary",
        type: "submit",
        isDisabled: true,
        events: {
          click: async (e) => {
            e.preventDefault();
            const body = getFormData(this);
            if (body && body.title) {
              await chatController.createChat(body.title);
              await chatController.getChatsList();

              const input = this.getChildren()
                .input.getElement()
                ?.querySelector("input") as HTMLInputElement;
              input.value = "";
              document
                .querySelectorAll(".popup")
                ?.forEach((popup) => popup.classList.add("popup_hidden"));
            }
          },
        },
      }),
    });
  }

  protected render() {
    super.render();

    // language=hbs
    return `
      <form class="add-chat-form">
        {{{ input }}}
        {{{ submitButton }}}
      </form>
    `;
  }
}
