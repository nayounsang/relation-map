import { Tree } from "./tree";

describe("Tree", () => {
  let tree: Tree<number>;

  beforeEach(() => {
    tree = new Tree<number>(1);
  });

  it("should add children", () => {
    const children = [2, 3];

    children.forEach((child) => {
      tree.addChild(tree.getRoot(), child);
    });

    children.forEach((child) => {
      expect(tree.getChildren(1)?.has(child)).toBe(true);
      expect(tree.getParent(child)).toBe(1);
      expect(tree.getDepth(child)).toBe(1);
    });
  });

  it("should not add exist prev", () => {
    tree.addChild(tree.getRoot(), 2);

    expect(() => tree.addChild(1, 1)).toThrow("The child:1 already exists.");
    expect(() => tree.addChild(1, 2)).toThrow("The child:2 already exists.");
  });

  it("should not add non-exist cur", () => {
    expect(() => tree.addChild(2, 3)).toThrow(
      "There is no node:2 to add child to."
    );
  });

  it("should replace the root", () => {
    tree.replace(tree.getRoot(), 2);

    expect(tree.getRoot()).toBe(2);
  });

  it("should replace exist node and renew relationship", () => {
    const node = 2;
    const children = [3, 4];
    const newNode = 5;

    tree.addChild(tree.getRoot(), node);
    children.forEach((child) => {
      tree.addChild(node, child);
    });
    tree.replace(node, newNode);

    expect(tree.getChildren(tree.getRoot())?.has(node)).toBe(false);
    expect(tree.getChildren(tree.getRoot())?.has(newNode)).toBe(true);
    expect(tree.getParent(newNode)).toBe(tree.getRoot());
    children.forEach((child) => {
      expect(tree.getChildren(newNode)?.has(child)).toBe(true);
      expect(tree.getParent(child)).toBe(newNode);
    });
  });

  it("should not replace exist next", () => {
    tree.addChild(tree.getRoot(), 2);

    expect(() => tree.replace(2, 2)).toThrow("The next node:2 already exists.");
  });

  it("should not replace non-exist prev", () => {
    expect(() => tree.replace(3, 3)).toThrow(
      "There is no prev node:3 to replace."
    );
  });

  it("should search all nodes in sub-tree", () => {
    const start = 2;
    const children = [4, 5, 6, 7, 8];
    const deepChildren = [9, 10, 11];

    tree.addChild(tree.getRoot(), start);
    tree.addChild(tree.getRoot(), 3);
    children.forEach((child) => {
      tree.addChild(start, child);
    });
    deepChildren.forEach((child) => {
      tree.addChild(children[0], child);
    });

    const result = tree.search(start);
    const expectedNodes = [start, ...children, ...deepChildren];
    expectedNodes.forEach((node) => {
      expect(result.has(node)).toBe(true);
    });
    expect(result.has(3)).toBe(false);
  });

  it("should not search node that doesn't exist.", () => {
    const start = 2;
    const children = [4, 5, 6, 7, 8];

    tree.addChild(tree.getRoot(), start);
    tree.addChild(tree.getRoot(), 3);
    children.forEach((child) => {
      tree.addChild(start, child);
    });

    expect(() => tree.search(100)).toThrow("There is no node:100 in tree.");
  });

  it("should delete all nodes in sub-tree", () => {
    const start = 2;
    const children = [4, 5, 6, 7, 8];
    const deepChildren = [9, 10, 11];

    tree.addChild(tree.getRoot(), start);
    children.forEach((child) => {
      tree.addChild(start, child);
    });
    deepChildren.forEach((child) => {
      tree.addChild(children[0], child);
    });
    tree.delete(start);

    const expectedNodes = [start, ...children, ...deepChildren];
    expectedNodes.forEach((node) => {
      expect(tree.has(node)).toBe(false);
    });
    expect(tree.getChildren(tree.getRoot())?.has(start)).toBe(false);
  });

  it("should not delete the root", () => {
    expect(() => tree.delete(tree.getRoot())).toThrow(
      "You cant't delete root node with this method. If you want to clear memory, use destroy()"
    );
  });
});
