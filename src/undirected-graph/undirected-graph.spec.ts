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
    expect(graph.isConnected(1, 2)).toBe(true);
    expect(graph.isConnected(2, 1)).toBe(true);
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

  it("should know all vertices in graph", () => {
    const verticesIncluded = [1, 2, 3, 4];
    const verticesNotIncluded = [5, 6];
    verticesIncluded.forEach((v) => {
      graph.setVertex(v);
    });
    const vertices = graph.getAllVertices();
    verticesIncluded.forEach((v) => {
      expect(vertices).toContain(v);
    });
    verticesNotIncluded.forEach((v) => {
      expect(vertices).not.toContain(v);
    });
  });

  it("should know all edges in graph but without duplicates", () => {
    const edgesToAdd = [
      [1, 2],
      [2, 3],
      [1, 4],
    ];
    edgesToAdd.forEach((edge) => {
      graph.setEdge(edge[0], edge[1]);
    });
    const edges = graph.getAllEdges();
    edgesToAdd.forEach((edge) => {
      expect(edges).toContainEqual([edge[0], edge[1], undefined]);
    });
    expect(edges.length).toBe(edgesToAdd.length);
  });

  it("should delete existing edges", () => {
    graph.setEdge(1, 2);
    graph.deleteEdge(1, 2);
    expect(graph.isConnected(1, 2)).toBe(false);
    expect(graph.isConnected(2, 1)).toBe(false);
  });

  it("should delete a vertex along with its connected edges", () => {
    graph.setEdge(1, 2);
    graph.deleteVertex(1);
    expect(graph.has(1)).toBe(false);
    expect(graph.has(2)).toBe(true);
    expect(graph.isConnected(2, 1)).toBe(false);
  });

  it("should clear connections", () => {
    const neighbors = [1, 2, 3, 4];
    neighbors.forEach((v) => {
      graph.setEdge(1, v);
    });
    graph.clearConnections(1);
    neighbors.forEach((v) => {
      expect(graph.isConnected(v, 1)).toBe(false);
    });
    expect(graph.has(1)).toBe(true);
    expect(graph.getNeighbors(1)).toHaveLength(0);
  });
});
