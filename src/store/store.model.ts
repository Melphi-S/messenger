import { User } from "../api/models/user.model.ts";
import { BlockProps } from "../core/Block.ts";

export interface AppStore extends BlockProps {
  currentUser: User | null;
}
