// Max Flow Ford-Fulkerson method - https://youtu.be/09_LlHjoEiY?t=17910

const findPath = require('./find-path-recursive');
const Graph = require('./graph');

const maxFlow = (fg) => {
  let p;
  while ((p = findAugmentingPath(fg))) {
    augmentFlow(p);
  }
  const r = fg.inEdges(fg.sink()).reduce((acc, [, , f]) => acc + f, 0);
  return r;
};

const findAugmentingPath = (fg) => (
  findPath(new ResidualGraph(fg), fg.source(), fg.sink())
);

const augmentFlow = (p) => {
  const d = residualCapacityOf(p);
  p.forEach(([u, , , e]) => { const [v, , f] = e; e[2] = f + (u == v ? d : -d) });
};

const residualCapacityOf = (p) => (
  Math.min(...p.map(([, , c]) => c))
);

class Edge extends Array {
  from() { return this[0] }
  to() { return this[1] }
  acceptable() { return true }
}

class FlowGraph extends Graph {
  constructor(n, xs, s, t) {
    super(n, xs.map(([v1, v2, c]) => Edge.of(v1, v2, 0, c)));
    this.s = s;
    this.t = t;
  }
  source() { return this.s }
  sink() { return this.t }
}

class ResidualGraph extends Graph {
  constructor(fg) {
    const exs = Array.from(fg.edges()).flatMap(e => { 
      const [v1, v2, f, c] = e;
      return [Edge.of(v1, v2, c - f, e), Edge.of(v2, v1, f, e)].filter(([, , f]) => f != 0);
    });
    super(fg.vertices().length, exs);
  }
}

module.exports = { maxFlow, FlowGraph };

if (require.main === module) {
  require('./test-max-flow')(module.exports, process.argv[2]);
}
