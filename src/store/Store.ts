import { EventBus } from "../core/EventBus.ts";
import { set } from "../utils/set.ts";
import { AppStore } from "./store.model.ts";
import { Block, BlockProps } from "../core/Block.ts";

export enum StoreEvents {
  UPDATED = "updated",
}

const defaultState: AppStore = {
  currentUser: null,
};

class Store extends EventBus {
  private state: AppStore = defaultState;

  public get() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.UPDATED);
  }

  public destroy() {
    this.state = defaultState;
  }
}

export const store = new Store();

export const connectWithStore = (
  Component: typeof Block,
  mapStateToProps: (state: AppStore) => BlockProps,
) => {
  return class extends Component {
    constructor(props: BlockProps) {
      super({ ...props, ...mapStateToProps(store.get()) });

      store.on(StoreEvents.UPDATED, () => {
        this.changeProps({ ...mapStateToProps(store.get()) });
      });
    }
  };
};
