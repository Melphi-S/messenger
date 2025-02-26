import { Block } from "../../core/Block.ts";
import { chatController } from "../../controllers/ChatController.ts";
import { connectWithStore, store } from "../../store/Store.ts";
import { IChat } from "../../api/chatAPI";
import { ChatPreview, ChatPreviewProps } from "../ChatPreview";
import { User } from "../../api/userAPI";

class ChatList extends Block {
  constructor() {
    super({
      chatPreviews: [],
    });
  }

  componentDidMount() {
    if (!store.get().chatList) {
      chatController.getChatsList().then((chatList) => {
        if (chatList) {
          const chatPreviews = this.createChatsList(chatList);
          this.changeLists({ chatPreviews });
        }
      });
    }

    return super.componentDidMount();
  }

  componentDidUpdate(): boolean {
    const chatList = store.get().chatList;

    if (chatList) {
      const chatPreviews = this.createChatsList(chatList);
      this.changeLists({ chatPreviews }, false);
    }

    return true;
  }

  private createChatsList(chatsList: IChat[]) {
    return chatsList.map(
      (chat) =>
        new ChatPreview({
          chat: chat,
          isActive: store.get().activeChat?.id === chat.id,
          events: {
            click: async () => {
              const prevActiveChat = this.getLists().chatPreviews.find(
                (chat) => chat.getProps().isActive,
              );

              if (prevActiveChat) {
                prevActiveChat.changeProps({ isActive: false });
              }

              const newActiveChat = this.getLists().chatPreviews.find(
                (listChat) =>
                  (listChat.getProps() as ChatPreviewProps).chat.id === chat.id,
              );

              if (newActiveChat) {
                newActiveChat.changeProps({ isActive: true });
              }

              store.clear("currentChatMessages", []);
              store.set("activeChat", chat);
            },
          },
          currentUser: this.getProps().currentUser as User,
        }),
    );
  }

  protected render() {
    super.render();

    // language=hbs
    return `
      <div class="chats-sidebar__list">
        {{{ chatPreviews }}}
      </div>
    `;
  }

  protected _render() {
    super._render();

    const container = <HTMLElement>this.element;
    if (!container) return;

    const activeChat = container.querySelector(".preview-message_active");

    if (activeChat) {
      activeChat.scrollIntoView();
    }
  }
}

export default connectWithStore(ChatList, (store) => ({
  chatList: store.chatList,
}));
