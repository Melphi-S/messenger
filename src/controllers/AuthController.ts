import { authAPIInstance, SignUpDTO } from "../api/ authAPI";
import { store } from "../store/Store.ts";
import { mapResponseToUser } from "../api/models/user.model.ts";

class AuthController {
  async signup(data: SignUpDTO) {
    return authAPIInstance.signup(data);
  }

  async signin(data: SignUpDTO) {
    return authAPIInstance.signin(data);
  }

  async getCurrentUser() {
    try {
      const userResponse = await authAPIInstance.getCurrentUser();
      store.set("currentUser", mapResponseToUser(userResponse));
    } catch (err) {
      throw err;
    }
  }
}

export const authController = new AuthController();
