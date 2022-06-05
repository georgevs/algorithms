const topologicalSort = (g) => {
  const rs = [];
  const s = [];
  const vs = new Set;
  for (const v of g.vertices()) {
    if (!vs.has(v)) { vs.add(v); s.push(v) }
    while (s.length > 0) {
      s.push(...g.neighbours(s.pop()));
    }
    rs.unshift(v);
  }
  return rs;
};

const isTopologicalOrderOf = (xs, s) => xs.every(([v1, v2]) => s.indexOf(v1) < s.indexOf(v2));

module.exports = topologicalSort;

if (require.main === module) {
  const { asserteq } = require('./asserteq');
  const { graph } = require('./graph');
  const { dagxs } = require('./sample-graph-data');

  const dag = graph(dagxs);

  const assertTopologicalSortIsValidFor = (g) => asserteq(true, isTopologicalOrderOf(xs, topologicalSort(g)));
  const assertTopologicalSortIsUndefinedFor = (g) => asserteq(undefined, topologicalSort(g));

  console.log(topologicalSort(dag));
  assertTopologicalSortIsValidFor(dag);
}
