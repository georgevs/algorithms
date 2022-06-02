const enumVertices = (fn, g) => {
  const first = g.vertices().next().value;
  if (first !== undefined) {
    const vs = new Set();
    const s = [first];
    do {
      const v = s.pop();
      if (!vs.has(v)) {
        vs.add(v);
        if (fn(v)) { return true }
        for (const v2 of g.neighbours(v)) {
          s.push(v2);
        }
      }
    } while (s.length > 0);
  }
  return false;
};
module.exports = { enumVertices };
