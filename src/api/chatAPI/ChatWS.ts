import { chatAPIInstance } from "./ChatAPI.ts";
import { store } from "../../store/Store.ts";
import { mapResponseToMessage, Message } from "./chat.model.ts";
import cloneDeep from "../../utils/cloneDeep.ts";

export class ChatWS {
  static BASE_URL = import.meta.env.VITE_WS_BASE_URL;
  private readonly userId: number;
  private chatTokens: Map<number, string>;
  private socket: WebSocket | null = null;
  private pingTimer: NodeJS.Timeout;

  constructor(userId: number) {
    this.userId = userId;
    this.chatTokens = new Map();
  }

  public async connect(chatId: number): Promise<void> {
    let token = this.chatTokens.get(chatId);

    if (!token) {
      try {
        const response = await chatAPIInstance.getChatToken(chatId);
        token = response.token;
        this.chatTokens.set(chatId, token);
      } catch (err) {
        console.log(err);
      }
    }

    store.clear("currentChatMessages", []);

    this.socket = new WebSocket(
      `${ChatWS.BASE_URL}/${this.userId}/${chatId}/${token}`,
    );

    this.pingTimer = setInterval(() => {
      this.socket?.send(
        JSON.stringify({
          type: "ping",
        }),
      );
    }, 60000);

    this.socket.addEventListener("open", () => {
      this.getMessages();
    });

    this.socket.addEventListener("message", (e) => {
      this.handleMessage(e);
    });
  }

  public async disconnect() {
    this.socket?.close();
    this.socket = null;
    clearInterval(this.pingTimer);
  }

  public getMessages(from: number = 0) {
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
