import {
  ChangePasswordDTO,
  ChangeProfileDTO,
  mapResponseToUser,
} from "../api/userAPI/user.model.ts";
import { store } from "../store/Store.ts";
import { userAPIInstance } from "../api/userAPI";
import { notificationManager } from "../components/NotificationManager";

class UserController {
  async changeProfileData(data: ChangeProfileDTO) {
    try {
      const userResponse = await userAPIInstance.changeProfileData(data);
      store.set("currentUser", mapResponseToUser(userResponse));
      notificationManager.notify(
        "User data has been successfully changed",
        "success",
        3000,
      );
    } catch (err) {
      if (err instanceof Error) {
        notificationManager.notify(err.message, "error", 5000);
      } else {
        notificationManager.notify(
          "Error during changing user data",
          "error",
          5000,
        );
      }
    }
  }

  async changeProfileAvatar(file: File) {
    try {
      const data = new FormData();
      data.append("avatar", file);
      const userResponse = await userAPIInstance.changeAvatar(data);

      store.set("currentUser", mapResponseToUser(userResponse));

      notificationManager.notify(
        "User avatar has been successfully changed",
        "success",
        3000,
      );
    } catch (err) {
      if (err instanceof Error) {
        notificationManager.notify(err.message, "error", 5000);
      } else {
        notificationManager.notify(
          "Error during changing user avatar",
          "error",
          5000,
        );
      }
    }
  }

  async changePassword(data: ChangePasswordDTO) {
    try {
      await userAPIInstance.changePassword(data);

      notificationManager.notify(
        "Password has been successfully changed",
        "success",
        3000,
      );

      return "ok";
    } catch (err) {
      if (err instanceof Error) {
        notificationManager.notify(err.message, "error", 5000);
      } else {
        notificationManager.notify(
          "Error during changing password",
          "error",
          5000,
        );
      }
    }
  }

  async getUserByLogin(login: string) {
    try {
      const userResponse = await userAPIInstance.getUserByLogin(login);

      if (!userResponse.length) {
        throw new Error("No user found");
      }

      return mapResponseToUser(userResponse[0]);
    } catch (err) {
      if (err instanceof Error) {
        notificationManager.notify(err.message, "error", 5000);
      } else {
        notificationManager.notify("Error during getting user", "error", 5000);
      }
    }
  }
}

export const userController = new UserController();
