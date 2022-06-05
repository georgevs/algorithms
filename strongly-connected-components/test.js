/*
seq 1 | xargs -L1 time node -e 'require("./test")(require(process.argv[1]),process.argv[2])'
*/

const { asserteq } = require('../asserteq');
const { sscdgxs, vertices: [A, B, C, D, E, F, G, H] } = require('../sample-graph-data');
const { directedGraph } = require('../graph');

const sscdg = directedGraph(sscdgxs);

const loop = (n, fn) => { for (let i = 0; i < n; ++i) fn(i) };
const test = ({ stronglyConnectedComponents }, n) => loop(Number.parseInt(n) || 1, () => {
  asserteq([[A, B, C], [D, F], [E, G, H], [I]], stronglyConnectedComponents(sscdgxs));
});

module.exports = test;
