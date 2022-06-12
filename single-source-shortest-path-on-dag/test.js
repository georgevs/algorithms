const { asserteq, UnorderedArray: UA } = require('../asserteq');
const { weightedDirectedGraph } = require('../graph');

const [A,B,C,D,E,F,G,H] = Array.from('ABCDEFGH').map(Symbol);
const xs = [
  [A,B,3],[A,C,6],
  [B,C,4],[B,D,4],[B,E,11],
  [C,D,8],[C,G,11],
  [D,E,-4],[D,F,5],[D,G,2],
  [E,H,9],
  [F,H,1],
  [G,H,2]
];
const g = weightedDirectedGraph(xs);

const test = (shortestPaths) => {
  asserteq(UA.of([A, 0], [B, 3], [C, 6], [D, 7], [E, 3], [F, 12], [G, 9], [H, 11]), shortestPaths(g, A));
};

module.exports = test;

if (require.main === module) {
  test(require('./shortest-paths'));
}
