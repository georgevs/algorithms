/*
seq 1 | xargs -L1 time node -e 'require("./test")(require(process.argv[1]),process.argv[2])'
*/

const { asserteq } = require('../asserteq');
const { bgxs } = require('../sample-graph-data');
const { graph } = require('../graph');

const bg = graph(bgxs);

const loop = (n, fn) => { for (let i = 0; i < n; ++i) fn(i) };
const test = ({ articulationPoints }, n) => loop(Number.parseInt(n) || 1, () => {
  asserteq([2, 3, 5], articulationPoints(bg));
});

module.exports = test;
