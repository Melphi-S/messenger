import { Block } from "../core/Block.ts";
import { authController } from "../controllers/AuthController.ts";
import { router } from "../main.ts";
import { connectWithStore, store } from "../store/Store.ts";

export const withAuthCheck = (
  Component: typeof Block,
  view: "public" | "private",
) => {
  class WithAuth extends Component {
    componentDidMount() {
      if (!store.get().currentUser) {
        const targetPath = router.getTargetPath();
        authController
          .getCurrentUser()
          .then((user) => {
            if (view === "public" && user) {
              router.go(targetPath || "/chats");
            } else if (view === "private" && !user) {
              router.go("/login");
            }
          })
          .catch(() => {
            if (view === "private") {
              router.go("/login");
            }
          })
          .finally(() => {
            store.set("isLoading", false);
          });
      }

      super.componentDidMount();
      return true;
    }

    protected render() {
      if (store.get().isLoading) {
        return `
          <div class="spinner"></div>
        `;
      }

      return super.render();
    }
  }

  return connectWithStore(WithAuth, (store) => ({
    currentUser: store.currentUser,
    isLoading: store.isLoading,
  }));
};
