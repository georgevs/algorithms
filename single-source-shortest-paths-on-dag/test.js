const { asserteq, UnorderedArray: UA } = require('../asserteq');
const { weightedDirectedGraph } = require('../graph');

const [A,B,C,D,E,F,G,H] = Array.from('ABCDEFGH').map(Symbol);
const nwxs = [
  [A,B,3],[A,C,6],
  [B,C,4],[B,D,4],[B,E,11],
  [C,D,8],[C,G,11],
  [D,E,-4],[D,F,5],[D,G,2],
  [E,H,9],
  [F,H,1],
  [G,H,2]
];

// directed graph with negative weights
const nwg = weightedDirectedGraph(nwxs);

const xs = [
  [0,1,4],[0,2,1],
  [1,3,1],
  [2,1,2],[2,3,5],
  [3,4,3]
];

// directed graph with ONLY positive weights
const g = weightedDirectedGraph(xs);

const test = ({ shortestPaths, dijkstra, findShortestPath }) => {
  [shortestPaths].filter(Boolean).forEach(fn => {
    asserteq(UA.of([A, 0], [B, 3], [C, 6], [D, 7], [E, 3], [F, 12], [G, 9], [H, 11]), fn(nwg, A));
  });
  [shortestPaths, dijkstra].filter(Boolean).forEach(fn => {
    asserteq(UA.of([0, 0], [1, 3], [2, 1], [3, 4], [4, 7]), fn(g, 0));
  });
  [findShortestPath].filter(Boolean).forEach(fn => {
    asserteq([0, 2, 1, 3, 4], fn(g, 0, 4));
  });
};

module.exports = test;

if (require.main === module) {
  test({ shortestPaths: require('./topological-sort-shortest-paths') });
  test({ dijkstra: require('./dijkstra-lazy-shortest-paths') });
  test({ findShortestPath: require('./dijkstra-lazy-find-optimal-path') });
}
