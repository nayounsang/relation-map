<!-- TOC -->
**Table of contents**
  - [Tree](#tree)
    - [Term Explanation](#term-explanation)
    - [Usage](#usage)
<!-- TOC -->

## Tree

- A tree data structure is a hierarchical model where nodes are connected by edges, starting with a root node and branching into child nodes.
- Each node can have zero or more children, and nodes without children are called leaf nodes.
- Trees are used to represent hierarchical data, like file systems or organizational charts, and support efficient search and traversal.

### Term Explanation

![image](https://github.com/user-attachments/assets/ece611e9-935a-4eed-82bd-8520e37b0c13)

- Structure the data of the `Tree` with `Node`.
- `Parent` exists above a `Node`. The depth is 1 less.
- Nodes directly connected to a node are `children`.
- The `Tree` starts from the `Root`. The `Root`depth of this library is `0`.
- A `Subtree` contains a `Node` itself and `all nodes` below that node.

### Usage

#### create instance

```typescript
const tree = new Tree<number>(1);
```

- Construct with the root data.
- In this example, root is `1`.

#### add child

```typescript
tree.addChild(current, child);
```

- Add the new node at child position of current node.
- Current node should exist in tree. If not exist, it throw the error.
- Child node should not exist in tree. If exist, it throw the error.

#### search

```typescript
const subTreeNodes = tree.search(start);
```

- Get nodes in subtree.
- Result's type is `Set<T>`, not `T[]`.

#### delete

```typescript
tree.delete(node);
```

- Delete itself and all nodes in its subtree.
- So, It should not delete root.

#### replace

```typescript
tree.replace(prev, next);
```

- A new node replaces the prev node and the structure of tree is maintained.
- Prev node should exist in tree. If not exist, it throw the error.
- New node should not exist in tree. If exist, it throw the error.

#### root

```typescript
const tree = new Tree<number>(1);
console.log(tree.getRoot()); // 1
console.log(tree.isRoot(2)); // false
```

- Use `getRoot` to get root data.
- Use `isRoot` to know whether the data is root.

#### has

```typescript
const tree = new Tree<number>(1);
console.log(tree.has(1)); // true
console.log(tree.has(2)); // false
```

- Check if a value exists.

#### get parent

```typescript
const tree = new Tree<number>(1);
tree.addChild(1, 2);
console.log(tree.getParent(1)); // null
console.log(tree.getParent(2)); // 1
```

- Get parent of node.
- If node is root, this returns `null`.
- After `destroy()` or node not exists, it returns `undefined`.

#### get children

```typescript
tree.getChildren(node);
```

- Get direct children of the node.
- If node not exists, it returns `undefined`

#### get depth

```typescript
tree.getDepth(node);
```

- Get depth of the node.
- Root's depth is `0`.
- If node not exists, it returns `undefined`

#### get all nodes

```typescript
tree.getAllNodes();
```

- Get all nodes in the tree.
- It's return type is `T[]`, not `Set<T>`.

#### destroy

```typescript
tree.destroy();
```

- If you want to clear memory, call this.
- After call this, this tree is no longer available.
