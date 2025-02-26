import { HTTPTransport } from "../../core/HTTPTransport.ts";
import { ChatResponse, ChatTokenResponse } from "./chat.model.ts";
import { User, UserResponse } from "../userAPI/user.model.ts";

const chatHTTPTransport = new HTTPTransport("/chats");

class ChatAPI {
  private static instance: ChatAPI;

  constructor() {
    if (ChatAPI.instance) {
      return ChatAPI.instance;
    }

    ChatAPI.instance = this;
  }

  async getChatsList(
    title: string,
    offset: number,
    limit: number,
  ): Promise<ChatResponse[]> {
    const response = await chatHTTPTransport.get("", {
      data: { title, offset, limit },
    });

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

  async getChatUsers(chatId: number): Promise<UserResponse[]> {
    const response = await chatHTTPTransport.get(`/${chatId}/users`);

    if (!response.ok) {
      const errorMessage = JSON.parse(response.response);
      throw new Error(errorMessage.reason);
    }

    return JSON.parse(response.response);
  }

  async addUser(chatId: number, userId: number) {
    const response = await chatHTTPTransport.put(`/users`, {
      data: { users: [userId], chatId },
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorMessage = JSON.parse(response.response);
      throw new Error(errorMessage.reason);
    }

    return "ok";
  }

  async deleteUser(chatId: number, userId: number) {
    const response = await chatHTTPTransport.delete(`/users`, {
      data: { users: [userId], chatId },
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorMessage = JSON.parse(response.response);
      throw new Error(errorMessage.reason);
    }

    return "ok";
  }

  async createChat(title: string) {
    const response = await chatHTTPTransport.post(``, {
      data: { title },
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorMessage = JSON.parse(response.response);
      throw new Error(errorMessage.reason);
    }

    return "ok";
  }
}

export const chatAPIInstance = new ChatAPI();
