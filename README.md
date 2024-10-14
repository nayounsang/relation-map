<!-- TOC -->
**Table of contents**
- [Relation map](#relation-map)
  - [Install](#install)
  - [Link](#link)
- [Problem and Solve](#problem-and-solve)
  - [Performance due to time complexity](#performance-due-to-time-complexity)
  - [Boilerplate to maintain relationship](#boilerplate-to-maintain-relationship)
- [Feedback \& Contributions](#feedback--contributions)
- [Features](#features)
  - [BiMap](#bimap)
    - [Term Explanation](#term-explanation)
    - [Usage](#usage)
      - [create instance](#create-instance)
      - [set](#set)
      - [delete](#delete)
      - [get](#get)
      - [has](#has)
      - [clear](#clear)
      - [size](#size)
      - [get member variables](#get-member-variables)
  - [OneToManyMap](#onetomanymap)
    - [Term Explanation](#term-explanation-1)
    - [Usage](#usage-1)
      - [create instance](#create-instance-1)
      - [set](#set-1)
      - [delete](#delete-1)
      - [get](#get-1)
      - [has](#has-1)
      - [clear](#clear-1)
      - [size](#size-1)
      - [get member variables](#get-member-variables-1)
      - [count](#count)
  - [Tree](#tree)
    - [Term Explanation](#term-explanation-2)
    - [Usage](#usage-2)
      - [create instance](#create-instance-2)
      - [add child](#add-child)
      - [search](#search)
      - [delete](#delete-2)
      - [replace](#replace)
      - [root](#root)
      - [has](#has-2)
      - [get parent](#get-parent)
      - [get children](#get-children)
      - [get depth](#get-depth)
      - [get all nodes](#get-all-nodes)
      - [destroy](#destroy)
<!-- TOC -->

# Relation map

> A flexible relational mapping library supporting 1:1 and 1:N

## Install

```bash
npm i relation-map
```

```bash
yarn add relation-map
```

## Link

[npm](https://www.npmjs.com/package/relation-map)

[github](https://github.com/nayounsang/relation-map)

# Problem and Solve

## Performance due to time complexity

run from [codeSandbox](https://codesandbox.io/p/devbox/stcfgs)

- When we search a value from typical (unidirectional) map, its time complexity is O(N).
- This is because an exhaustive search is required to access and manipulate values ​​rather than keys.
- But BiMap is O(1). Moreover, updating, deleting and adding are also of the same complexity.

```javascript
import { BiMap } from "relation-map";

const biMap = new BiMap();
const map = new Map();
const N = 12345;
for (let i = 0; i < N; i++) {
  map.set(String(i), i);
  biMap.set(String(i), i);
}
const mapTime = { total: 0, average: 0 };
const biMapTime = { total: 0, average: 0 };

const start1 = performance.now();
for (let i = 0; i < N; i++) {
  // To find value, A complete search is required.
  for (const v of map.values()) {
    // If find, stop
    if (v === i) break;
  }
}
const end1 = performance.now();
mapTime.total = end1 - start1;
mapTime.average = (end1 - start1) / N;

const start2 = performance.now();
for (let i = 0; i < N; i++) {
  // Find with O(1) complexity.
  biMap.getByRight(i);
}
const end2 = performance.now();

// Log in ms
biMapTime.total = end2 - start2;
biMapTime.average = (end2 - start2) / N;
console.log({ mapTime });
console.log({ biMapTime });
```

- The difference in results is stark!

```bash
{
  mapTime: { total: 340.80774399999996, average: 0.027606945646010527 }
}

{
  biMapTime: { total: 1.2093150000000037, average: 0.000097959902794654 }
}
```

## Boilerplate to maintain relationship

- To solve time complexity, you can consider creating a reference data structure.
- However, each time you update, delete, or add data, the amount of code you will need to write will double.

```javascript
const map = new Map();

const map1 = new Map();
const map2 = new Map(); // for reference to solve time complexity of map1.
// Add data pair
for (let i = 0; i < 10000; i++) {
  map.set(String(i), i);

  map1.set(String(i), i);
  map2.set(i, String(i)); // Also, need to set it on map2.
}
// Update
map.set("10", 7);
map.delete("7"); // To maintain 1:1

map1.set("10", 7);
map2.set(7, "10");
// Also, need to maintain 1:1 on both.
map1.delete("7");
map2.delete(10);
```

- This is a simple example.
- However, in actual work, there is the following problem:
  - As the amount of code increases, the probability of bugs increases.
  - As the amount of code increases, stamina will be depleted.
  - As the amount of code increases, project structure will be dirty.
- **We can work more simply with a relation map!**

```javascript
const biMap = new BiMap();
// ...
biMap.set("10", 7); // End
```

# Feedback & Contributions

**We welcome all types of feedback and contributions! If you have any of the following, please feel free to open an [issue](https://github.com/nayounsang/relation-map/issues/new/choose)**

Your input is valuable to us and helps improve the project for everyone. Thank you for contributing!


# Features

## BiMap

- A one-to-one relationship between "left" and "right" is maintained when updating, adding and deleting.
- Quick modification and access to "left" and "right" are possible.
- Duplication is not allowed for the same "left" and "right".

### Term Explanation

_There is basically no priority between "left" and "right".
At the developer's discretion, they can be prioritized conceptually._

- left: This value is used as the `left` key in the BiMap. Each `left` can only be mapped to a single `right`. You can use the `left` to look up or delete the corresponding `right`.

- right: This value is used as the `right` key in the BiMap. Each `right` can only be mapped to a single `left`. You can use the `right` to look up or delete the corresponding `left`.

### Usage

#### create instance

- Set type of left and right with generic`<L, R>`.
- Default type is any.

```typescript
const myMap = new BiMap<string, number>();
```

#### set

- Add or update the pair.

```typescript
myMap.set("a", 10);
```

#### delete

- Delete the pair.

```typescript
myMap.set("a", 10);
myMap.set("b", 5);
myMap.deleteByLeft("a"); // delete "a" & 10
myMap.deleteByRight(5); // delete "b" & 5
```

#### get

- Gets the value in the opposite direction.

```typescript
myMap.set("a", 10);
myMap.getByLeft("a"); // 10
myMap.getByRight(10); // a
```

#### has

- Check if a value exists.

```typescript
const myMap = new BiMap<string, number>();
myMap.set("a", 10);
myMap.hasByLeft("a"); // true
myMap.hasByRight(20); // false
```

#### clear

- Clear all data.

```typescript
myMap.clear();
```

#### size

- One pair size.

```typescript
const myMap = new BiMap<string, number>();
myMap.set("a", 10);
myMap.set("b", 5);
myMap.size(); // 2
```

#### get member variables

- Get "readonly" member variables.
- **Modification may result in unexpected behavior.**

```typescript
myMap.getLeftToRight();
myMap.getRightToLeft();
```

## OneToManyMap

- A 1:N relationship between "one" and "many" is maintained when updating, adding and deleting.
- Quick modification and access to "one" and "many" are possible.
- Duplication is not allowed for the same "one" and "many".

### Term Explanation

- one: Represents a unique key in the OneToManyMap structure, which can be associated with multiple `many`. Each `one` can have several corresponding `many` values, but each `many` value can only belong to a single `one`. For example, in a teacher-student relationship, a teacher (one) can have multiple students (many), but each student is linked to only one teacher in this context.

- many: Represents values that are associated with a single `one`. Each many value is connected to only one `one`, ensuring that it does not belong to multiple `one` keys simultaneously. This is crucial for maintaining the 1
  relationship where `one` key is mapped to multiple values without overlapping with other keys. Using the teacher-student analogy, each student (many) is linked to one specific teacher (one).

### Usage

#### create instance

```typescript
const myMap = new OneToManyMap<string, number>();
```

#### set

- Initialize or add the pair.
- If "one" does not exist, it will be added. And "many" is added.
- If "one" exists, "many" is added.

```typescript
myMap.set("a", 10);
```

#### delete

- Delete "one" and all "many" related to "one".

```typescript
myMap.set("a", 10);
myMap.set("a", 20);
myMap.set("a", 30);
myMap.deleteByOne("a"); // delete "a" & 10 & 20 & 30
```

- Delete only "many".

```typescript
myMap.set("a", 10);
myMap.set("a", 20);
myMap.set("a", 30);
myMap.deleteByMany(20); // delete 20, no relation between "a" & 20.
```

#### get

- Get many related to "one" as `Set<M>`

```typescript
myMap.set("a", 10);
myMap.set("a", 20);
myMap.set("a", 30);
myMap.getByOne("a"); // {10, 20, 30}
```

- Get one related to "many"

```typescript
myMap.set("a", 10);
myMap.set("a", 20);
myMap.set("a", 30);
myMap.getByMany(20); // "a"
```

#### has

- Check if a value exists.

```typescript
const myMap = new OneToManyMap<string, number>();
myMap.set("a", 10);
myMap.hasByOne("a"); // true
myMap.hasByMany(20); // false
```

#### clear

- Clear all data.

```typescript
myMap.clear();
```

#### size

- Get size.

```typescript
const myMap = new OneToManyMap<string, number>();
myMap.set("a", 10);
myMap.set("a", 5);
myMap.sizeOne(); // 1
myMap.sizeMany(); // 2
```

#### get member variables

- Get "readonly" member variables.
- **Modification may result in unexpected behavior.**

```typescript
myMap.getOneToMany();
myMap.getManyToOne();
```

#### count

- Count how many relationships there are for each “one”.

```typescript
const myMap = new OneToManyMap<string, number>();
myMap.set("a", 10);
myMap.set("a", 5);
myMap.set("b", 20);
myMap.count(); // {"a" => 2, "b" => 1}
```

## Tree
### Term Explanation
- node
- parent
- children
- root
- sub tree
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
console.log(tree.getRoot()) // 1
console.log(tree.isRoot(2)) // false
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