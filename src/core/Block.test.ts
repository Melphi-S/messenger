import { Block, BlockProps } from "./Block.ts";
import { expect } from "chai";
import sinon from "sinon";

interface Props extends BlockProps {
  testText?: string;
  testChild?: TestBlock;
  testList?: TestBlock[];
  events?: {
    click: () => void;
  };
}

class TestBlock extends Block {
  constructor({ testText, testChild, testList, events }: Props) {
    super({
      testText,
      testChild,
      testList,
      events,
    });
  }

  protected render() {
    super.render();

    // language=hbs
    return `
      <div>
        <span id="text">{{{ testText }}}</span>
        {{{ testChild }}}
        {{{ testList }}}
      </div>
    `;
  }
}

describe("Block", () => {
  let testBlock: TestBlock;
  const testText = "Test text";
  const childText = "Child text";
  const firstItemText = "First item text";
  const secondItemText = "Second item text";

  beforeEach(() => {
    testBlock = new TestBlock({
      testText: "Test text",
      testChild: new TestBlock({ testText: childText }),
      testList: [
        new TestBlock({ testText: firstItemText }),
        new TestBlock({ testText: secondItemText }),
      ],
    });
  });

  it("should render correct tag", () => {
    const element = testBlock.getElement();
    expect(element?.tagName).to.equal("DIV");
  });

  it("should render component with right props", () => {
    const element = testBlock.getElement();
    expect(element?.querySelector("#text")?.textContent).to.contain(testText);
  });

  it("should re-render component after props changing", () => {
    const changedTestText = "Changed test text";
    testBlock.changeProps({ testText: changedTestText });
    const element = testBlock.getElement();
    expect(element?.querySelector("#text")?.textContent).to.contain(
      changedTestText,
    );
  });

  it("should not re-render component if props remain equal", () => {
    const currentProps = testBlock.getProps();
    const renderSpy = sinon.spy(testBlock, "render" as keyof TestBlock);
    testBlock.changeProps({ ...currentProps });
    expect(renderSpy.called).to.be.false;
  });

  it("should render component with child block", () => {
    const element = testBlock.getElement();
    const childBlock = element?.querySelectorAll("div")[0];
    expect(childBlock?.textContent).to.contain(childText);
  });

  it("should re-render component after child changing", () => {
    const newChildText = "New child text";
    const newChild = new TestBlock({ testText: newChildText });
    testBlock.changeChildren({ testChild: newChild });
    const childBlock = testBlock.getElement()?.querySelectorAll("div")[0];
    expect(childBlock?.textContent).to.contain(newChildText);
  });

  it("should render component with list of blocks", () => {
    const childBlocks = testBlock.getElement()?.querySelectorAll("div");
    const firstListItem = childBlocks?.[1];
    const secondListItem = childBlocks?.[2];
    expect(firstListItem?.textContent).to.contain(firstItemText);
    expect(secondListItem?.textContent).to.contain(secondItemText);
  });

  it("should re-render component after list of blocks changing", () => {
    const oldList = testBlock.getLists().testList;
    const thirdItemText = "Third item text";
    const thirdItem = new TestBlock({ testText: thirdItemText });
    testBlock.changeLists({ testList: [...oldList, thirdItem] });
    const thirdListItem = testBlock.getElement()?.querySelectorAll("div")[3];
    expect(thirdListItem?.textContent).to.contain(thirdItemText);
  });

  it("should attach event listener", () => {
    const clickHandlerSpy = sinon.spy();
    const testBlock = new TestBlock({
      testText: testText,
      events: { click: clickHandlerSpy },
    });

    const element = testBlock.getElement();

    const clickEvent = new MouseEvent("click");
    element?.dispatchEvent(clickEvent);

    expect(clickHandlerSpy.called).to.be.true;
  });
});
