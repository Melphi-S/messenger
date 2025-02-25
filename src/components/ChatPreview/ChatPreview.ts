import { Block, BlockProps } from "../../core/Block.ts";
import "./ChatPreview.scss";
import { IChat } from "../../api/chatAPI";
import { User } from "../../api/userAPI/user.model.ts";
import { dateToChatView } from "../../utils/parseDate.ts";
import { connectWithStore, store } from "../../store/Store.ts";

export interface ChatPreviewProps extends BlockProps {
  chat: IChat;
  events: {
    click: (event: Event) => void;
  };
  isActive?: boolean;
  currentUser?: User | null;
}

class ChatPreview extends Block {
  constructor({ chat, events, isActive, currentUser }: ChatPreviewProps) {
    super({
      events,
      currentUser,
      chat,
      id: chat.id,
      title: chat.title,
      isActive: isActive,
      curUserMessage: chat.lastMessage?.user.login === currentUser?.login,
      lastMessage: chat.lastMessage?.content,
      lastMessageAuthor:
        chat.lastMessage?.user.login === currentUser?.login
          ? "You"
          : chat.lastMessage?.user.displayName ||
            chat.lastMessage?.user.firstName ||
            "",
      date: chat.lastMessage?.time
        ? dateToChatView(chat.lastMessage?.time)
        : "",
      unreadMessages: chat.unreadCount,
      avatar: chat.avatar,
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
      <div class="preview-message {{#if isActive}}preview-message_active{{/if}}" id="{{{id}}}">
        {{{ component "Avatar" size='s' edit=false imageSrc='${avatar}' events=avatarEvents }}}
        <div class="preview-message__mainContainer">
          <p class="preview-message__title">{{{ title }}}</p>
        {{#if lastMessage }}
          <p class="preview-message__message"> <span class="preview-message__authorSpan"> {{{ lastMessageAuthor }}}: </span>{{{ lastMessage }}}</p>
        {{/if}}
        </div>
        <div class="preview-message__rightContainer">
          <span class="preview-message__date">{{{ date }}}</span>
          {{#if unreadMessages}} <div class="preview-message__unreadCount">{{{ unreadMessages }}}</div> {{/if}}
        </div>
      <div>
    `;
  }
}

export default connectWithStore(ChatPreview, (store) => ({
  chatList: store.chatList,
}));
