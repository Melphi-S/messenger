import { Message } from "../../../api/chatAPI";
import { Block, BlockProps } from "../../../core/Block.ts";
import { ChatMessage } from "../ChatMessage/ChatMessage.ts";
import "./MessageList.scss";
import { connectWithStore, store } from "../../../store/Store.ts";

class MessageList extends Block {
  constructor() {
    super({
      messages: [],
    });
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

  // private handleScroll() {
  //   const messageContainer = this.getElement();
  //
  //   if (messageContainer && messageContainer.scrollTop === 0) {
  //     const prevHeight = messageContainer.scrollHeight;
  //     const prevScrollTop = messageContainer.scrollTop;
  //
  //     this.from += 20; // Увеличиваем смещение
  //     this.chatWS.getMessages(this.from);
  //
  //     setTimeout(() => {
  //       if (messageContainer) {
  //         const newHeight = messageContainer.scrollHeight;
  //         const scrollDifference = newHeight - prevHeight;
  //
  //         messageContainer.scrollTop = 1000;
  //         console.log("TOP", messageContainer.scrollTop);
  //       }
  //     }, 0);
  //   }
  // }

  protected _render() {
    super._render();

    const container = <HTMLElement>this.element;
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

export default connectWithStore(MessageList, (store) => ({
  currentChatMessages: store.currentChatMessages,
}));
