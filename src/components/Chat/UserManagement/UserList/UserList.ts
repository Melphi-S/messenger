import { Block, BlockProps } from "../../../../core/Block.ts";
import { User } from "../../../../api/userAPI/user.model.ts";
import { connectWithStore, store } from "../../../../store/Store.ts";
import "./UserList.scss";
import { UserItem } from "./UserItem/UserItem.ts";
import { getFormData } from "../../../../utils/getFormData.ts";
import { userController } from "../../../../controllers/UserController.ts";
import { chatController } from "../../../../controllers/ChatController.ts";

interface Props extends BlockProps {
  users: User[];
  chatId: number;
}

class UserList extends Block {
  constructor({ chatId }: Props) {
    const chatUsers = store
      .get()
      .chatsUsers.find((chat) => chat.chatId === chatId)?.users;

    const currentUser = store.get().currentUser as User;

    super({
      chatId,
      userList: chatUsers
        ?.filter((user) => user.id !== currentUser.id)
        .map(
          (user) =>
            new UserItem({
              user,
              chatId,
            }),
        ),
      handleAddUserEvents: {
        click: async () => {
          const body = getFormData(this);

          if (body) {
            const newUser = await userController.getUserByLogin(body.login);

            if (newUser) {
              await chatController.addUser(chatId, newUser);
            }
          }
        },
      },
    });
  }

  protected render() {
    super.render();

    // language=hbs
    return `
      <div class="user-list">
        <ul class="user-list__wrapper">
          <span class="user-item__name">You</span>
          {{{ userList }}}
        </ul>
        {{{ component "Input" label="" type="text" name="login" value='' placeholder="Enter login of user to add" }}}
        {{{ component "Button" text="+ Add user" type="button" view="secondary" events=handleAddUserEvents }}}
      </div>
    `;
  }
}

export default connectWithStore(UserList, (store) => ({
  chatsUsers: store.chatsUsers,
}));
