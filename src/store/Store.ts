import { EventBus } from "../core/EventBus.ts";
import { set } from "../utils/set.ts";
import { AppStore } from "./store.model.ts";
import { Block, BlockProps } from "../core/Block.ts";
import isEqual from "../utils/isEqual.ts";
import cloneDeep from "../utils/cloneDeep.ts";

export enum StoreEvents {
  UPDATED = "updated",
}

const defaultState: AppStore = {
  currentUser: null,
  currentChatMessages: [],
  chatList: null,
  chatsUsers: [],
};

class Store extends EventBus {
  private state: AppStore = cloneDeep(defaultState);

  public get() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    const oldState = cloneDeep(this.state);

    set(this.state, path, value);

    this.emit(StoreEvents.UPDATED, oldState);
  }

  public clear(path: string, value: unknown) {
    this.state[path] = value;
  }

  public clearStore() {
    this.state = cloneDeep(defaultState);
    console.log(this.state);
  }
}

export const store = new Store();

export const connectWithStore = (
  Component: typeof Block,
  mapStateToProps: (state: AppStore) => BlockProps,
) => {
  return class extends Component {
    constructor(props: BlockProps) {
      let state = JSON.parse(JSON.stringify(store.get()));
      super({ ...props, ...state });

      store.on(StoreEvents.UPDATED, (state) => {
        const newState = mapStateToProps(store.get());
        const oldState = mapStateToProps(state as AppStore);

        if (!isEqual(oldState, newState)) {
          this.changeProps({ ...newState });
        }
      });
    }
  };
};
