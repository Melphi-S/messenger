import { chatAPIInstance } from "./ChatAPI.ts";
import { store } from "../../store/Store.ts";
import { mapResponseToMessage, Message } from "./chat.model.ts";
import cloneDeep from "../../utils/cloneDeep.ts";
import { notificationManager } from "../../components/NotificationManager";

export class ChatWS {
  static BASE_URL = import.meta.env.VITE_WS_BASE_URL;
  private chatTokens: Map<number, string>;
  private socket: WebSocket | null = null;
  private pingTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.chatTokens = new Map();
  }

  public async connect(): Promise<void> {
    const chatId = store.get().activeChat?.id;
    let unreadMessages = store
      .get()
      .chatList?.find((chat) => chat.id === chatId)?.unreadCount as number;
    const userId = store.get().currentUser?.id;

    if (!chatId || !userId) {
      return;
    }

    let token = this.chatTokens.get(chatId);

    if (!token) {
      try {
        const response = await chatAPIInstance.getChatToken(chatId);
        token = response.token;
        this.chatTokens.set(chatId, token);
      } catch (err) {
        if (err instanceof Error) {
          notificationManager.notify(err.message, "error", 5000);
        } else {
          notificationManager.notify(
            "Error during getting chat token",
            "error",
            5000,
          );
        }
      }
    }

    store.clear("currentChatMessages", []);

    this.socket = new WebSocket(
      `${ChatWS.BASE_URL}/${userId}/${chatId}/${token}`,
    );

    this.pingTimer = setInterval(() => {
      this.socket?.send(
        JSON.stringify({
          type: "ping",
        }),
      );
    }, 30000);

    this.socket.addEventListener("open", async () => {
      let from = 0;
      while (unreadMessages >= 0) {
        await this.getMessages(from);
        from += 20;
        unreadMessages -= 20;
      }
      from = 0;
    });

    this.socket.addEventListener("message", (e) => {
      this.handleMessage(e);
    });
  }

  public async disconnect() {
    this.socket?.close();
    this.socket = null;
    if (this.pingTimer) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
  }

  public async getMessages(from: number = 0) {
    this.socket?.send(
      JSON.stringify({
        content: from,
        type: "get old",
      }),
    );
  }

  public handleMessage(event: MessageEvent) {
    const data = JSON.parse(event.data);

    const currentMessages = cloneDeep(store.get().currentChatMessages);

    if (Array.isArray(data)) {
      store.set("currentChatMessages", [
        ...data.reverse().map((message) => mapResponseToMessage(message)),
        ...(currentMessages as Message[]),
      ]);
    } else if (data.type === "message") {
      store.set("currentChatMessages", [
        ...(currentMessages as Message[]),
        mapResponseToMessage(data),
      ]);
    }
  }

  public sendMessage(message: string) {
    this.socket?.send(
      JSON.stringify({
        content: message,
        type: "message",
      }),
    );
  }
}

export const websocket = new ChatWS();
