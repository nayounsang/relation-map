import { OneToManyMap } from "./one-to-many-map";


describe('OneToManyMap', () => {
  let oneToManyMap: OneToManyMap<string, number>;

  beforeEach(() => {
    oneToManyMap = new OneToManyMap<string, number>();
  });
  it('should be accessible after set.', () => {
    oneToManyMap.set('room1', 1);
    oneToManyMap.set('room1', 2);
    expect(oneToManyMap.hasOne('room1')).toBe(true);
    expect(oneToManyMap.getByMany(1)).toBe('room1');
    expect(oneToManyMap.getByMany(2)).toBe('room1');
  });
  it('should be maintained one to many relation.', () => {
    oneToManyMap.set('room1', 1);
    oneToManyMap.set('room1', 2);
    oneToManyMap.set('room2', 1);
    expect(oneToManyMap.getByMany(1)).toBe('room2');
    expect(oneToManyMap.getByOne('room2')?.has(1)).toBe(true);
    expect(oneToManyMap.getByOne('room1')?.has(1)).toBe(false);
  });
  it('should clean up memory when set causes empty state.', () => {
    oneToManyMap.set('room1', 1);
    oneToManyMap.set('room2', 1);
    expect(oneToManyMap.getByMany(1)).toBe('room2');
    expect(oneToManyMap.getByOne('room2')?.has(1)).toBe(true);
    expect(oneToManyMap.hasOne('room1')).toBe(false);
  });
  it('should clean up memory when delete causes empty state.', () => {
    oneToManyMap.set('room1', 1);
    oneToManyMap.deleteByMany(1);
    expect(oneToManyMap.hasMany(1)).toBe(false);
    expect(oneToManyMap.hasOne('room1')).toBe(false);
  });
  it('should delete many when its one is deleted.', () => {
    oneToManyMap.set('room1', 1);
    oneToManyMap.set('room1', 2);
    oneToManyMap.deleteByOne('room1');
    expect(oneToManyMap.hasOne('room1')).toBe(false);
    expect(oneToManyMap.hasMany(1)).toBe(false);
    expect(oneToManyMap.hasMany(2)).toBe(false);
  });
});
