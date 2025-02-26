import { Block } from "../../core/Block.ts";
import "./Chats.scss";
import { Button } from "../../components/Button";
import { SearchInput } from "../../components/SearchInput";
import { withAuthCheck } from "../../HOCs/withAuthCheck.ts";
import { router } from "../../main.ts";
import { chatController } from "../../controllers/ChatController.ts";
import { Popup } from "../../components/Popup";
import { AddChatPopup } from "../../components/AddChatPopup";
import ChatList from "../../components/ChatList/ChatList.ts";
import ActiveChat from "../../components/ActiveChat/ActiveChat.ts";
import { debounce } from "../../utils/debounce.ts";

class ChatsPage extends Block {
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
          input: debounce(async (e) => {
            if (
              e.target !== undefined &&
              e.target instanceof HTMLInputElement
            ) {
              await chatController.getChatsList(e.target.value);
            }
          }, 500),
        },
      }),
      chatList: new ChatList({}),
      activeChat: new ActiveChat({}),
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
            {{{ createChatButton }}}
            {{{ searchInput}}}
          </div>
          {{{ chatList }}}
        </div>
        {{{ activeChat }}}
        {{{ popup }}}
      </main>
    `;
  }
}

export default withAuthCheck(ChatsPage, "private");
