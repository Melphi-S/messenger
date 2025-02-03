export interface User {
  id: number;
  email: string;
  firstName: string;
  secondName: string;
  displayName: string;
  phone: string;
  avatar: string;
}

export interface UserPublic extends Pick<User, "id" | "displayName"> {}
