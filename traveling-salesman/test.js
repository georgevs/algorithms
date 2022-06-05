/*
seq 1 | xargs -L1 time node -e 'require("./test")(require(process.argv[1]),process.argv[2])'
*/

const { asserteq } = require('../asserteq');
const { tspdgxs, vertices: [A, B, C, D, E, F, G, H] } = require('../sample-graph-data');
const { directedGraph } = require('../graph');

const tspdg = directedGraph(tspdgxs);

const loop = (n, fn) => { for (let i = 0; i < n; ++i) fn(i) };
const test = ({ travelingSalesman }, n) => loop(Number.parseInt(n) || 1, () => {
  asserteq([A,D,C,B], travelingSalesman(tspdg));
});

module.exports = test;
