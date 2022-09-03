const graph = (n, xs) => {
  const vs = Array.from(Array(n), (_, i) => i);
  const es = Array.from(vs, () => []);
  const ds = Array(n).fill(0);
  const vertices = () => vs;
  const edges = (v) => es[v];
  const degree = (v) => ds[v];
  const addEdge = (e) => { 
    const [v1, v2] = e; 
    if (v1 <= v2) {
      es[v1].push(e);
      es[v2].push(e);
      ds[v1]++;
      ds[v2]++;
    }
  };
  xs.forEach(addEdge);
  return { vertices, edges, degree };
};

module.exports = graph;

if (require.main === module) {
  require('./test-euler-path-graph')({ graph });
}
