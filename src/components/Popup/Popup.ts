import { Block, BlockProps } from "../../core/Block.ts";
import "./Popup.scss";
import { Overlay } from "../Overlay";

interface Props extends BlockProps {
  content: Block;
  hidden: boolean;
}

export class Popup extends Block {
  constructor(props: Props) {
    super({
      ...props,
      overlay: new Overlay({
        events: {
          click: () => {
            this.changeProps({ hidden: true });
          },
        },
      }),
    });
  }

  protected render() {
    super.render();

    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        this.changeProps({ hidden: true });
      }
    });

    // language=hbs
    return `
      <div class="popup {{#if hidden}}popup_hidden{{/if}}">
        {{{ overlay }}}
          <div class="popup__content">
              {{{ content }}}
          </div>
      </div>
    `;
  }
}
