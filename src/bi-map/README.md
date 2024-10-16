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