/*
seq 1 | xargs -L1 time node -e 'require("./test")(require(process.argv[1]),process.argv[2])'
*/

const { asserteq } = require('../asserteq');

const [A,B,C,D] = Array.from('ABCD').map(Symbol);
const xs = [
  [A,B,4],[A,C,1],[A,D,9],
  [B,A,3],[B,C,6],[B,D,11],
  [C,A,4],[C,B,1],[C,D,2],
  [D,A,6],[D,B,5],[D,C,-4]
];


const loop = (n, fn) => { for (let i = 0; i < n; ++i) fn(i) };
const test = ({ adjacencyMatrix, directedWeightedGraph, travelingSalesman }, n) => loop(Number.parseInt(n) || 1, () => {
  [directedWeightedGraph].filter(Boolean).forEach(testGraph);
  [travelingSalesman].filter(Boolean).forEach(testTSS(require('./directed-weighted-graph')));
  [adjacencyMatrix].filter(Boolean).forEach(testAM);
});
const testAM = (adjacencyMatrix) => {
  console.log(adjacencyMatrix(xs));
};
const testTSS = (directedWeightedGraph) => (travelingSalesman) => {
  asserteq([A,D,C,B], travelingSalesman(directedWeightedGraph(xs)));
};
const testGraph = (directedWeightedGraph) => {
  asserteq('A/B 4,C 1,D 9;B/A 3,C 6,D 11;C/A 4,B 1,D 2;D/A 6,B 5,C -4', directedWeightedGraph(xs).toString());
};

module.exports = test;

if (require.main === module) {
  test({ directedWeightedGraph: require('./directed-weighted-graph') });
  test({ adjacencyMatrix: require('./adjacency-matrix') });
}
