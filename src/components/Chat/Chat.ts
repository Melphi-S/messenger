import { Block, BlockProps } from "../../core/Block.ts";
import "./Chat.scss";
import { MessageInput } from "../MessageInput";
import { ArrowButton } from "../ArrowButton";
import { FileAttach } from "./FileAttach/FileAttach.ts";
import { connectWithStore, store } from "../../store/Store.ts";
import { User } from "../../api/userAPI";
import { Popup } from "../Popup";
import { AvatarEdit } from "../AvatarEditPopup";
import { IChat } from "../../api/chatAPI";
import { chatController } from "../../controllers/ChatController.ts";
import { websocket } from "../../api/chatAPI";
import ChatHeader from "./ChatHeader/ChatHeader.ts";

interface Props extends BlockProps {
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
                newMessageButton.changeProps({ isDisabled: false });
              } else {
                newMessageButton.changeProps({ isDisabled: true });
              }
            }
          },
        },
      }),
      newMessageButton: new ArrowButton({
        direction: "right",
        isDisabled: true,
        type: "submit",
        events: {
          click: (e) => {
            e.preventDefault();
            const messageInput =
              this.getChildren().messageInput.getElement() as HTMLInputElement;

            if (websocket) {
              websocket.sendMessage(messageInput.value);

              messageInput.value = "";
              super
                .getChildren()
                .newMessageButton.changeProps({ isDisabled: true });
            }
          },
        },
      }),
      name: "",
      fileAttach: new FileAttach(),
      popup: new Popup({
        content: new AvatarEdit({ type: "chat", chatId: chat.id }),
        hidden: true,
      }),
      chatHeader: new ChatHeader({
        chat: chat,
        avatarEvents: {
          click: () => {
            this.getChildren().popup.changeProps({ hidden: false });
          },
        },
      }),
      unreadMessages: chat.unreadCount,
    });
  }

  componentDidMount() {
    const currentChatId = (this.getProps() as Props).chat.id;
    const chatsUsers = store.get().chatsUsers;

    websocket.disconnect().then(() => {
      websocket.connect();
    });

    if (!chatsUsers.some((chat) => chat.chatId === currentChatId)) {
      chatController.getChatUsers(currentChatId);
    }

    return super.componentDidMount();
  }

  protected render() {
    super.render();

    // language=hbs
    return `
      <div class="chat">
        {{{ chatHeader }}}
        {{{ component "MessageList" currentUserId=currentUser.id unreadMessages=unreadMessages}}}
        <form class="chat__footer">
          {{{ messageInput }}}
          {{{ newMessageButton }}}
        </form>
        {{{ popup }}}
      <div>
    `;
  }
}

export default connectWithStore(Chat, (store) => ({
  currenUser: store.currentUser,
}));
