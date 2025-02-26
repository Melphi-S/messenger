import { User } from "../api/userAPI";
import { BlockProps } from "../core/Block.ts";
import { IChat, Message } from "../api/chatAPI";

export interface AppStore extends BlockProps {
  currentUser: User | null;
  currentChatMessages: Message[];
  chatList: IChat[] | null;
  chatsUsers: {
    chatId: number;
    users: User[];
  }[];
  activeChat: IChat | null;
}
