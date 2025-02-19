import { Block } from "../../core/Block.ts";
import { ButtonTypes } from "./Button.types.ts";
import "./Button.scss";

interface Props {
  view: ButtonTypes;
  type: HTMLButtonElement["type"];
  disabled?: boolean;
  text: string;

  events?: {
    click?: (event: Event) => void;
  };
}

export class Button extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  protected render() {
    super.render();
    // language=hbs
    return `
      <button class="button button_type_{{view}} {{#if disabled}}button_disabled{{/if}}" type="{{type}}" {{#if disabled}}disabled{{/if}}">
        {{ text }}
      </button>
    `;
  }
}
