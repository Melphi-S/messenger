import { Block } from "../../core/Block.ts";
import "./AuthLayout.scss";
import { Input } from "../Input/Input.ts";
import { Button } from "../Button/Button.ts";

interface Props {
  title: string;
  inputs: Input[];
  buttons: Button[];
}

export class AuthLayout extends Block {
  constructor(props: Props) {
    super("main", {
      ...props,
    });
  }

  protected render() {
    super.render();
    // language=hbs
    return `
      <main class="page">
        <form class="auth-form" data-navigate="/chats">
          <div>
            <h1 class="form-header">{{{title}}}</h1>
            <div class="inputs-wrapper">
              {{{inputs}}}
            </div>
          </div>
            <div class="auth-button-container">
              {{{ buttons }}}
            </div>
        </form>
      </main>
    `;
  }
}
