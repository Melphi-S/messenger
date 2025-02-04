import { Block } from "../../core/Block.ts";
import "./Avatar.scss";

interface Props {
  size: "s" | "m" | "l";
  edit: boolean;
  imageSrc: string;
  events?: {
    click: () => void;
  };
}

export class Avatar extends Block {
  constructor(props: Props) {
    super("div", {
      ...props,
    });
  }

  protected render() {
    super.render();
    // language=hbs
    return `
            <div class="avatar-wrapper avatar-wrapper_size_{{size}} {{#if edit}}avatar-wrapper_type_edit{{/if}}">
                {{#if edit}}
                    <button class="avatar-wrapper__button">
                        <img class="avatar" src={{imageSrc}} alt='avatar.'/>
                    </button>
                    <div class="avatar-wrapper_overlay" id="change-avatar">Поменять аватар</div>
                {{else}}
                    <img class="avatar" src={{imageSrc}} alt='avatar.'/>
                {{/if}}
            </div>
    `;
  }
}
