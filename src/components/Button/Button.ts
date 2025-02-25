import { Block, BlockProps } from "../../core/Block.ts";
import { ButtonTypes } from "./Button.types.ts";
import "./Button.scss";

interface Props extends BlockProps {
  view: ButtonTypes;
  type: HTMLButtonElement["type"];
  isDisabled?: boolean;
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
      <button class="button button_type_{{view}} {{#if isDisabled}}button_disabled{{/if}}" type="{{type}}" {{#if isDisabled}}disabled{{/if}}>
        {{ text }}
      </button>
    `;
  }
}
