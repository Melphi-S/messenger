import { Route } from "./Route.ts";
import { Block } from "./Block.ts";

export class Router {
  private static instance: Router;
  private routes: Route[] = [];
  private history: History = window.history;
  private readonly rootId: string = "";

  constructor(rootId: string) {
    if (Router.instance) {
      return Router.instance;
    }

    this.routes = [];
    this.history = window.history;
    this.rootId = rootId;

    Router.instance = this;
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this.rootId });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      target.location && this.onRoute(target.location.pathname);
    }).bind(this);

    this.onRoute(window.location.pathname);
  }

  private onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this.onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
