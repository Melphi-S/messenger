import { Block } from "../../core/Block.ts";
import { connectWithStore, store } from "../../store/Store.ts";
import Chat from "../Chat/Chat.ts";

class ActiveChat extends Block {
  constructor() {
    super({
      activeChat: null,
    });
  }

  componentDidUpdate(): boolean {
    const activeChat = store.get().activeChat;

    if (activeChat) {
      const newChat = new Chat({
        chat: activeChat,
        currentUser: store.get().currentUser,
      });

      this.changeChildren({ activeChat: newChat }, false);

      newChat.dispatchComponentDidMount();
    }

    return super.componentDidUpdate();
  }

  protected render() {
    super.render();

    const activeChat = store.get().activeChat;

    if (!activeChat) {
      return `
        <p class="chats-main_select-message">
          Select a chat
        </p>
      `;
    }

    // language=hbs
    return `
      {{#if activeChat}}
        {{{ activeChat }}}
      {{/if}}
    `;
  }
}

export default connectWithStore(ActiveChat, (store) => ({
  activeChat: store.activeChat,
}));
