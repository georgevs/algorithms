/*
seq 1 | xargs -L1 time node -e 'require("./test")(require(process.argv[1]),process.argv[2])'
*/

const { asserteq } = require('../asserteq');
const { bgxs } = require('../sample-graph-data');
const { graph } = require('../graph');

const bg = graph(bgxs);

const loop = (n, fn) => { for (let i = 0; i < n; ++i) fn(i) };
const test = ({ bridges }, n) => loop(Number.parseInt(n) || 1, () => {
  asserteq([[2,3],[3,4],[2,5]], bridges(bg));
});

module.exports = test;
