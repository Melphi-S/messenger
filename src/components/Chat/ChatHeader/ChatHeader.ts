import { Block, BlockProps } from "../../../core/Block.ts";
import { IChat } from "../../../api/chatAPI";
import UserManagement from "../UserManagement/UserManagement.ts";
import { connectWithStore, store } from "../../../store/Store.ts";
import "./ChatHeader.scss";
import { ChatPreviewProps } from "../../ChatPreview";

interface Props extends BlockProps {
  chat: IChat;
  avatarEvents: { [k: string]: () => void };
}

class ChatHeader extends Block {
  constructor({ chat, avatarEvents }: Props) {
    super({
      chat,
      userManagement: new UserManagement({ chatId: chat.id }),
      name: chat.title,
      avatarEvents,
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
      </div>
    `;
  }
}

export default connectWithStore(ChatHeader, (store) => ({
  chatsUsers: store.chatsUsers,
  chatList: store.chatList,
}));
