import { HTTPTransport } from "../../core/HTTPTransport.ts";
import { SignInDTO, SignUpDTO } from "./auth.model.ts";
import { UserResponse } from "../userAPI/user.model.ts";

const authHTTPTransport = new HTTPTransport("/auth");

class AuthAPI {
  private static instance: AuthAPI;

  constructor() {
    if (AuthAPI.instance) {
      return AuthAPI.instance;
    }

    AuthAPI.instance = this;
  }

  async signup(data: SignUpDTO): Promise<string> {
    const response = await authHTTPTransport.post("/signup", {
      data,
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorMessage = JSON.parse(response.response);
      throw new Error(errorMessage.reason);
    }

    return "ok";
  }

  async signin(data: SignInDTO): Promise<string> {
    const response = await authHTTPTransport.post("/signin", {
      data,
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorMessage = JSON.parse(response.response);
      throw new Error(errorMessage.reason);
    }

    return "ok";
  }

  async getCurrentUser(): Promise<UserResponse> {
    const response = await authHTTPTransport.get("/user");

    console.log(response);

    if (!response.ok) {
      const errorMessage = JSON.parse(response.response);
      throw new Error(errorMessage.reason);
    }

    return JSON.parse(response.response);
  }

  async logout(): Promise<string> {
    const response = await authHTTPTransport.post("/logout");

    if (!response.ok) {
      const errorMessage = JSON.parse(response.response);
      throw new Error(errorMessage.reason);
    }

    return "ok";
  }
}

export const authAPIInstance = new AuthAPI();
