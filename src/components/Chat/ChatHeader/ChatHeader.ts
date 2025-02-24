import { Block, BlockProps } from "../../../core/Block.ts";
import { User } from "../../../api/userAPI/user.model.ts";
import { IChat } from "../../../api/chatAPI";
import { UserManagement } from "../UserManagement/UserManagement.ts";
import { Popup } from "../../Popup";
import { AvatarEdit } from "../../AvatarEditPopup";
import { connectWithStore, store } from "../../../store/Store.ts";
import "./ChatHeader.scss";
import { ChatPreviewProps } from "../../ChatPreview";

interface Props extends BlockProps {
  currentUser: User;
  chat: IChat;
}

class ChatHeader extends Block {
  constructor({ currentUser, chat }: Props) {
    super({
      currentUser,
      chat,
      userManagement: new UserManagement(),
      name: chat.title,
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

  protected render() {
    super.render();

    const chat = store
      .get()
      .chatList?.find(
        (c) => c.id === (this.getProps() as ChatPreviewProps).chat.id,
      );

    const avatar =
      chat?.avatar || (this.getProps() as ChatPreviewProps).chat.avatar || "";

    // language=hbs
    return `
      <div class="chat-header">
        <div class="chat-header__info-wrapper">
          {{{ component "Avatar" size='m' edit=true imageSrc='${avatar}' events=avatarEvents}}}
          <span class="chat-header__chat-name">{{{name}}}</span>
        </div>
        {{{ userManagement }}}
        {{{ popup }}}
      </div>
    `;
  }
}

export default connectWithStore(ChatHeader, (store) => ({
  chatList: store.chatList,
  currentUser: store.currentUser,
}));
