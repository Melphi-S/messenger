import { Block, BlockProps } from "../../../core/Block.ts";
import "./Notification.scss";

interface NotificationProps extends BlockProps {
  message: string;
  type: "error" | "success" | "info";
  duration?: number;
  notificationId: string;
}

export class Notification extends Block {
  constructor(props: NotificationProps) {
    super({ ...props });
  }

  protected render() {
    // language=hbs
    return `
      <div class="notification notification_type_{{type}}">
        <span>{{{ message }}}</span>
      </div>
    `;
  }
}
