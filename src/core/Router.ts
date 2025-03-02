import { Route } from "./Route.ts";
import { Block } from "./Block.ts";

export class Router {
  private routes: { route: Route; auth: boolean }[] = [];
  private history: History = window.history;
  private readonly rootId: string = "";
  private auth = false;
  private targetPath: string = "";

  constructor(rootId: string) {
    this.routes = [];
    this.history = window.history;
    this.rootId = rootId;
  }

  public use(pathname: string, block: typeof Block, auth: boolean) {
    const route = new Route(pathname, block, { rootQuery: this.rootId });
    this.routes.push({ route, auth });
    return this;
  }

  public setAuth(auth: boolean) {
    this.auth = auth;
  }

  public start() {
    window.onpopstate = ((event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      target.location && this.onRoute(target.location.pathname);
    }).bind(this);

    this.targetPath = window.location.pathname;
    this.onRoute(window.location.pathname);
  }

  public getTargetPath() {
    return this.targetPath;
  }

  private async onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      this.go("/not-found");
      return;
    }

    if (route.auth && !this.auth) {
      this.go("/login");
    } else if (!route.auth && this.auth) {
      this.go("/chats");
    } else {
      route.route.render();
    }
  }

  public go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this.onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.route.match(pathname));
  }
}
