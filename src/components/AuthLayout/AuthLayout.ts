import { Block, BlockProps } from "../../core/Block.ts";
import "./AuthLayout.scss";
import Handlebars from "handlebars";

interface Props extends BlockProps {
  title: string;
  inputs: string;
  buttons: string;
}

export class AuthLayout extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  protected render() {
    super.render();

    const inputs = Handlebars.compile(this.getProps().inputs)(this.getProps());

    const buttons = Handlebars.compile(this.getProps().buttons)(
      this.getProps(),
    );

    // language=hbs
    return `
      <main class="page">
        <form class="auth-form" data-navigate="/chats">
          <div>
            <h1 class="form-header">{{{ title }}}</h1>
            <div class="inputs-wrapper">
              ${inputs}
            </div>
          </div>
            <div class="auth-button-container">
              ${buttons}
            </div>
        </form>
      </main>
    `;
  }
}
