<!-- TOC -->
- [Relation map](#relation-map)
  - [Install](#install)
  - [Link](#link)
- [Features](#features)
  - [BiMap](#bimap)
    - [Term Explanation](#term-explanation)
    - [Usage](#usage)
  - [OneToManyMap](#onetomanymap)
    - [Term Explanation](#term-explanation)
    - [Usage](#usage)
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

# Features

## BiMap

- A one-to-one relationship between "left" and "right" is maintained when updating, adding and deleting.
- Quick modification and access to "left" and "right" are possible.
- Duplication is not allowed for the same "left" and "right".

### Term Explanation

**There is basically no priority between "left" and "right".**

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
