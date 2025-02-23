import { authAPIInstance, SignUpDTO } from "../api/authAPI";
import { store } from "../store/Store.ts";
import { mapResponseToUser } from "../api/userAPI/user.model.ts";
import { SignInDTO } from "../api/authAPI/auth.model.ts";

class AuthController {
  async signup(data: SignUpDTO) {
    try {
      return await authAPIInstance.signup(data);
    } catch (err) {
      console.log(err);
    }
  }

  async signin(data: SignInDTO) {
    try {
      return await authAPIInstance.signin(data);
    } catch (err) {
      console.log(err);
    }
  }

  async getCurrentUser() {
    try {
      const userResponse = await authAPIInstance.getCurrentUser();
      store.set("currentUser", mapResponseToUser(userResponse));
    } catch (err) {
      throw err;
    }
  }

  async logout() {
    try {
      return authAPIInstance.logout();
    } catch (err) {
      console.log(err);
    }
  }
}

export const authController = new AuthController();
