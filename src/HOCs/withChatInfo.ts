import { Block } from "../core/Block.ts";
import { connectWithStore } from "../store/Store.ts";
import { IChat } from "../api/chatAPI";

export const withChatInfo = (Component: typeof Block, chat: IChat) => {
  class WithChatInfo extends Component {
    protected render() {
      return super.render();
    }
  }

  return connectWithStore(WithChatInfo, (store) => ({
    chat: store.chatList?.find((chat) => chat.id === this.ge),
  }));
};
