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

- A one-to-one relationship between "left" and right" is maintained when editing, adding and deleting.
- Quick modification and access to "left" and "right" are possible.
- Duplication is not allowed for the same "left" and "right."

### Usage

#### create instance

- Set type of left and right with generic`<L, R>`.

```typescript
const myMap = new BiMap<string, number>();
```

#### set

- Add or update the pair

```typescript
myMap.set("a", 10);
```

#### delete

- Delete the pair

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
const myMap = new BiMap();
myMap.set("a", 10);
myMap.hasByLeft("a"); // true
myMap.getByRight(20); // false
```

#### clear

- Clear all data

```typescript
myMap.clear();
```

#### size

- One pair size

```typescript
const myMap = new BiMap();
myMap.set("a", 10);
myMap.set("b", 5);
myMap.size(); // 2
```

#### get member variables

- Get "readonly" member variables
- __Modification may result in unexpected behavior.__

```typescript
myMap.getLeftToRight();
myMap.getRightToLeft();
```

## OneToManyMap

### Usage
