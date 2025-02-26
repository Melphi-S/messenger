import { Block } from "../../core/Block.ts";
import "./HintButton.scss";

interface Props {
  type: "media" | "file" | "location" | "add" | "delete";
  text: string;
  events?: {
    click: () => void;
  };
}

export class HintButton extends Block {
  constructor({ type, text, ...props }: Props) {
    super({
      ...props,
      type: type,
      text: text,
    });
  }

  protected render() {
    super.render();
    // language=hbs
    return `
      <div class="hint-button">
        <div class="hint-button__icon hint-button__icon_type_{{ type }}"></div>
        <p class="hint-button__text">{{ text }}</p>
      </div>
    `;
  }
}
