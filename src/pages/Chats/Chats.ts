import { Block } from "../../core/Block.ts";
import "./Chats.scss";
import { Button } from "../../components/Button";
import app from "../../App.ts";
import { SearchInput } from "../../components/SearchInput";
import { ChatPreview } from "../../components/ChatPreview";
import { MOCK_CHATS } from "../../api/mockAPI.ts";
import { Chat } from "../../components/Chat";
import { LSKeys, saveToLS } from "../../utils/LS.ts";

interface Props {
  activeChat: Chat | null;
}

export class ChatsPage extends Block {
  constructor({ activeChat }: Props) {
    super("main", {
      profileButton: new Button({
        view: "ghost",
        type: "button",
        text: "Your profile >",
        events: {
          click: (e) => {
            e.preventDefault();
            app.navigate("/profile");
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
      chatPreviews: MOCK_CHATS.map(
        (chat) =>
          new ChatPreview({
            chat,
            events: {
              click: (e) => {
                const activeChat = MOCK_CHATS.find(
                  (chat) =>
                    String(chat.id) === (e.currentTarget as HTMLDivElement)?.id,
                );

                if (activeChat) {
                  this.changeChildren({
                    activeChat: new Chat({ chat: activeChat }),
                  });

                  const previews = this.getLists().chatPreviews;

                  previews
                    .find((preview) => preview.getProps().isActive)
                    ?.changeProps({ isActive: false });

                  previews
                    .find((preview) => preview.getProps().id === chat.id)
                    ?.changeProps({ isActive: true });

                  saveToLS(LSKeys.LAST_CHAT, String(activeChat.id));
                }
              },
            },
            isActive: chat.id == activeChat?.getProps().id,
          }),
      ),
      activeChat,
    });
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
