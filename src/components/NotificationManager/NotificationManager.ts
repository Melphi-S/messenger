import { Block } from "../../core/Block.ts";
import "./NotificationManager.scss";
import { Notification } from "./Notification/Notification.ts";

class NotificationManager extends Block {
  constructor() {
    super({
      notifications: [],
    });
  }

  public notify(
    message: string,
    type: "error" | "success" | "info",
    duration: number = 3000,
  ) {
    const notificationId = String(Date.now());
    const newNotification = new Notification({
      message,
      type,
      duration,
      notificationId,
    });
    const notifications = [...this.getLists().notifications, newNotification];
    this.changeLists({ notifications });

    setTimeout(() => {
      this.removeNotification(notificationId);
    }, duration);
  }

  private removeNotification(id: string) {
    const notifications = this.getLists().notifications.filter(
      (notification) => notification.getProps().notificationId !== id,
    );
    this.changeLists({ notifications });
  }

  protected render() {
    // language=hbs
    return `
      <div class="notification-manager">
        {{{ notifications }}}
      </div>
    `;
  }
}

export const notificationManager = new NotificationManager();
