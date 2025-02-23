import { Block, BlockProps } from "../../core/Block.ts";
import "./Chats.scss";
import { Button } from "../../components/Button";
import { SearchInput } from "../../components/SearchInput";
import { ChatPreview } from "../../components/ChatPreview";
import { withAuthCheck } from "../../HOCs/withAuthCheck.ts";
import { User } from "../../api/userAPI/user.model.ts";
import { router } from "../../main.ts";
import { IChat } from "../../api/chatAPI";
import { store } from "../../store/Store.ts";
import { chatController } from "../../controllers/ChatController.ts";
import { Chat } from "../../components/Chat";
import { ChatWS } from "../../api/chatAPI/ChatWS.ts";

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
      searchInput: new SearchInput({
        name: "search",
        placeholder: "Search",
        type: "text",
        value: "",
        events: {
          input: (e) => {
            if (e.target && e.target instanceof HTMLInputElement) {
              console.log(e.target.value);
            }
          },
        },
      }),
      chatPreviews: [],
      activeChat: null,
    });

    this.chatWS = null;
  }

  componentDidMount() {
    if (!store.get().chatsList) {
      chatController.getChatsList().then((chatList) => {
        if (chatList) {
          this.createChatsList(chatList);
        }

        const currentUser = store.get().currentUser;
        if (currentUser) {
          this.chatWS = new ChatWS(currentUser.id);
        }
      });
    }

    super.componentDidMount();
    return true;
  }

  private createChatsList(chatsList: IChat[]) {
    const chatPreviews = chatsList.map(
      (chat) =>
        new ChatPreview({
          chat: chat,
          isActive: false,
          events: {
            click: async () => {
              if (this.chatWS) {
                console.log("disconnect");
                await this.chatWS.disconnect();
              }
              await this.chatWS?.connect(chat.id);

              this.changeChildren({
                activeChat: new Chat({
                  chatWS: this.chatWS,
                }),
              });
            },
          },
          currentUser: this.getProps().currentUser as User,
        }),
    );
    this.changeLists({ chatPreviews });
  }

  protected render() {
    super.render();

    // language=hbs
    return `
      <main class="page page_type_sidebar">
        <div class="chats-sidebar">
          <div class="chats-sidebar__header">
            {{{ profileButton }}}
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
      </main>
    `;
  }
}

export default withAuthCheck(ChatsPage, "private");
