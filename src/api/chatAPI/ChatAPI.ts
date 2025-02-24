import { HTTPTransport } from "../../core/HTTPTransport.ts";
import { ChatResponse, ChatTokenResponse } from "./chat.model.ts";

const chatHTTPTransport = new HTTPTransport("/chats");

class ChatAPI {
  private static instance: ChatAPI;

  constructor() {
    if (ChatAPI.instance) {
      return ChatAPI.instance;
    }

    ChatAPI.instance = this;
  }

  async getChatsList(): Promise<ChatResponse[]> {
    const response = await chatHTTPTransport.get("");

    if (!response.ok) {
      const errorMessage = JSON.parse(response.response);
      throw new Error(errorMessage.reason);
    }

    return JSON.parse(response.response);
  }

  async getChatToken(chatId: number): Promise<ChatTokenResponse> {
    const response = await chatHTTPTransport.post(`/token/${chatId}`);

    if (!response.ok) {
      const errorMessage = JSON.parse(response.response);
      throw new Error(errorMessage.reason);
    }

    return JSON.parse(response.response);
  }

  async changeChatAvatar(data: FormData): Promise<ChatResponse> {
    const response = await chatHTTPTransport.put("/avatar", {
      data,
    });

    if (!response.ok) {
      const errorMessage = JSON.parse(response.response);
      throw new Error(errorMessage.reason);
    }

    return JSON.parse(response.response);
  }
}

export const chatAPIInstance = new ChatAPI();
