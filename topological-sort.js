const topologicalSort = (g) => {
  const r = [];
  const s = [];
  const vs = new Set;
  for (const v of g.vertices()) {
    if (!vs.has(v)) { vs.add(v); s.push(v) }
    while (s.length > 0) {
      s.push(...g.neighbours(s.pop()));
    }
    r.unshift(v);
  }
  return r;
};

const isTopologicalOrderOf = (xs, s) => xs.every(([v1, v2]) => s.indexOf(v1) < s.indexOf(v2));

module.exports = topologicalSort;

if (require.main === module) {
  const { asserteq } = require('./asserteq');
  const graph = require('./graph');
  const { dag } = require('./sample-graph-data');

  const assertTopologicalSortIsValidFor = (xs) => asserteq(true, isTopologicalOrderOf(xs, topologicalSort(graph(xs))));
  const assertTopologicalSortIsUndefinedFor = (xs) => asserteq(undefined, topologicalSort(graph(xs)));

  console.log(topologicalSort(graph(dag)));
  assertTopologicalSortIsValidFor(dag);
}
