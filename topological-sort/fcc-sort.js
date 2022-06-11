// https://youtu.be/09_LlHjoEiY?t=3975

const { directedGraph } = require("../graph");

const topsort = (graph) => {
  const N = graph.numberOfNodes();
  const V = Array(N).fill(false);
  const ordering = Array(N).fill(0);
  let i = N - 1;
  for (let at = 0; at < N; ++at) {
    if (!V[at]) {
      visitedNodes = new Set;
      dfs(at, V, visitedNodes, graph);
      for (const nodeId of visitedNodes) {
        ordering[i] = nodeId;
        i = i - 1;
      }
    }
  }
  return ordering;
};

const dfs = (at, V, visitedNodes, graph) => {
  V[at] = true;
  const edges = graph.getEdgesOutFromNode(at);
  for (const edge of edges) {
    if (!V[edge.to]) {
      dfs(edge.to, V, visitedNodes, graph);
    }
  }
  visitedNodes.add(at);
};

const sort = (g) => {
  const m = new Map(g.vertices().map((v, i) => [v, i]));
  const trm = Map.prototype.get.bind(m);
  const g2 = directedGraph(g.vertices().flatMap(v1 => g.neighbours(v1).map(v2 => [trm(v1), trm(v2)])));
  
  const s = topsort({ 
    numberOfNodes: () => g2.vertices().length,
    getEdgesOutFromNode: (v1) => g2.neighbours(v1).map(v2 => ({ from: v1, to: v2 }))
  });

  const k = new Map(g.vertices().map((v, i) => [i, v]));
  const trk = Map.prototype.get.bind(k);
  return s.map(trk);
}

module.exports = sort;
