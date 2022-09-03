const graph = require('./graph');

const eulerPathGraph = (n, xs) => {
  const g = graph(n, xs);
  
  const first = () => {
    let i0;
    const vs = g.vertices();
    for (let i = 0; i < vs.length; ++i) {
      if (g.degree(vs[i]) % 2 != 0) { return vs[i] }
      if (i0 == undefined) { i0 = i }
    }
    return vs[i0];
  };
  
  const hasEulerPath = () => (
    g.vertices().filter(v => g.degree(v) % 2 != 0).length <= 2
  );

  return { ...g, first, hasEulerPath };
};

module.exports = eulerPathGraph;

if (require.main === module) {
  require('./test-euler-path-graph')({ eulerPathGraph });
}
