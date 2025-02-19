import { Block, BlockProps } from "../../core/Block.ts";
import "./AuthLayout.scss";
import { Input } from "../Input";
import { Button } from "../Button";
import { withAuthCheck } from "../../HOCs/withAuthCheck.ts";

interface Props extends BlockProps {
  title: string;
  inputs: Input[];
  buttons: Button[];
}

class AuthLayout extends Block {
  constructor(props: Props) {
    super({
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
            <h1 class="form-header">{{{ title }}}</h1>
            <div class="inputs-wrapper">
              {{{ inputs }}}
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

export default withAuthCheck(AuthLayout, "public");
