import { EventBus } from "./EventBus.ts";
import Handlebars from "handlebars";
import cloneDeep from "../utils/cloneDeep.ts";
import isEqual from "../utils/isEqual.ts";

export interface BlockProps {
  [key: string]: unknown;
}

export class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  } as const;

  protected element: HTMLElement | null = null;
  private readonly props: Record<string, unknown>;
  protected children: Record<string, Block>;
  protected lists: Record<string, Block[]>;
  protected eventBus: () => EventBus;
  public id: number = Math.floor(100000 + Math.random() * 900000);
  private shouldUpdate: boolean = false;
  private isMounted: boolean = false;

  constructor(propsAndChildren: BlockProps = {}) {
    const eventBus = new EventBus();

    const { props, children, lists } =
      this.getChildrenAndProps(propsAndChildren);

    this.props = this.makePropsProxy({ ...props, id: this.id });
    this.children = this.makePropsProxy(children);
    this.lists = this.makePropsProxy(lists);

    this.eventBus = () => eventBus;

    this.registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(
      Block.EVENTS.FLOW_CDU,
      this.privateComponentDidUpdate.bind(this),
    );
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  public addEvents(): void {
    const { events } = this.props;

    if (!events || !this.element) {
      return;
    }

    Object.entries(events).forEach(([eventName, handler]) => {
      if (this.element) {
        this.element.addEventListener(eventName, handler);
      }
    });
  }

  private createResources() {
    this.element = this.createDocumentElement("div");
  }

  init() {
    this.createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {
    return true;
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private privateComponentDidUpdate() {
    const response = this.componentDidUpdate();
    if (!response) {
      return;
    }

    this._render();
  }

  componentDidUpdate() {
    return true;
  }

  protected _render() {
    const propsAndStubs = { ...this.props };
    const tmpId = Math.floor(100000 + Math.random() * 900000);
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="__l_${tmpId}"></div>`;
    });

    const fragment = this.createDocumentElement("template");
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
      if (stub) {
        // child.changeProps(this.props);
        stub.replaceWith(child.getContent());
      }
    });

    Object.entries(this.lists).forEach(([, child]) => {
      const listCont = this.createDocumentElement("template");

      if (!Array.isArray(child)) {
        return;
      }

      child.forEach((item) => {
        listCont.content.append(item.getContent());
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${tmpId}"]`);
      if (stub) {
        stub.replaceWith(listCont.content);
      }
    });

    const newElement = fragment.content.firstElementChild as HTMLElement;
    if (this.element && newElement) {
      this.element.replaceWith(newElement);
    }
    this.element = newElement;
    this.addEvents();
    if (!this.isMounted) {
      this.isMounted = true;
      this.dispatchComponentDidMount();
    }
  }

  protected render() {}

  public getContent() {
    if (!this.element) {
      throw new Error("Element is not created");
    }

    return this.element;
  }

  public getProps(): BlockProps {
    return this.props;
  }

  public getChildren() {
    return this.children;
  }

  private getChildrenAndProps(propsAndChildren: BlockProps): {
    children: Record<string, Block>;
    props: BlockProps;
    lists: Record<string, Block[]>;
  } {
    const children: Record<string, Block> = {};
    const props: BlockProps = {};
    const lists: Record<string, Block[]> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  public changeProps(newProps: BlockProps) {
    const oldProps = cloneDeep(this.props);

    if (isEqual(oldProps, newProps)) {
      return;
    }

    Object.assign(this.props, newProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
  }

  public changeChildren(newChildren: Record<string, Block>) {
    this.shouldUpdate = false;
    const oldChildren = { ...this.children };

    Object.assign(this.children, newChildren);

    if (this.shouldUpdate) {
      this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldChildren, this.children);
    }
  }

  public changeLists(
    newLists: Record<string, Block[]>,
    shouldUpdate: boolean = true,
  ) {
    Object.entries(newLists).forEach(([key, value]) => {
      if (!isEqual(this.lists[key], value)) {
        this.lists[key] = value;
      }
    });

    if (shouldUpdate) {
      this.privateComponentDidUpdate();
    }
  }

  private makePropsProxy<T extends Record<string, unknown>>(props: T): T {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as keyof T];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        target[prop as keyof T] = value;
        this.shouldUpdate = true;

        return true;
      },
    });
  }

  private createDocumentElement(tagName: string) {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  public getElement() {
    return this.element;
  }

  public getLists() {
    return this.lists;
  }
}
