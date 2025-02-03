import { Block } from "../../core/Block.ts";
import "./ChatPreview.scss";
import { Avatar } from "../Avatar/Avatar.ts";
import { Chat } from "../../api/models/chat.model.ts";
import { currentUser, MOCK_USERS } from "../../api/mockAPI.ts";
import { dateToChatView } from "../../utils/parseDate.ts";

interface Props {
  chat: Chat;
  events: {
    click: (event: Event) => void;
  };
  isActive?: boolean;
}

export class ChatPreview extends Block {
  constructor({ chat, events }: Props) {
    super("div", {
      events,
      title:
        chat.name ||
        MOCK_USERS.find(
          (user) =>
            user.id === chat.participants.find((id) => id !== currentUser.id),
        )?.displayName ||
        "New chat",
      avatar: new Avatar({
        size: "s",
        edit: false,
        imageSrc:
          chat.image ||
          MOCK_USERS.find(
            (user) =>
              user.id === chat.participants.find((id) => id !== currentUser.id),
          )?.avatar ||
          "",
      }),
      lastMessage:
        chat.messages.at(-1)?.type === "text"
          ? chat.messages.at(-1)?.body
          : "Image",
      curUserMessage: chat.messages.at(-1)?.authorId === currentUser.id,
      date: dateToChatView(chat.messages.at(-1)?.date) || "...",
      unreadMessages: chat.messages.filter(
        (message) => !message.seenBy.includes(currentUser.id),
      ).length,
      id: chat.id,
    });
  }

  protected render() {
    super.render();
    // language=hbs
    return `
      <div class="previewMessage {{#if isActive}}previewMessage_active{{/if}}" id="{{{id}}}">
        {{{ avatar }}}
        <div class="previewMessage__mainContainer">
          <p class="previewMessage__title">{{{title}}}</p>
          <p class="previewMessage__message"> <span class="previewMessage__authorSpan">{{#if curUserMessage}}Вы: {{/if}}</span>{{lastMessage}}</p>
        </div>
        <div class="previewMessage__rightContainer">
          <span class="previewMessage__date">{{{date}}}</span>
          {{#if unreadMessages}} <div class="previewMessage__unreadCount">{{{unreadMessages}}}</div> {{/if}}
        </div>
      <div>
    `;
  }
}
