interface NodeMeta<T> {
  depth: number;
  children: Set<T>;
  parent: T | null;
}

export class Tree<T = any> {
  private rootData: T;
  private nodeMetaMap: Map<T, NodeMeta<T>>;
  constructor(rootData: T) {
    this.rootData = rootData;
    this.nodeMetaMap = new Map();
    this.nodeMetaMap.set(rootData, this.initNode({}));
  }
  private initNode({
    depth = 0,
    parent = null,
  }: {
    depth?: number;
    parent?: null | T;
  }): NodeMeta<T> {
    return { depth, parent, children: new Set<T>() };
  }
  addChild(current: T, child: T) {
    if (!this.nodeMetaMap.has(current)) {
      throw new Error(`There is no node:${current} to add child to.`);
    }
    if (this.nodeMetaMap.has(child)) {
      throw new Error(`The child:${child} already exists.`);
    }
    this.nodeMetaMap.get(current)?.children.add(child);
    this.nodeMetaMap.set(
      child,
      this.initNode({ depth: this.getDepth(current), parent: current })
    );
  }

  replace(prev: T, next: T) {
    if (!this.nodeMetaMap.has(prev)) {
      throw new Error(`There is no prev node:${prev} to replace.`);
    }
    if (this.nodeMetaMap.has(next)) {
      throw new Error(`The next node:${next} already exists.`);
    }
    const meta = this.nodeMetaMap.get(prev) as NodeMeta<T>;
    const parent = this.nodeMetaMap.get(prev)?.parent as T;
    if (this.isRoot(prev)) {
      this.rootData = next;
    } else {
      const parentMeta = this.nodeMetaMap.get(parent) as NodeMeta<T>;
      parentMeta.children.delete(prev);
      parentMeta.children.add(next);
    }
    this.nodeMetaMap.set(next, { ...meta });
    for (const child of meta.children) {
      const childMeta = this.nodeMetaMap.get(child) as NodeMeta<T>;
      childMeta.parent = next;
    }
    this.nodeMetaMap.delete(prev);
  }
  delete(data: T) {
    if (data === this.rootData) {
      throw new Error(`You cant't delete root node with this method.`);
    }
    const parent = this.nodeMetaMap.get(data)?.parent;
    if (parent) {
      this.nodeMetaMap.get(parent)?.children?.delete(data);
    }
    const nodes = this.search(data);
    for (const node of nodes) {
      this.nodeMetaMap.delete(node);
    }
  }
  search(start: T = this.rootData) {
    const nodes = new Set<T>();
    nodes.add(start);
    const stack: T[] = [start];
    while (stack.length > 0) {
      const node = stack.pop() as T;
      const nodeMeta = this.nodeMetaMap.get(node);
      if (nodeMeta === undefined) {
        throw new Error(`There is no node:${node} in tree.`);
      }
      for (const n of nodeMeta.children) {
        stack.push(n);
        nodes.add(n);
      }
    }
    return nodes;
  }
  has(data: T) {
    return this.nodeMetaMap.has(data);
  }
  isRoot(data: T) {
    return data === this.rootData;
  }
  getRoot() {
    return this.rootData;
  }
  getDepth(data: T) {
    return this.nodeMetaMap.get(data)?.depth;
  }
  getParent(data: T) {
    return this.nodeMetaMap.get(data)?.parent;
  }
  getChildren(data: T) {
    return this.nodeMetaMap.get(data)?.children;
  }
}
