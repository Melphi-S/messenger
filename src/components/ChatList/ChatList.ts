import { Block, BlockProps } from "../../core/Block.ts";
import { ChatWS } from "../../api/chatAPI/ChatWS.ts";
import { Button } from "../Button";
import { router } from "../../main.ts";
import { Popup } from "../Popup";
import { AddChatPopup } from "../AddChatPopup";
import { SearchInput } from "../SearchInput";
import { chatController } from "../../controllers/ChatController.ts";
import { connectWithStore, store } from "../../store/Store.ts";
import { IChat } from "../../api/chatAPI";
import { ChatPreview, ChatPreviewProps } from "../ChatPreview";
import { Chat } from "../Chat";
import { User } from "../../api/userAPI/user.model.ts";
import { withAuthCheck } from "../../HOCs/withAuthCheck.ts";

interface Props extends BlockProps {
  chatWs: ChatWS | null;
}

class ChatList extends Block {
  chatWS: ChatWS | null;

  constructor() {
    super({
      chatPreviews: [],
    });

    this.chatWS = null;
  }

  componentDidMount() {
    console.log("MOUNT");
    if (!store.get().chatList) {
      chatController.getChatsList().then((chatList) => {
        if (chatList) {
          const chatPreviews = this.createChatsList(chatList);
          this.changeLists({ chatPreviews });
        }

        const currentUser = store.get().currentUser;
        if (currentUser) {
          this.chatWS = new ChatWS(currentUser.id);
        }
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
          isActive: false,
          events: {
            click: async () => {
              if (this.chatWS) {
                await this.chatWS.disconnect();
              }

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

              await this.chatWS?.connect(chat.id);

              const newChat = new Chat({
                chatWS: this.chatWS,
                chat,
              });

              this.changeChildren({
                activeChat: newChat,
              });

              newChat.dispatchComponentDidMount();
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
