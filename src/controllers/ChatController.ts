import { chatAPIInstance } from "../api/chatAPI/ChatAPI.ts";
import { mapResponseToIChat } from "../api/chatAPI";
import { mapResponseToUser, User } from "../api/userAPI/user.model.ts";
import { store } from "../store/Store.ts";
import { notificationManager } from "../components/NotificationManager";

class ChatController {
  async getChatsList(
    title: string = "",
    offset: number = 0,
    limit: number = 100,
  ) {
    try {
      const chatsResponse = await chatAPIInstance.getChatsList(
        title,
        offset,
        limit,
      );
      const chats = chatsResponse.map((chat) => mapResponseToIChat(chat));
      store.set("chatList", chats);
      return chats;
    } catch (err) {
      if (err instanceof Error) {
        notificationManager.notify(err.message, "error", 5000);
      } else {
        notificationManager.notify(
          "Error during fetching chat list",
          "error",
          5000,
        );
      }
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
      if (err instanceof Error) {
        notificationManager.notify(err.message, "error", 5000);
      } else {
        notificationManager.notify(
          "Error during fetching chat avatar",
          "error",
          5000,
        );
      }
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
      if (err instanceof Error) {
        notificationManager.notify(err.message, "error", 5000);
      } else {
        notificationManager.notify(
          "Error during fetching chat users",
          "error",
          5000,
        );
      }
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
        notificationManager.notify(
          "User has been successfully added to the chat",
          "success",
          3000,
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        notificationManager.notify(err.message, "error", 5000);
      } else {
        notificationManager.notify(
          "Error during adding chat user",
          "error",
          5000,
        );
      }
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

        notificationManager.notify(
          "User has been successfully deleted from the chat",
          "success",
          3000,
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        notificationManager.notify(err.message, "error", 5000);
      } else {
        notificationManager.notify(
          "Error during deleting chat user",
          "error",
          5000,
        );
      }
    }
  }

  async createChat(title: string) {
    try {
      const newChat = await chatAPIInstance.createChat(title);
      notificationManager.notify(
        "New chat has been successfully created",
        "success",
        3000,
      );

      return newChat;
    } catch (err) {
      if (err instanceof Error) {
        notificationManager.notify(err.message, "error", 5000);
      } else {
        notificationManager.notify(
          "Error during creating new chat",
          "error",
          5000,
        );
      }
    }
  }
}

export const chatController = new ChatController();
