import { Block, BlockProps } from "../../core/Block.ts";
import "./Avatar.scss";

interface Props extends BlockProps {
  size: "s" | "m" | "l";
  edit: boolean;
  imageSrc: string;
  events?: {
    click: () => void;
  };
}

export class Avatar extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  protected render() {
    super.render();

    // language=hbs
    return `
      <div class="avatar-wrapper avatar-wrapper_size_{{ size }} {{#if edit}}avatar-wrapper_type_edit{{/if}}">
        {{#if edit}}
          <button class="avatar-wrapper__button">
            <img class="avatar" src="{{#if imageSrc}}{{concat "https://ya-praktikum.tech/api/v2/resources/" imageSrc}}{{else}}/defaultAvatar.png{{/if}}" alt='avatar.'/>
          </button>
          <div class="avatar-wrapper_overlay" id="change-avatar">Change</div>
        {{else}}
          <img class="avatar" src="{{#if imageSrc}}{{concat "https://ya-praktikum.tech/api/v2/resources/" imageSrc}}{{else}}/defaultAvatar.png{{/if}}" alt='avatar.'/>
        {{/if}}
      </div>
    `;
  }
}
