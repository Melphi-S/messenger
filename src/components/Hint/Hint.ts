import { Block } from "../../core/Block.ts";
import "./Hint.scss";

interface Props {
  content: Block | Block[];
  position: "top" | "bottom";
}

export class Hint extends Block {
  constructor({ content, position }: Props) {
    super("div", {
      content: content,
      position: position,
    });
  }

  protected render() {
    super.render();
    // language=hbs
    return `
      <div class="hint hint_position_{{position}}">
        {{{ content }}}
      </div>
    `;
  }
}
