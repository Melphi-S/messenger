import { User } from "../api/userAPI/user.model.ts";
import { BlockProps } from "../core/Block.ts";
import { Message } from "../api/chatAPI";

export interface AppStore extends BlockProps {
  currentUser: User | null;
  currentChatMessages: Message[];
}
