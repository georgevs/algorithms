const digraph = (n, xs) => {
  const vs = Array.from(Array(n), (_, i) => i);
  const es = Array.from(vs, () => []);
  const ds = Array(n).fill(0);
  const vertices = () => vs;
  const edges = (v) => es[v];  // out edges
  const degree = (v) => ds[v];  // total edges count
  const addEdge = (e) => { 
    const [v1, v2] = e; 
    es[v1].push(e);
    ds[v1]++;
    ds[v2]++;
  };
  xs.forEach(addEdge);
  return { vertices, edges, degree };
};

module.exports = digraph;

if (require.main === module) {
  require('./test-euler-path-digraph')({ digraph });
}
