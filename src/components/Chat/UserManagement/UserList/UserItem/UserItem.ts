import { Block } from "../../../../../core/Block.ts";
import { User } from "../../../../../api/userAPI";
import { Button } from "../../../../Button";
import "./UserItem.scss";
import { chatController } from "../../../../../controllers/ChatController.ts";

interface Props {
  user: User;
  chatId: number;
}

export class UserItem extends Block {
  constructor({ user, chatId }: Props) {
    super({
      userName: user.displayName || user.firstName,
      deleteButton: new Button({
        type: "button",
        text: "X",
        view: "danger",
        events: {
          click: async () => {
            await chatController.deleteUser(chatId, user.id);
          },
        },
      }),
    });
  }

  protected render() {
    super.render();

    // language=hbs
    return `
      <li class="user-item">
        <span class="user-item__name">{{{ userName }}}</span>
        {{{ deleteButton }}}
      </li>
    `;
  }
}
