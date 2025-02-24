import { Message } from "../../../api/chatAPI";
import { Block, BlockProps } from "../../../core/Block.ts";
import { ChatMessage } from "../ChatMessage/ChatMessage.ts";
import "./MessageList.scss";

interface Props extends BlockProps {
  currentChatMessages: Message[];
  currentUserId: number;
}

export class MessageList extends Block {
  constructor({ currentChatMessages, currentUserId, chatWS }: Props) {
    super({
      messages: currentChatMessages.map((message) => {
        return new ChatMessage({ message, currentUserId });
      }),
    });
  }

  componentDidMount(): boolean {
    const container = <HTMLElement>this.element;
    if (!container) return true;

    const images = container.querySelectorAll("img");
    let loadedCount = 0;

    container.style.opacity = "0";

    if (images.length === 0) {
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
        container.style.opacity = "1";
      });
      return true;
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

    return super.componentDidMount();
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
  //
  // protected _render() {
  //   super._render();
  //
  //   const container = <HTMLElement>this.getElement();
  //
  //   if (container) {
  //     container.addEventListener("scroll", () => this.handleScroll());
  //   }
  // }

  // protected _render() {
  //   super._render();
  //
  //   const container = <HTMLElement>this.element;
  //   if (!container) return;
  //
  //   const images = container.querySelectorAll("img");
  //   let loadedCount = 0;
  //
  //   container.style.opacity = "0";
  //
  //   if (images.length === 0) {
  //     setTimeout(() => {
  //       container.scrollTop = container.scrollHeight;
  //       container.style.opacity = "1";
  //     });
  //     return;
  //   }
  //
  //   setTimeout(() => {
  //     images.forEach((img) => {
  //       if (img.complete) {
  //         loadedCount++;
  //         if (loadedCount === images.length) {
  //           container.scrollTop = container.scrollHeight;
  //           container.style.opacity = "1";
  //         }
  //       } else {
  //         img.onload = () => {
  //           loadedCount++;
  //           if (loadedCount === images.length) {
  //             container.scrollTop = container.scrollHeight;
  //             container.style.opacity = "1";
  //           }
  //         };
  //         img.onerror = () => {
  //           loadedCount++; // Игнорируем ошибки загрузки
  //           if (loadedCount === images.length) {
  //             container.scrollTop = container.scrollHeight;
  //             container.style.opacity = "1";
  //           }
  //         };
  //       }
  //     });
  //   });
  // }
}
