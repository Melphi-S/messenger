import { Block, BlockProps } from "./Block.ts";
import { Router } from "./Router.ts";
import { expect } from "chai";
import sinon from "sinon";

interface Props extends BlockProps {
  testText: string;
}

class TestBlock extends Block {
  constructor({ testText }: Props) {
    super({
      testText,
    });
  }

  protected render() {
    super.render();

    // language=hbs
    return `
      <div>
        <span id="text">{{{ testText }}}</span>
      </div>
    `;
  }
}

describe("Router", () => {
  let router: Router;
  let clock: sinon.SinonFakeTimers;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
    router = new Router("#app");
    router
      .use("/login", TestBlock, false)
      .use("/chats", TestBlock, true)
      .use("/first", TestBlock, true)
      .use("/second", TestBlock, true)
      .use("/not-found", TestBlock, true)
      .start();
    router.setAuth(true);
  });

  afterEach(() => {
    clock.restore();
  });

  it("should go to path", () => {
    router.go("/first");
    expect(window.location.pathname).to.equal("/first");
  });

  it("should go back", () => {
    router.go("/first");
    router.go("/second");
    router.back();

    clock.tick(10);

    expect(window.location.pathname).to.equal("/first");
  });

  it("should go forward", () => {
    router.go("/first");
    router.go("/second");
    router.back();

    clock.tick(10);

    router.forward();

    clock.tick(10);

    expect(window.location.pathname).to.equal("/second");
  });

  it("should redirect unregistered path to not-found page", () => {
    router.go("/unregistered");
    expect(window.location.pathname).to.equal("/not-found");
  });

  it("should redirect authorized user to chats page when trying to open some login page", () => {
    router.go("/login");
    expect(window.location.pathname).to.equal("/chats");
  });

  it("should redirect unauthorized user to login page when trying to open private page", () => {
    router.setAuth(false);
    router.go("/chats");
    expect(window.location.pathname).to.equal("/login");
  });
});
