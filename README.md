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
