import { Block } from "../../core/Block.ts";
import { Button } from "../Button";
import "./AvatarEdit.scss";
import { userController } from "../../controllers/UserController.ts";
import { chatController } from "../../controllers/ChatController.ts";
import { store } from "../../store/Store.ts";
import cloneDeep from "../../utils/cloneDeep.ts";

interface Props {
  type: "profile" | "chat";
  chatId?: number;
}

export class AvatarEdit extends Block {
  constructor({ type, chatId }: Props) {
    super({
      submitButton: new Button({
        text: "Upload",
        view: "primary",
        type: "submit",
        disabled: true,
        events: {
          click: async () => {
            const avatarInput = this.getElement()?.querySelector("#avatar");

            if (
              avatarInput instanceof HTMLInputElement &&
              avatarInput.files &&
              avatarInput.files[0]
            ) {
              if (type === "profile") {
                await userController.changeProfileAvatar(avatarInput.files[0]);
              } else if (chatId) {
                const newChatInfo = await chatController.changeChatAvatar(
                  chatId,
                  avatarInput.files[0],
                );

                const prevStoreChatList = store.get().chatList;

                if (prevStoreChatList && newChatInfo) {
                  const updatedStoreChatList = prevStoreChatList.map((chat) => {
                    if (chat.id === chatId) {
                      return newChatInfo;
                    }
                    return chat;
                  });

                  store.set("chatList", updatedStoreChatList);
                }
              }
              document.querySelector(".popup")?.classList.add("popup_hidden");
            }
          },
        },
      }),
    });
  }

  componentDidMount(): boolean {
    const thisElement = this.getElement();
    const submitButton = this.getChildren().submitButton;

    thisElement
      ?.querySelector("#avatar")
      ?.addEventListener("change", function (this: EventTarget | null) {
        if (this instanceof HTMLInputElement && this.files) {
          const fileName =
            this.files.length > 0 ? this.files[0].name : "No fie selected";

          const fileNameElement = thisElement?.querySelector("#fileName");
          if (fileNameElement) {
            fileNameElement.textContent = fileName;
            submitButton.changeProps({ disabled: false });
          } else {
            submitButton.changeProps({ disabled: true });
          }
        }
      });

    return true;
  }

  protected render() {
    super.render();

    // language=hbs
    return `
      <div class="avatar-edit-popup">
        <p class="avatar-edit-popup__text">
           Upload new image
        </p>
        <label for="avatar" class="avatar-edit-popup__select-input">
          Select new avatar
        </label>
        <span id="fileName">No file selected</span>
        <input id="avatar" class="avatar-edit-popup__native-input" name="avatar" type="file"/>
        {{{ submitButton }}}
      </div>
    `;
  }
}
