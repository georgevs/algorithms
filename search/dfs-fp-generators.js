const { pipe, tap, gmap: map, gfilter: filter } = require('../fp');

const enumVertices = (fn, g) => {
  const first = g.vertices().next().value;
  if (first !== undefined) {
    const vs = new Set([first]);
    const dropVisited = filter(v => !vs.has(v));
    const markAsVisited = map(tap(Set.prototype.add.bind(vs)));
    const unvisitedNeighbours = pipe(dropVisited, markAsVisited);
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
