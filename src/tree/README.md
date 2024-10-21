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

- Construct with the root data.
- In this example, root is `1`.

```typescript
const tree = new Tree<number>(1);
```

#### add child

- Add the new node at child position of current node.
- Current node should exist in tree. If not exist, it throw the error.
- Child node should not exist in tree. If exist, it throw the error.


```typescript
tree.addChild(current, child);
```

#### search

- Get nodes in subtree.
- Result's type is `Set<T>`, not `T[]`.

```typescript
const subTreeNodes = tree.search(start);
```

#### delete

- Delete itself and all nodes in its subtree.
- So, It should not delete root.

```typescript
tree.delete(node);
```

#### replace

- A new node replaces the prev node and the structure of tree is maintained.
- Prev node should exist in tree. If not exist, it throw the error.
- New node should not exist in tree. If exist, it throw the error.


```typescript
tree.replace(prev, next);
```

#### root

- Use `getRoot` to get the root data.
- Use `isRoot` to know whether the data is root.

```typescript
const tree = new Tree<number>(1);
console.log(tree.getRoot()); // 1
console.log(tree.isRoot(2)); // false
```

#### has

- Check if a value exists.

```typescript
const tree = new Tree<number>(1);
console.log(tree.has(1)); // true
console.log(tree.has(2)); // false
```

#### get parent

- Get parent of node.
- If node is root, this returns `null`.
- After `destroy()` or node not exists, it returns `undefined`.

```typescript
const tree = new Tree<number>(1);
tree.addChild(1, 2);
console.log(tree.getParent(1)); // null
console.log(tree.getParent(2)); // 1
```

#### get children

- Get direct children of the node.
- If node not exists, it returns `undefined`

```typescript
tree.getChildren(node);
```

#### get depth

- Get depth of the node.
- Root's depth is `0`.
- If node not exists, it returns `undefined`

```typescript
tree.getDepth(node);
```

#### get all nodes

- Get all nodes in the tree.
- It's return type is `T[]`, not `Set<T>`.

```typescript
tree.getAllNodes();
```

#### destroy

- If you want to clear memory, call this.
- After call this, this tree is no longer available.

```typescript
tree.destroy();
```
