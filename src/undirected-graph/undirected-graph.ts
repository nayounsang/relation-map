interface EdgeMeta {
  weight: number | undefined;
}

export class UndirectedGraph<T = any> {
  private graph: Map<T, Map<T, EdgeMeta>>;
  constructor() {
    this.graph = new Map();
  }
  public setVertex(vertex: T) {
    if (this.graph.has(vertex)) {
      return false;
    }
    this.graph.set(vertex, new Map());
    return true;
  }
  public setEdge(vertexA: T, vertexB: T, weight?: number) {
    this.setVertex(vertexA);
    this.setVertex(vertexB);
    this.graph.get(vertexA)?.set(vertexB, { weight });
    this.graph.get(vertexB)?.set(vertexA, { weight });
  }
  public deleteEdge(vertexA: T, vertexB: T) {
    this.graph.get(vertexA)?.delete(vertexB);
    this.graph.get(vertexB)?.delete(vertexA);
  }
  public deleteVertex(vertex: T) {
    this.graph.get(vertex)?.forEach((_meta, v) => {
      this.graph.get(v)?.delete(vertex);
    });
    this.graph.delete(vertex);
  }
  public clearNeighbors(vertex: T) {
    this.graph.get(vertex)?.forEach((_meta, v) => {
      this.graph.get(v)?.delete(vertex);
    });
    this.graph.get(vertex)?.clear();
  }
  public has(vertex: T) {
    return this.graph.has(vertex);
  }
  public getNeighbors(vertex: T) {
    const neighbors: T[] = [];
    this.graph.get(vertex)?.forEach((_meta, v) => {
      neighbors.push(v);
    });
    return neighbors;
  }
  public getAllVertices() {
    const vertices: T[] = [];
    this.graph.forEach((_meta, v) => {
      vertices.push(v);
    });
    return vertices;
  }

  public getAllEdges() {
    const edges: [start: T, end: T, weight: number | undefined][] = [];
    for (const vertex of this.graph.keys()) {
      this.graph.get(vertex)?.forEach((_meta, v) => {
        edges.push([vertex, v, _meta.weight]);
      });
    }
    return edges;
  }

  public getWeight(vertexA: T, vertexB: T) {
    return this.graph.get(vertexA)?.get(vertexB)?.weight;
  }

  public isConnected(vertexA: T, vertexB: T) {
    return this.graph.get(vertexA)?.has(vertexB);
  }
}
