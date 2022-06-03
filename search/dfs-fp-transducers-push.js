const { compose, tap, tfilter, tmap, toArray, transduce } = require('../fp');

const enumVertices = (fn, g) => {
  const first = g.vertices().next().value;
  if (first !== undefined) {
    const vs = new Set([first]);
    const dropVisited = tfilter(v => !vs.has(v));
    const markAsVisited = tmap(tap(Set.prototype.add.bind(vs)));
    const unvisitedNeighbours = (xs) => transduce((acc, x) => (acc.push(x), acc), [])(compose(dropVisited, markAsVisited))(xs);
    const s = [first];
    do {
      const v = s.pop();
      if (fn(v)) { return true }
      s.push(...unvisitedNeighbours(g.neighbours(v)));
    } while (s.length > 0);
  }
  return false;
};

module.exports = { enumVertices };
