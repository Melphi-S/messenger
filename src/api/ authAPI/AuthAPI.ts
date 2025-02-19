import { HTTPTransport } from "../../core/HTTPTransport.ts";
import { SignInDTO, SignUpDTO } from "./auth.model.ts";
import { UserResponse } from "../models/user.model.ts";

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
    return authHTTPTransport.post("/signup", { data });
  }

  async signin(data: SignInDTO): Promise<string> {
    return authHTTPTransport.post("/signin", {
      data,
      headers: { "Content-Type": "application/json" },
    });
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
}

export const authAPIInstance = new AuthAPI();
