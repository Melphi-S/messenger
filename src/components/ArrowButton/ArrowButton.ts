import { Block } from "../../core/Block.ts";
import "./ArrowButton.scss";

interface Props {
  direction: "right" | "left";
  type: HTMLButtonElement["type"];
  isDisabled?: boolean;

  events?: {
    click?: (event: Event) => void;
  };
}

export class ArrowButton extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  protected render() {
    super.render();
    // language=hbs
    return `
      <button {{#if isDisabled}}disabled{{/if}} class="arrow-button arrow-button_direction_{{ direction }} {{#if isDisabled}}arrow-button_disabled{{/if}}" type="{{type}}"/>
    `;
  }
}
