import { Block } from "../../../core/Block.ts";
import { ChatMessage } from "../ChatMessage/ChatMessage.ts";
import "./MessageList.scss";
import { connectWithStore, store } from "../../../store/Store.ts";
import { IChat } from "../../../api/chatAPI";
import { websocket } from "../../../api/chatAPI/ChatWS.ts";

interface Props {
  unreadMessages: number;
}

class MessageList extends Block {
  private unreadMessages = 0;

  constructor({ unreadMessages }: Props) {
    super({
      messages: [],
    });

    this.unreadMessages = unreadMessages;
  }

  componentDidUpdate(): boolean {
    const currentChatMessages = store.get().currentChatMessages;
    const currentUserId = store.get().currentUser?.id;

    if (currentChatMessages && currentUserId) {
      this.changeLists(
        {
          messages: currentChatMessages.map((message) => {
            return new ChatMessage({ message, currentUserId });
          }),
        },
        false,
      );
    }

    return super.componentDidUpdate();
  }

  protected render() {
    super.render();

    // language=hbs
    return `
      <div class="message-list">
        {{{ messages }}}
      </div>
    `;
  }

  protected _render() {
    super._render();

    const container = <HTMLElement>this.element;
    if (!container) return;

    const messages = [...container.querySelectorAll(".message")];
    const unreadMessages = this.unreadMessages || 0;
    const targetMessage = messages.at(-1 - unreadMessages);

    if (this.unreadMessages) {
      console.log("CHANGE CHAT LIST");
      const chatId = store.get().activeChat?.id as number;
      const chatList = store.get().chatList as IChat[];
      store.set(
        "chatList",
        chatList.map((chat) => {
          if (chat.id === chatId) {
            return { ...chat, unreadCount: 0 };
          } else {
            return chat;
          }
        }),
      );
    }

    if (!targetMessage) return;

    const images = container.querySelectorAll("img");
    let loadedCount = 0;

    container.style.opacity = "0";

    const makeScroll = () => {
      targetMessage.scrollIntoView({ block: "end" });
      container.scrollBy(0, 25);
      container.style.opacity = "1";
    };

    if (images.length === 0) {
      setTimeout(() => {
        makeScroll();
      });
      return;
    }

    setTimeout(() => {
      images.forEach((img) => {
        if (img.complete) {
          loadedCount++;
          if (loadedCount === images.length) {
            makeScroll();
          }
        } else {
          img.onload = () => {
            loadedCount++;
            if (loadedCount === images.length) {
              makeScroll();
            }
          };
          img.onerror = () => {
            loadedCount++;
            if (loadedCount === images.length) {
              makeScroll();
            }
          };
        }
      });
    });
  }
}

export default connectWithStore(MessageList, (store) => ({
  currentChatMessages: store.currentChatMessages,
}));
