import { Tree } from "./tree";

describe("Tree", () => {
  let tree: Tree<number>;

  beforeEach(() => {
    tree = new Tree<number>(1);
  });
  it("should add children", () => {
    tree.addChild(tree.getRoot(), 2);
    tree.addChild(tree.getRoot(), 3);
    expect(tree.getChildren(1)?.has(2)).toBe(true);
    expect(tree.getParent(2)).toBe(1);
    expect(tree.getDepth(2)).toBe(1);
    expect(tree.getChildren(1)?.has(3)).toBe(true);
    expect(tree.getParent(3)).toBe(1);
    expect(tree.getDepth(3)).toBe(1);
  });

});
