class Graph {
  constructor(n, xs) {
    this.vs = Array.from(Array(n), (_, v) => v);
    this.oxs = Array.from(this.vs, () => []);
    this.ixs = Array.from(this.vs, () => []);
    this.xss = new Set;
    xs.forEach(e => {
      const [v1, v2] = e;
      this.oxs[v1].push(e);
      this.ixs[v2].push(e);
      this.xss.add(e);
    });
  }
  edges() { return this.xss }
  vertices() { return this.vs }
  outEdges(v) { return this.oxs[v] }
  inEdges(v) { return this.ixs[v] }
}

module.exports = Graph;
