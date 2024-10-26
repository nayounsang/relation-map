import { UndirectedGraph } from "./undirected-graph";

describe("Undirected graph", () => {
  let graph: UndirectedGraph<number>;

  beforeEach(() => {
    graph = new UndirectedGraph<number>();
  });

  it("should set the new independent vertex", () => {
    graph.setVertex(1);
    expect(graph.has(1)).toBe(true);
    expect(graph.getNeighbors(1)).toHaveLength(0);
  });

  it("should not delete meta data for existing vertex when set the exist vertex", () => {
    graph.setEdge(1, 2, 100);
    expect(graph.setVertex(1)).toBe(false);
    expect(graph.getNeighbors(1)).toContain(2);
  });

  it("should set the new undirected edge", () => {
    graph.setEdge(1, 2, 100);
    expect(graph.getNeighbors(1)).toContain(2);
    expect(graph.getNeighbors(2)).toContain(1);
    expect(graph.getAllEdges()).toContainEqual([1, 2, 100]);
    expect(graph.getAllEdges()).toContainEqual([2, 1, 100]);
  });

});
