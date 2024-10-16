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
  - [OneToManyMap](#onetomanymap)
  - [Tree](#tree)
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
## [BiMap](./src/bi-map/README.md)
## [OneToManyMap](./src/one-to-many-map/README.md)
## [Tree](./src/tree/README.md)