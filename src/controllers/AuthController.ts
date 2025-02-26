import { authAPIInstance, SignUpDTO } from "../api/authAPI";
import { store } from "../store/Store.ts";
import { mapResponseToUser } from "../api/userAPI";
import { SignInDTO } from "../api/authAPI/auth.model.ts";
import { router } from "../main.ts";
import { notificationManager } from "../components/NotificationManager";

class AuthController {
  async signup(data: SignUpDTO) {
    try {
      return await authAPIInstance.signup(data);
    } catch (err) {
      if (err instanceof Error) {
        notificationManager.notify(err.message, "error", 5000);
      } else {
        notificationManager.notify("Error during registration", "error", 5000);
      }
    }
  }

  async signin(data: SignInDTO) {
    try {
      return await authAPIInstance.signin(data);
    } catch (err) {
      if (err instanceof Error) {
        notificationManager.notify(err.message, "error", 5000);
      } else {
        notificationManager.notify("Error during authorization", "error", 5000);
      }
    }
  }

  async getCurrentUser() {
    try {
      const userResponse = await authAPIInstance.getCurrentUser();
      store.set("currentUser", mapResponseToUser(userResponse));
      router.setAuth(true);
      return true;
    } catch (err) {
      if (err instanceof Error) {
        if (err.message !== "Cookie is not valid") {
          notificationManager.notify(err.message, "error", 5000);
        }
      } else {
        notificationManager.notify(
          "Error during fetching user data",
          "error",
          5000,
        );
      }
    }
  }

  async logout() {
    try {
      return authAPIInstance.logout();
    } catch (err) {
      if (err instanceof Error) {
        notificationManager.notify(err.message, "error", 5000);
      } else {
        notificationManager.notify("Error during logout", "error", 5000);
      }
    }
  }
}

export const authController = new AuthController();
