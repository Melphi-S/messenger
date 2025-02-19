import { Block } from "../../../core/Block.ts";
import { Message } from "../../../api/models/message.model.ts";
import "./ChatMessage.scss";
import { currentUser } from "../../../api/mockAPI.ts";
import { dateToChatView } from "../../../utils/parseDate.ts";

interface Props {
  message: Message;
}

export class ChatMessage extends Block {
  constructor({ message }: Props) {
    super({
      text: message.type === "text",
      body: message.body,
      author: message.authorId === currentUser.id ? "mine" : "his",
      date: dateToChatView(message.date),
      read:
        message.authorId === currentUser.id &&
        message.seenBy.some((id) => id !== currentUser.id),
    });
  }

  protected render() {
    super.render();
    // language=hbs
    return `
      {{#if text}}
        <div  class="message chat-message chat-message_type_{{{ author }}}">
          <p class="chat-message__text">
            {{{ body }}}
          </p>
          <div class="chat-message__date-wrapper">
            {{#if read}}
              <span class="chat-message__read-icon"></span>
            {{/if}}
            <span class="chat-message__date chat-message__date_type_{{{ author }}}">{{{ date }}}</span>
          </div>
        </div>
      {{else}}
        <div class="message chat-image chat-image_type_{{{ author }}}">
          <img class="chat-image__image" src='{{ body }}' alt="{{ body }}"/>
          <div class="chat-message__date-wrapper chat-message__date-wrapper_type_image">
            {{#if read}}
              <span class="chat-message__read-icon"></span>
            {{/if}}
            <span class="chat-message__date chat-message__date_color_revert">{{{ date }}}</span>
          </div>
        </div>
      {{/if}}
    `;
  }
}
