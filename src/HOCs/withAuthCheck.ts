import { Block } from "../core/Block.ts";
import { authController } from "../controllers/AuthController.ts";
import { router } from "../main.ts";
import { connectWithStore } from "../store/Store.ts";

export const withAuthCheck = (
  Component: typeof Block,
  view: "public" | "private",
) => {
  class WithAuth extends Component {
    componentDidMount() {
      authController
        .getCurrentUser()
        .then(() => {
          if (view === "public") {
            router.go("/chats");
          }
        })
        .catch(() => {
          if (view === "private") {
            router.go("/login");
          }
        });

      super.componentDidMount();
      return true;
    }

    protected render() {
      if (!this.getProps().currentUser && view === "private") {
        return `<div>LOADER</div>`;
      }

      return super.render();
    }
  }

  return connectWithStore(WithAuth, (store) => ({
    currentUser: store.currentUser,
  }));
};
