/*
seq 1 | xargs -L1 time node -e 'require("./test")(require(process.argv[1]),process.argv[2])'
*/

const { asserteq } = require('../asserteq');
const { nfdgxs } = require('../sample-graph-data');
const { graph } = require('../graph');

const nfdg = graph(nfdgxs);

const loop = (n, fn) => { for (let i = 0; i < n; ++i) fn(i) };
const test = ({ networkFlow }, n) => loop(Number.parseInt(n) || 1, () => {
  asserteq([], networkFlow(nfdg));
});

module.exports = test;
