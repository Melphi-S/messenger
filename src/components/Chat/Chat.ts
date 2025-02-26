import { Block, BlockProps } from "../../core/Block.ts";
import "./Chat.scss";
import { MessageInput } from "../MessageInput";
import { ArrowButton } from "../ArrowButton";
import { FileAttach } from "./FileAttach/FileAttach.ts";
import { ChatWS } from "../../api/chatAPI/ChatWS.ts";
import { connectWithStore, store } from "../../store/Store.ts";
import { User } from "../../api/userAPI/user.model.ts";
import { Popup } from "../Popup";
import { AvatarEdit } from "../AvatarEditPopup";
import { IChat } from "../../api/chatAPI";
import { chatController } from "../../controllers/ChatController.ts";

interface Props extends BlockProps {
  chatWS: ChatWS;
  currentUser: User;
  chat: IChat;
}

class Chat extends Block {
  constructor({ chatWS, currentUser, chat }: Props) {
    super({
      currentUser,
      chatWS,
      chat,
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

            chatWS.sendMessage(messageInput.value);

            messageInput.value = "";
            super
              .getChildren()
              .newMessageButton.changeProps({ disabled: true });
          },
        },
      }),
      name: "",
      fileAttach: new FileAttach(),
      avatarEvents: {
        click: () => {
          this.getChildren().popup.changeProps({ hidden: false });
        },
      },
      popup: new Popup({
        content: new AvatarEdit({ type: "chat", chatId: chat.id }),
        hidden: true,
      }),
    });
  }

  componentDidMount() {
    console.log("MOUNT CHAT");

    const currentChatId = (this.getProps() as Props).chat.id;
    const chatsUsers = store.get().chatsUsers;

    if (!chatsUsers.some((chat) => chat.chatId === currentChatId)) {
      chatController.getChatUsers(currentChatId).then((usersList) => {
        if (usersList) {
          store.set("chatsUsers", [
            ...chatsUsers,
            { usersList: usersList, chatId: currentChatId },
          ]);
        }
      });
    }

    return super.componentDidMount();
  }

  protected render() {
    super.render();

    // language=hbs
    return `
      <div class="chat">
        {{{ component "ChatHeader" chat=chat }}}
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
        {{{ popup }}}
      <div>
    `;
  }
}

export default connectWithStore(Chat, (store) => ({
  currenUser: store.currentUser,
  currentChatMessages: store.currentChatMessages,
}));
