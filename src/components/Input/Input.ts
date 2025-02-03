import { Block } from "../../core/Block.ts";
import "./Input.scss";

export interface InputProps {
  label?: string;
  error?: string;
  name: string;
  type: HTMLInputElement["type"];
  value: string;
  disabled?: boolean;
  placeholder?: string;

  events?: {
    blur?: (event: Event) => void;
    input?: (event: Event) => void;
    focus?: (event: Event) => void;
  };
}

export class Input extends Block {
  constructor(props: InputProps) {
    super("label", {
      ...props,
    });
  }

  protected addEvents() {
    const { events } = this.getProps();

    const input = this.element?.querySelector<HTMLInputElement>("input");

    if (input && events && typeof events === "object") {
      Object.keys(events).forEach((eventName) => {
        if (this.element) {
          input.addEventListener(
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
        <label class="label">
             <span class="label-text">{{label}}</span>
                <input class='input {{#if error}}input_error{{/if}}' placeholder='{{placeholder}}' name='{{name}}' type='{{type}}' autocomplete {{#if disabled}}disabled{{/if}} value={{value}}>
             <span class="error-text">{{error}}</span>
          </label>
    `;
  }
}
