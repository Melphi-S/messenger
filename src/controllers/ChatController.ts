import { chatAPIInstance } from "../api/chatAPI/ChatAPI.ts";
import { mapResponseToIChat } from "../api/chatAPI";

class ChatController {
  async getChatsList() {
    try {
      const chatsResponse = await chatAPIInstance.getChatsList();
      return chatsResponse.map((chat) => mapResponseToIChat(chat));
    } catch (err) {
      console.log(err);
    }
  }

  async changeChatAvatar(chatId: number, file: File) {
    try {
      const data = new FormData();
      data.append("avatar", file);
      data.append("chatId", chatId);
      const chatResponse = await chatAPIInstance.changeChatAvatar(data);

      return mapResponseToIChat(chatResponse);
    } catch (err) {
      console.log(err);
    }
  }
}

export const chatController = new ChatController();
