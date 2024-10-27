import { UndirectedGraph } from "./undirected-graph";

describe("Undirected graph", () => {
  let graph: UndirectedGraph<number>;

  beforeEach(() => {
    graph = new UndirectedGraph<number>();
  });

  it("should set a new independent vertex", () => {
    graph.setVertex(1);
    expect(graph.has(1)).toBe(true);
    expect(graph.getNeighbors(1)).toHaveLength(0);
  });

  it("should not delete metadata for an existing vertex when setting an existing vertex", () => {
    graph.setEdge(1, 2, 100);
    expect(graph.setVertex(1)).toBe(false);
    expect(graph.getNeighbors(1)).toContain(2);
    expect(graph.getWeight(1, 2)).toBe(100);
  });

  it("should set a new undirected edge", () => {
    graph.setEdge(1, 2, 100);
    expect(graph.getNeighbors(1)).toContain(2);
    expect(graph.getNeighbors(2)).toContain(1);
    expect(graph.getAllEdges()).toContainEqual([1, 2, 100]);
    expect(graph.getAllEdges()).toContainEqual([2, 1, 100]);
  });

  it("should update the weight of an edge", () => {
    graph.setEdge(1, 2, 100);
    expect(graph.getWeight(1, 2)).toBe(100);
    expect(graph.getWeight(2, 1)).toBe(100);
    graph.setEdge(1, 2, 200);
    expect(graph.getWeight(1, 2)).toBe(200);
    expect(graph.getWeight(2, 1)).toBe(200);
  });

  it("should know whether an edge is connected", () => {
    graph.setEdge(1, 2);
    expect(graph.isConnected(1, 2)).toBe(true);
    expect(graph.isConnected(2, 1)).toBe(true);
    expect(graph.isConnected(1, 3)).toBe(false);
  });

  it("should add new neighbors", () => {
    graph.setEdge(1, 2);
    graph.setEdge(1, 3);
    expect(graph.getNeighbors(1)).toHaveLength(2);
    expect(graph.isConnected(2, 1)).toBe(true);
    expect(graph.isConnected(3, 1)).toBe(true);
  });


});
