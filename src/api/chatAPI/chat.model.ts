import {
  mapResponseToUser,
  User,
  UserResponse,
} from "../userAPI/user.model.ts";

export interface ChatResponse {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: LastMessageResponse | null;
}

export interface IChat {
  id: number;
  title: string;
  avatar: string;
  unreadCount: number;
  createdBy: number;
  lastMessage: LastMessage | null;
}

export interface LastMessageResponse {
  user: UserResponse;
  time: string;
  content: string;
  id: number;
}

export interface LastMessage {
  user: User;
  time: string;
  content: string;
  id: number;
}

export interface MessageResponse {
  chat_id: number;
  content: string;
  file: string;
  id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
}

export interface Message {
  chatId: number;
  content: string;
  file: string;
  id: number;
  isRead: boolean;
  time: string;
  type: string;
  userId: number;
}

export const mapResponseToMessage = (response: MessageResponse): Message => ({
  chatId: response.chat_id,
  content: response.content,
  file: response.file,
  id: response.id,
  isRead: response.is_read,
  time: response.time,
  type: response.type,
  userId: response.user_id,
});

export const mapResponseToLastMessage = (
  response: LastMessageResponse,
): LastMessage => ({
  user: mapResponseToUser(response.user),
  time: response.time,
  content: response.content,
  id: response.id,
});

export const mapResponseToIChat = (response: ChatResponse): IChat => ({
  id: response.id,
  title: response.title,
  avatar: response.avatar,
  unreadCount: response.unread_count,
  createdBy: response.created_by,
  lastMessage: response.last_message
    ? mapResponseToLastMessage(response.last_message)
    : null,
});

export interface ChatTokenResponse {
  token: string;
}
