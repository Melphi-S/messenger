import { Block } from "../../core/Block.ts";
import "./ArrowButton.scss";

interface Props {
  direction: "right" | "left";
  type: HTMLButtonElement["type"];
  disabled?: boolean;

  events?: {
    click?: (event: Event) => void;
  };
}

export class ArrowButton extends Block {
  constructor(props: Props) {
    super("button", {
      ...props,
    });
  }

  protected render() {
    super.render();
    // language=hbs
    return `
      <button class="arrow-button arrow-button_direction_{{ direction }} {{#if disabled}}arrow-button_disabled{{/if}}" type="button"/>
    `;
  }
}
