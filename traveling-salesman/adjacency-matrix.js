const adjacencyMatrix = (xs) => {
  const v2i = new Map(Array.from(xs.reduce((acc, [v1, v2]) => acc.add(v1).add(v2), new Set))
    .sort((lhs, rhs) => lhs.toString().localeCompare(rhs.toString()))
    .map((v, i) => [v, i]));
  ...
};

module.exports = adjacencyMatrix;

if (require.main === module) {
  require('./test')({ adjacencyMatrix });
}
