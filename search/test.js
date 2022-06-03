/*
seq 1 | xargs -L1 time node -e 'require("./test")(require(process.argv[1]),process.argv[2])'

5 x 100000
-------------------
0.65 dfs-iterative
0.75 dfs-fp-array
0.76 dfs-fp-transducer-push
0.91 dfs-fp-transducer-concat
1.52 dfs-fp-generators
1.61 dfs-fp-iterators
*/

const { asserteq, UnorderedArray } = require('../asserteq');
const { dagxs, vertices: [A, B, C, D, E, F, G, H] } = require('../sample-graph-data');
const { dg } = require('../graph');

const dag = dg(dagxs);
const acc = (fn) => (...args) => { const rs = []; fn((v) => (rs.push(v), void 0), ...args); return rs };
const loop = (n, fn) => { for (let i = 0; i < n; ++i) fn(i) };

const test = ({ enumVertices, enumPaths }, n) => loop(Number.parseInt(n) || 1, () => {
  if (enumVertices) {
    const assertEnumVertices = (expected) => (g) => asserteq(expected, UnorderedArray.from(acc(enumVertices)(g)));
    [dag].forEach(assertEnumVertices([A, B, C, D, E, F, G, H]));
  }

  if (enumPaths) {
  }
});

module.exports = test;