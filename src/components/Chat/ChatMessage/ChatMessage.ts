import { Block } from "../../../core/Block.ts";

import "./ChatMessage.scss";
import { dateToChatView } from "../../../utils/parseDate.ts";
import { Message } from "../../../api/chatAPI";

interface Props {
  message: Message;
  currentUserId: number;
}

export class ChatMessage extends Block {
  constructor({ message, currentUserId }: Props) {
    super({
      text: true,
      body: message.content,
      author: message.userId === currentUserId ? "mine" : "his",
      date: dateToChatView(message.time),
      currentUserId: currentUserId,
      message: message,
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
