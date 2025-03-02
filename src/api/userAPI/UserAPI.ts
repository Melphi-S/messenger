import { HTTPTransport } from "../../core/HTTPTransport.ts";
import {
  ChangePasswordDTO,
  ChangeProfileDTO,
  UserResponse,
} from "./user.model.ts";

const userHTTPTransport = new HTTPTransport("/user");

class UserAPI {
  private static instance: UserAPI;

  constructor() {
    if (UserAPI.instance) {
      return UserAPI.instance;
    }

    UserAPI.instance = this;
  }

  async changeProfileData(data: ChangeProfileDTO): Promise<UserResponse> {
    const response = await userHTTPTransport.put("/profile", {
      data,
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorMessage = JSON.parse(response.response);
      throw new Error(errorMessage.reason);
    }

    return JSON.parse(response.response);
  }

  async changeAvatar(data: FormData) {
    const response = await userHTTPTransport.put("/profile/avatar", {
      data,
    });

    if (!response.ok) {
      const errorMessage = JSON.parse(response.response);
      throw new Error(errorMessage.reason);
    }

    return JSON.parse(response.response);
  }

  async changePassword(data: ChangePasswordDTO) {
    const response = await userHTTPTransport.put("/password", {
      data,
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorMessage = JSON.parse(response.response);
      throw new Error(errorMessage.reason);
    }

    return "ok";
  }

  async getUserByLogin(login: string): Promise<UserResponse[]> {
    const response = await userHTTPTransport.post("/search", {
      data: {
        login,
      },
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorMessage = JSON.parse(response.response);
      throw new Error(errorMessage.reason);
    }

    return JSON.parse(response.response);
  }
}

export const userAPIInstance = new UserAPI();
