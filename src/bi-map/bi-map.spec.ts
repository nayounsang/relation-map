import { BiMap } from "./bi-map";

describe("OneToOne BiMap", () => {
  let biMap: BiMap<string, number>;

  beforeEach(() => {
    biMap = new BiMap<string, number>();
  });

  it("should be accessible from both sides after set.", () => {
    biMap.set("user1", 1);
    expect(biMap.getByLeft("user1")).toBe(1);
    expect(biMap.getByRight(1)).toBe("user1");
  });

  it("should be maintained one-to-one matching after update the right.", () => {
    biMap.set("user1", 1);
    biMap.set("user1", 2);
    expect(biMap.getByLeft("user1")).toBe(2);
    expect(biMap.getByRight(2)).toBe("user1");
    expect(biMap.hasByRight(1)).toBe(false);
  });

  it("should be maintained one-to-one matching after update the left.", () => {
    biMap.set("user1", 1);
    biMap.set("user2", 1);
    expect(biMap.getByLeft("user2")).toBe(1);
    expect(biMap.getByRight(1)).toBe("user2");
    expect(biMap.hasByLeft("user1")).toBe(false);
  });

  it("should be deleted from both sides by left", () => {
    biMap.set("user1", 1);
    biMap.deleteByLeft("user1");
    expect(biMap.hasByLeft("user1")).toBe(false);
    expect(biMap.hasByRight(1)).toBe(false);
  });

  it("should be deleted from both sides by right", () => {
    biMap.set("user1", 1);
    biMap.deleteByRight(1);
    expect(biMap.hasByLeft("user1")).toBe(false);
    expect(biMap.hasByRight(1)).toBe(false);
  });
});
