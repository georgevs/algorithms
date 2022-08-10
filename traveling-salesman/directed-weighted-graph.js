const stringify = require('../graph-stringify');

const directedWeightedGraph = (xs) => {
  const g = new Map;
  const vertices = () => g.keys();
  const neighbours = (v) => g.get(v).map(([v]) => v);
  const weights = (v) => g.get(v);
  const addVertex = (v) => (g.get(v) ?? g.set(v, []).get(v));
  const addEdge = ([v1, v2, w]) => { addVertex(v2); addVertex(v1).push([v2, w]) };
  xs.forEach(addEdge);
  return { vertices, neighbours, weights, g };
};

const directedWeightedGraphEx = (xs) => {
  const g = directedWeightedGraph(xs);
  g.toString = stringify.bind(null, g);
  return g;
};

module.exports = directedWeightedGraphEx;

if (require.main === module) {
  require('./test')({ directedWeightedGraph: directedWeightedGraphEx });
}
