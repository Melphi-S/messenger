import { Block } from "../../core/Block.ts";
import "./Overlay.scss";

interface Props {
  events?: {
    click: (e: MouseEvent) => void;
  };
}

export class Overlay extends Block {
  constructor(props: Props) {
    super("div", {
      ...props,
    });
  }

  protected render() {
    super.render();

    // language=hbs
    return `
      <div class="overlay"></div>
    `;
  }
}
