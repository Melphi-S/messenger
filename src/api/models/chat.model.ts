import { Message } from "./message.model.ts";

export interface Chat {
  id: number;
  name: string;
  participants: number[];
  image: string;
  messages: Message[];
}
