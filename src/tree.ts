interface NodeMeta<T> {
  depth: number;
  children: Set<T>;
  parent: T | null;
}

export class Tree<T=any> {
  private rootMeta: NodeMeta<T>;
  
  private rootData: T;
  private dataSet: Set<T>;
  private nodeMetaMap: Map<T, NodeMeta<T>>;

  private initNode({
    depth = 0,
    parent = null,
  }: {
    depth?: number;
    parent?: null | T;
  }): NodeMeta<T> {
    return { depth, parent, children: new Set<T>() };
  }
  constructor(rootData: T) {
    this.rootMeta = this.initNode({});
    this.rootData = rootData;
    this.nodeMetaMap = new Map();
    this.dataSet = new Set();
    this.dataSet.add(rootData);
    this.nodeMetaMap.set(rootData, this.rootMeta);
  }

}
