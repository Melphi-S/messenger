import { Block } from "../../core/Block.ts";
import { Button } from "../Button";
import "./DeleteChatPopup.scss";
import { chatController } from "../../controllers/ChatController.ts";

interface Props {
  chatId: number;
}

export class DeleteChatPopup extends Block {
  constructor({ chatId }: Props) {
    super({
      yesButton: new Button({
        text: "Yes",
        type: "button",
        view: "danger",
        events: {
          click: async () => {
            await chatController.deleteChat(chatId);
            await chatController.getChatsList();

            document
              .querySelectorAll(".popup")
              ?.forEach((popup) => popup.classList.add("popup_hidden"));
          },
        },
      }),
      noButton: new Button({
        text: "No",
        type: "button",
        view: "secondary",
        events: {
          click: () => {
            document
              .querySelectorAll(".popup")
              ?.forEach((popup) => popup.classList.add("popup_hidden"));
          },
        },
      }),
    });
  }

  protected render() {
    super.render();

    // language=hbs
    return `
      <div class="delete-chat">
        <p>Are you sure you want to delete this chat?</p>
        <div class="delete-chat__buttons-container">
            {{{ yesButton }}}
            {{{ noButton }}}
        </div>
      </div>
    `;
  }
}
