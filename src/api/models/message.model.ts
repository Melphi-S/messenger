export interface Message {
  id: number;
  authorId: number;
  type: "text" | "image";
  body: string;
  date: Date;
  seenBy: number[];
}
