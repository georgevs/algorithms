const { asserteq, SomeArray: SA } = require('../asserteq');
const Graph = require('./graph');

const loop = (n, fn) => { for (let i = 0; i < n; ++i) fn(i) };
const test = (findPath, n) => loop(Number.parseInt(n) || 1, () => {
  const g1 = new Graph(4, [
    [0,1],[0,2],
    [1,2],[1,3],
    [2,1],[2,3]
  ]);
  const g2 = new Graph(5, [
    [0,1],[0,2],
    [1,2],[1,3],
    [2,1],[2,3]
  ]);

  const foldPath = (p) => p.flatMap(([v1, v2]) => [v1, v2]).filter((_, i) => i == 0 || i % 2 == 1);

  asserteq(SA.of([0, 1, 2, 3], [0, 1, 3], [0, 2, 1, 3], [0, 2, 3]), foldPath(findPath(g1, 0, 3)));
  asserteq(undefined, findPath(g2, 0, 5));
});

module.exports = test;

if (require.main === module) {
  test(require('./find-path-recursive'));
}
