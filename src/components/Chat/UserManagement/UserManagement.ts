import { Block, BlockProps } from "../../../core/Block.ts";
import "./UserManagement.scss";
import { connectWithStore, store } from "../../../store/Store.ts";
import { User } from "../../../api/userAPI";

interface Props extends BlockProps {
  chatId: number;
  chatUsers: {
    chatId: number;
    users: User[];
  }[];
}

class UserManagement extends Block {
  constructor({ chatId }: Props) {
    super({
      chatId,
    });
  }

  protected render() {
    super.render();

    const chatId = (this.getProps() as Props).chatId;

    const chatUsers = store
      .get()
      .chatsUsers.find((chat) => chat.chatId === chatId)?.users;

    if (!chatUsers) {
      return `<div></div>`;
    }

    const usersCount = chatUsers.length;

    // language=hbs
    return `
      <div class="user-management">
        <span>${usersCount} ${usersCount > 1 ? "users" : "user"}</span>
        {{{ component "UserList" chatId=chatId }}}
      </div>
    `;
  }
}

export default connectWithStore(UserManagement, (store) => ({
  chatsUsers: store.chatsUsers,
}));
