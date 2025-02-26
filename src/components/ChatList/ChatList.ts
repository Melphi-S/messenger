import { Block } from "../../core/Block.ts";
// import { ChatWS } from "../../api/chatAPI/ChatWS.ts";
import { chatController } from "../../controllers/ChatController.ts";
import { connectWithStore, store } from "../../store/Store.ts";
import { IChat } from "../../api/chatAPI";
import { ChatPreview, ChatPreviewProps } from "../ChatPreview";
import { User } from "../../api/userAPI/user.model.ts";

class ChatList extends Block {
  constructor() {
    super({
      chatPreviews: [],
    });
  }

  componentDidMount() {
    console.log("MOUNT");
    if (!store.get().chatList) {
      chatController.getChatsList().then((chatList) => {
        if (chatList) {
          const chatPreviews = this.createChatsList(chatList);
          this.changeLists({ chatPreviews });
        }

        // const currentUser = store.get().currentUser;
        // if (currentUser) {
        //   const chatWS = new ChatWS(currentUser.id);
        //   store.set("chatWS", chatWS);
        // }
      });
    }

    return super.componentDidMount();
  }

  componentDidUpdate(): boolean {
    console.log("UPDATE");
    const chatPreviews = this.createChatsList(store.get().chatList);
    this.changeLists({ chatPreviews }, false);

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
}

export default connectWithStore(ChatList, (store) => ({
  chatList: store.chatList,
}));
