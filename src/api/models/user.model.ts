export interface User {
  id: number;
  email: string;
  firstName: string;
  secondName: string;
  displayName: string;
  phone: string;
  avatar: string;
  login: string;
}

export interface UserResponse {
  id: number;
  email: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  avatar: string;
  login: string;
}

export const mapResponseToUser = (response: UserResponse): User => ({
  id: response.id,
  email: response.email,
  firstName: response.first_name,
  secondName: response.second_name,
  displayName: response.display_name,
  phone: response.phone,
  avatar: response.avatar,
  login: response.login,
});
