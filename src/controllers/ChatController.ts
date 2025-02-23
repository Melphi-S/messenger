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
}

export const chatController = new ChatController();
