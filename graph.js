const unweightedGraph = ({ directed }) => (xs) => {
  const g = new Map;
  const vertices = () => Array.from(g.keys());
  const neighbours = (v) => g.get(v);
  const addVertex = (v) =>  { let l; return (g.get(v) ?? (g.set(v, l = []), l)) };
  const addEdge = ([v1, v2]) => { 
    const l1 = addVertex(v1), l2 = addVertex(v2);
    l1.push(v2);
    if (!directed) { l2.push(v1) }
  };
  xs.forEach(addEdge);
  const r = { vertices, neighbours };
  r.toString = toString.bind(null, r);
  return r;
};

const weightedGraph = ({ directed }) => (xs) => {
  const g = new Map;
  const vertices = () => Array.from(g.keys());
  const neighbours = (v) => g.get(v).map(([v2]) => v2);
  const weights = (v) => g.get(v);
  const addVertex = (v) =>  { let l; return (g.get(v) ?? (g.set(v, l = []), l)) };
  const addEdge = ([v1, v2, w]) => { 
    const l1 = addVertex(v1), l2 = addVertex(v2);
    l1.push([v2, w]);
    if (!directed) { l2.push([v1, w]) }
  };
  xs.forEach(addEdge);
  const r = { vertices, neighbours, weights };
  r.toString = toString.bind(null, r);
  return r;
};

const toString = (g) => {
  const toStringGraph = (g) => g.vertices().sort(orderVertice).map(toStringEdges).filter(Boolean).join(';');
  const toStringEdges = (v1) => 
    [(g.weights || g.neighbours)(v1).map(toStringEdge).join(',')]
    .filter(Boolean)
    .map(s => toStringVertice(v1) + '/' + s)
    .pop();
  const toStringEdge = (x) => Array.isArray(x) ? (toStringVertice(x[0]) + ' ' + x[1]) : toStringVertice(x);
  const toStringVertice = (v) => typeof v === 'symbol' ? (v.toString().match(/Symbol\((.+)\)/)[1]) : String(v);
  const orderVertice = (lhs, rhs) => toStringVertice(lhs).localeCompare(toStringVertice(rhs));
  return toStringGraph(g);
};

module.exports = {   
  graph: unweightedGraph({ directed: false }),
  directedGraph: unweightedGraph({ directed: true }),
  weightedGraph: weightedGraph({ directed: false }),
  weightedDirectedGraph: weightedGraph({ directed: true })
};

if (require.main === module) {
  const { asserteq, UnorderedArray } = require('./asserteq');
  const { vertices: [A, B, C, D, E, F] } = require('./sample-graph-data');

  const xs = [
    [A, B, 1], [A, D, 2],
    [B, C, 3], [B, E, 4], [B, F, 5],
    [C, D, 6],
    [D, E, 7],
    [E, F, 8]
  ];

  const g = unweightedGraph({ directed: false })(xs);
  const dg = unweightedGraph({ directed: true })(xs);
  const wg = weightedGraph({ directed: false })(xs);
  const wdg = weightedGraph({ directed: true })(xs);

  asserteq('A/B,D;B/A,C,E,F;C/B,D;D/A,C,E;E/B,D,F;F/B,E', g.toString());
  asserteq('A/B,D;B/C,E,F;C/D;D/E;E/F', dg.toString());
  asserteq('A/B 1,D 2;B/A 1,C 3,E 4,F 5;C/B 3,D 6;D/A 2,C 6,E 7;E/B 4,D 7,F 8;F/B 5,E 8', wg.toString());
  asserteq('A/B 1,D 2;B/C 3,E 4,F 5;C/D 6;D/E 7;E/F 8', wdg.toString());

  const assertVertices = (expected) => (g) => asserteq(expected, UnorderedArray.from(g.vertices()));
  [g, dg, wg, wdg].forEach(assertVertices([A, B, C, D, E, F]));

  const assertNeighbours = (expected) => (g) => asserteq(expected, UnorderedArray.from(Array.from(g.vertices()).map(v => [v, UnorderedArray.from(g.neighbours(v))])));
  [g, wg].forEach(assertNeighbours([
    [A, [B, D]],
    [B, [A, C, E, F]],
    [C, [B, D]],
    [D, [A, C, E]],
    [E, [B, D, F]],
    [F, [B, E]]
  ]));
  [dg, wdg].forEach(assertNeighbours([
    [A, [B, D]],
    [B, [C, E, F]],
    [C, [D]],
    [D, [E]],
    [E, [F]],
    [F, []]
  ]));

  const assertWeights = (expected) => (wg) => asserteq(expected, UnorderedArray.from(Array.from(wg.vertices()).map(v => [v, wg.weights(v)])));
  assertWeights([
    [A, [[B, 1], [D, 2]]],
    [B, [[A, 1], [C, 3], [E, 4], [F, 5]]],
    [C, [[B, 3], [D, 6]]],
    [D, [[A, 2], [E, 7]]],
    [E, [[B, 4], [D, 7], [F, 8]]],
    [F, [[B, 5], [E, 8]]]
  ], wg);
  assertWeights([
    [A, [[B, 1], [D, 2]]],
    [B, [[C, 3], [E, 4], [F, 5]]],
    [C, [[D, 6]]],
    [D, [[E, 7]]],
    [E, [[F, 8]]],
    [F, []],
  ], wdg);
}
