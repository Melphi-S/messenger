import { Block } from "../../core/Block.ts";
import "./ErrorPageLayout.scss";
import { Button } from "../Button";

interface Props {
  code: string;
  title: string;
}

export class ErrorPageLayout extends Block {
  constructor(props: Props) {
    super({
      ...props,
      button: new Button({
        text: "Back to chats",
        type: "button",
        view: "secondary",
        events: {
          click: () => {},
        },
      }),
    });
  }

  protected render() {
    super.render();
    // language=hbs
    return `
      <main class="page">
        <div class="error-page">
          <div class="error-page__content">
              <span class="error-page__code">{{{ code }}}</span>
              <span class="error-page__text">{{{ title }}}</span>
          </div>
          {{{ button }}}
        </div>
      </main>
    `;
  }
}
