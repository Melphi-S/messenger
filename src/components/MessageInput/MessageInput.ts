import { Input, InputProps } from "../Input/Input.ts";
import "./MessageInput.scss";

export class MessageInput extends Input {
  constructor(props: InputProps) {
    super({
      ...props,
    });
  }

  protected addEvents() {
    const { events } = this.getProps();

    if (events && typeof events === "object") {
      Object.keys(events).forEach((eventName) => {
        if (this.element) {
          this.element.addEventListener(
            eventName,
            events[eventName as keyof typeof events] as EventListener,
          );
        }
      });
    }
  }

  protected render() {
    super.render();
    // language=hbs
    return `
       <input class='message-input' placeholder='{{placeholder}}' name='{{name}}' type='text'/>
    `;
  }
}
