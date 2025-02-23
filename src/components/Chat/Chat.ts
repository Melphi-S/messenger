import { Block } from "../../core/Block.ts";
import "./Chat.scss";
import { MessageInput } from "../MessageInput";
import { ArrowButton } from "../ArrowButton";
import { Avatar } from "../Avatar";
import { FileAttach } from "./FileAttach/FileAttach.ts";
import { UserManagement } from "./UserManagement/UserManagement.ts";
import { ChatWS } from "../../api/chatAPI/ChatWS.ts";
import { connectWithStore } from "../../store/Store.ts";
import { User } from "../../api/userAPI/user.model.ts";

interface Props {
  chatWS: ChatWS;
  currentUser: User;
}

class Chat extends Block {
  constructor({ chatWS, currentUser }: Props) {
    super({
      currentUser,
      chatWS,
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
            chatWS.sendMessage(messageInput.value);

            messageInput.value = "";
            super
              .getChildren()
              .newMessageButton.changeProps({ disabled: true });
          },
        },
      }),
      image: new Avatar({
        size: "m",
        imageSrc: "",
        edit: false,
      }),
      name: "",
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
            {{{ image }}}
            <span class="chat__participant-name">{{{name}}}</span>
          </div>
          {{{ userManagement }}}
        </div>
          {{#if currentChatMessages}}
            {{{ component "MessageList" currentUserId=currentUser.id currentChatMessages=currentChatMessages chatWS=chatWS}}}
            {{else}}
            <div></div>
          {{/if}}
        <div class="chat__footer">
          {{{ fileAttach }}}
          {{{ messageInput }}}
          {{{ newMessageButton }}}
        </div>
      <div>
    `;
  }
}

export default connectWithStore(Chat, (store) => ({
  currenUser: store.currentUser,
  currentChatMessages: store.currentChatMessages,
}));
