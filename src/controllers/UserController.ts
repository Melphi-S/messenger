import {
  ChangePasswordDTO,
  ChangeProfileDTO,
  mapResponseToUser,
} from "../api/userAPI/user.model.ts";
import { store } from "../store/Store.ts";
import { userAPIInstance } from "../api/userAPI/UserAPI.ts";

class UserController {
  async changeProfileData(data: ChangeProfileDTO) {
    try {
      const userResponse = await userAPIInstance.changeProfileData(data);
      store.set("currentUser", mapResponseToUser(userResponse));
    } catch (err) {
      console.log(err);
    }
  }

  async changeProfileAvatar(file: File) {
    try {
      const data = new FormData();
      data.append("avatar", file);
      const userResponse = await userAPIInstance.changeAvatar(data);

      store.set("currentUser", mapResponseToUser(userResponse));
    } catch (err) {
      console.log(err);
    }
  }

  async changePassword(data: ChangePasswordDTO) {
    try {
      await userAPIInstance.changePassword(data);
      return "ok";
    } catch (err) {
      console.log(err);
    }
  }
}

export const userController = new UserController();
