import { User } from "../api/userAPI/user.model.ts";
import { BlockProps } from "../core/Block.ts";

export interface AppStore extends BlockProps {
  currentUser: User | null;
}
