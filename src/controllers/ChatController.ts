import { chatAPIInstance } from "../api/chatAPI/ChatAPI.ts";
import { mapResponseToIChat } from "../api/chatAPI";
import { mapResponseToUser, User } from "../api/userAPI/user.model.ts";
import { store } from "../store/Store.ts";

class ChatController {
  async getChatsList() {
    try {
      const chatsResponse = await chatAPIInstance.getChatsList();
      const chats = chatsResponse.map((chat) => mapResponseToIChat(chat));
      store.set("chatList", chats);
      return chats;
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

  async getChatUsers(chatId: number) {
    try {
      const usersResponse = await chatAPIInstance.getChatUsers(chatId);
      const users = usersResponse.map((user) => mapResponseToUser(user));

      store.set("chatsUsers", [
        ...store.get().chatsUsers,
        {
          chatId,
          users,
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  }

  async addUser(chatId: number, user: User) {
    try {
      const res = await chatAPIInstance.addUser(chatId, user.id);

      if (res === "ok") {
        const chatUsers =
          store.get().chatsUsers.find((chat) => chat.chatId === chatId)
            ?.users || [];
        const storeChats = store
          .get()
          .chatsUsers.filter((chat) => chat.chatId !== chatId);
        store.set("chatsUsers", [
          ...storeChats,
          { chatId, users: [...chatUsers, user] },
        ]);
        console.log(store.get());
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteUser(chatId: number, userId: number) {
    try {
      const res = await chatAPIInstance.deleteUser(chatId, userId);

      if (res === "ok") {
        const currentChatsUsers = store.get().chatsUsers;

        const updatedChatsUsers = currentChatsUsers.map((chat) => {
          if (chat.chatId === chatId) {
            return {
              chatId,
              users: chat.users.filter((user) => user.id !== userId),
            };
          }
          return chat;
        });

        store.set("chatsUsers", updatedChatsUsers);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async createChat(title: string) {
    try {
      return await chatAPIInstance.createChat(title);
    } catch (err) {
      console.log(err);
    }
  }
}

export const chatController = new ChatController();
