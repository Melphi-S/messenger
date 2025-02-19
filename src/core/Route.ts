import { Block, BlockProps } from "./Block.ts";

export class Route {
  private readonly pathname: string;
  private readonly blockClass: typeof Block;
  private block: Block | null;
  private props: BlockProps;

  constructor(pathname: string, view: typeof Block, props: BlockProps) {
    this.pathname = pathname;
    this.blockClass = view;
    this.block = null;
    this.props = props;
  }

  match(pathname: string) {
    return pathname === this.pathname;
  }

  private insertIntoDOM(rootQuery: string, block: Block) {
    const root = document.getElementById(rootQuery);
    if (root) {
      root.innerHTML = "";
      root.append(block.getContent());
      block.dispatchComponentDidMount();
    }
  }

  render() {
    if (!this.block) {
      this.block = new this.blockClass();
    }

    if (this.props.rootQuery && typeof this.props.rootQuery === "string") {
      this.insertIntoDOM(this.props.rootQuery, this.block);
    }
  }
}
