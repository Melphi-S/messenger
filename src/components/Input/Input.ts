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
  oneLine?: boolean;

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
          <div class="{{#if oneLine}}oneLine {{#if error}}oneLine_error{{/if}} {{#if disabled}}oneLine_disabled{{/if}}{{/if}}">
            <span class="label-text {{#if oneLine}}label-text_oneLine{{/if}}">{{label}}</span>
            <input class='input {{#if error}}{{#unless oneLine}}input_error{{/unless}}{{/if}} {{#if oneLine}}input_oneLine{{/if}}' placeholder='{{placeholder}}' name='{{name}}' type='{{type}}' autocomplete {{#if disabled}}disabled{{/if}} value={{value}}>
          </div>
             <span class="error-text">{{error}}</span>
          </label>
    `;
  }
}
