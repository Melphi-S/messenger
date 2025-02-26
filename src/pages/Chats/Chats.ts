import { Block } from "../../core/Block.ts";
import "./Chats.scss";
import { Button } from "../../components/Button";
import { SearchInput } from "../../components/SearchInput";
import { ChatPreview, ChatPreviewProps } from "../../components/ChatPreview";
import { withAuthCheck } from "../../HOCs/withAuthCheck.ts";
import { User } from "../../api/userAPI/user.model.ts";
import { router } from "../../main.ts";
import { IChat } from "../../api/chatAPI";
import { connectWithStore, store } from "../../store/Store.ts";
import { chatController } from "../../controllers/ChatController.ts";
import { Chat } from "../../components/Chat";
import { ChatWS } from "../../api/chatAPI/ChatWS.ts";
import { Popup } from "../../components/Popup";
import { AddChatPopup } from "../../components/AddChatPopup/AddChatPopup.ts";

class ChatsPage extends Block {
  chatWS: ChatWS | null;

  constructor() {
    super({
      profileButton: new Button({
        view: "ghost",
        type: "button",
        text: "Your profile >",
        events: {
          click: (e) => {
            e.preventDefault();
            router.go("/profile");
          },
        },
      }),
      createChatButton: new Button({
        view: "primary",
        type: "button",
        text: "Create new chat",
        isDisabled: false,
        events: {
          click: () => {
            this.getChildren().popup.changeProps({ hidden: false });
          },
        },
      }),
      popup: new Popup({
        content: new AddChatPopup(),
        hidden: true,
      }),
      searchInput: new SearchInput({
        name: "search",
        placeholder: "Search",
        type: "text",
        value: "",
        events: {
          input: async (e) => {
            if (
              e.target !== undefined &&
              e.target instanceof HTMLInputElement
            ) {
              await chatController.getChatsList(e.target.value);
            }
          },
        },
      }),
      chatPreviews: [],
    });

    this.chatWS = null;
  }

  componentDidMount() {
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
      <main class="page page_type_sidebar">
        <div class="chats-sidebar">
          <div class="chats-sidebar__header">
            {{{ profileButton }}}
            {{{ createChatButton }}}
            {{{ searchInput}}}
          </div>
          <div class="chats-sidebar__list">
              {{{ chatPreviews }}}
          </div>
        </div>
        {{#if activeChat}}
          {{{ activeChat }}}
        {{else}}
          <p class="chats-main_select-message">
            Select a chat
          </p>
        {{/if}}
        {{{ popup }}}
      </main>
    `;
  }
}

export default connectWithStore(
  withAuthCheck(ChatsPage, "private"),
  (store) => ({
    chatList: store.chatList,
  }),
);
