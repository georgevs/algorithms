// n :: number of nodes
// g :: adjacency list
const solution = (n, g) => {
  // bfs :: (s, e) -> p
  // s :: start node, 0 <= s < n
  // e :: end node, 0 <= e < n
  // p :: shortest path
  const bfs = (s, e) => {
    const prev = solve(s);
    return reconstructPath(s, e, prev);
  };
  
  // solve :: s -> prev
  // returns array of parents per node 
  const solve = (s) => {
    const q = queue();
    q.enqueue(s);
    const visited = Array(n).fill(false);
    visited[s] = true;
    const prev = Array(n);
    while (!q.isEmpty()) {
      const node = q.dequeue();
      const neighbours = g.get(node);
      for (const next of neighbours) {
        if (!visited[next]) {
          q.enqueue(next);
          visited[next] = true;
          prev[next] = node;   // <--- `next` PARENT is `node`
        }
      }
    }
    return prev;
  };

  // reconstructPath :: (s, e, prev) -> p
  const reconstructPath = (s, e, prev) => {
    const path = [];
    for (let at = e; at !== undefined; at = prev[at]) {
      path.push(at);
    }
    path.reverse();
    return path[0] === s ? path : [];
  };

  const queue = () => {
    const xs = [];
    const enqueue = (x) => xs.push(x);
    const dequeue = () => xs.shift();
    const isEmpty = () => xs.length === 0;
    return { enqueue, dequeue, isEmpty };
  };

  return bfs;
};

module.exports = solution;

if (require.main === module) {
  const { asserteq, SomeArray: SA } = require('../asserteq');
  const adj = {
    [0]:[7,9,11],
    [3]:[2,4],
    [6]:[5,7],
    [7]:[0,3,6,11],
    [8]:[1,9,12],
    [9]:[0,8,10],
    [10]:[1,9],
    [11]:[0,7]
  };
  const bfs = solution(12, { get: (x) => adj[x] ?? [] });
  asserteq([0,7,3,4], bfs(0,4));
  asserteq(SA.of([0,9,10,1], [0,9,8,1]), bfs(0,1));
}
