import { Block } from "../../core/Block.ts";
import "./Chat.scss";
import { Chat as ChatModel } from "../../api/models/chat.model.ts";
import { ChatMessage } from "./ChatMessage/ChatMessage.ts";
import { MessageInput } from "../MessageInput/MessageInput.ts";
import { ArrowButton } from "../ArrowButton/ArrowButton.ts";
import { Avatar } from "../Avatar/Avatar.ts";
import { currentUser, MOCK_USERS } from "../../api/mockAPI.ts";
import { FileAttach } from "./FileAttach/FileAttach.ts";
import { UserManagement } from "./UserManagement/UserManagement.ts";

interface Props {
  chat: ChatModel;
}

export class Chat extends Block {
  constructor({ chat }: Props) {
    super("div", {
      id: chat.id,
      messages: chat.messages.map((message) => {
        return new ChatMessage({ message });
      }),
      messageInput: new MessageInput({
        name: "message",
        placeholder: "Your message",
        type: "text",
        value: "",
        events: {
          input: (e) => {
            if (e.target && e.target instanceof HTMLInputElement) {
              const newMessageButton = super.getChildren().newMessageButton;
              if (e.target.value) {
                newMessageButton.changeProps({ disabled: false });
              } else {
                newMessageButton.changeProps({ disabled: true });
              }
            }
          },
        },
      }),
      newMessageButton: new ArrowButton({
        direction: "right",
        disabled: true,
        type: "button",
        events: {
          click: () => {
            const messageInput =
              this.getChildren().messageInput.getElement() as HTMLInputElement;

            //TODO Change to real API request
            console.log(messageInput.value);

            messageInput.value = "";
            super
              .getChildren()
              .newMessageButton.changeProps({ disabled: true });
          },
        },
      }),
      image: new Avatar({
        size: "m",
        imageSrc:
          chat.image ||
          MOCK_USERS.find(
            (user) =>
              user.id === chat.participants.find((id) => id !== currentUser.id),
          )?.avatar ||
          "",
        edit: false,
      }),
      name:
        chat.name ||
        MOCK_USERS.find(
          (user) =>
            user.id === chat.participants.find((id) => id !== currentUser.id),
        )?.displayName ||
        "",
      fileAttach: new FileAttach(),
      userManagement: new UserManagement(),
    });
  }

  protected render() {
    super.render();
    // language=hbs
    return `
      <div class="chat">
        <div class="chat__header">
          <div class="chat__participant-wrapper">
            {{{image}}}
            <span class="chat__participant-name">{{{name}}}</span>
          </div>
          {{{ userManagement }}}
        </div>
        <div class="chat__main scrollbar">
            {{{messages}}}
        </div>
        <div class="chat__footer">
          {{{fileAttach}}}
          {{{messageInput}}}
          {{{newMessageButton}}}
        </div>
      <div>
    `;
  }

  protected _render() {
    super._render();

    const container = <HTMLElement>this.element?.querySelector(".chat__main");
    if (!container) return;

    const images = container.querySelectorAll("img");
    let loadedCount = 0;

    container.style.opacity = "0";

    if (images.length === 0) {
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
        container.style.opacity = "1";
      });
      return;
    }

    setTimeout(() => {
      images.forEach((img) => {
        if (img.complete) {
          loadedCount++;
          if (loadedCount === images.length) {
            container.scrollTop = container.scrollHeight;
            container.style.opacity = "1";
          }
        } else {
          img.onload = () => {
            loadedCount++;
            if (loadedCount === images.length) {
              container.scrollTop = container.scrollHeight;
              container.style.opacity = "1";
            }
          };
          img.onerror = () => {
            loadedCount++; // Игнорируем ошибки загрузки
            if (loadedCount === images.length) {
              container.scrollTop = container.scrollHeight;
              container.style.opacity = "1";
            }
          };
        }
      });
    });
  }
}
