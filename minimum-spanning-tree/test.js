/*
seq 1 | xargs -L1 time node -e 'require("./test")(require(process.argv[1]),process.argv[2])'
*/

const { asserteq } = require('../asserteq');
const { mstgxs } = require('../sample-graph-data');
const { graph } = require('../graph');

const mstg = graph(mstgxs);

const loop = (n, fn) => { for (let i = 0; i < n; ++i) fn(i) };
const test = ({ minimumSpanningTree }, n) => loop(Number.parseInt(n) || 1, () => {
  asserteq([
    [A,E,1],
    [B,C,4],[B,D,2],
    [C,B,4],[C,I,1],
    [D,B,2],[D,E,2],[D,H,2],
    [E,A,1],[E,D,2],[E,F,1],
    [F,E,1],
    [G,H,1],
    [H,D,2],[H,G,1],
    [I,C,1],[I,J,0],
    [J,I,0]
  ], minimumSpanningTree(mstg));
});

module.exports = test;
