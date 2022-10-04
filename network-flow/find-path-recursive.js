const findPath = (g, s, t) => {
  // console.log(g, s, t);
  const other = ([v1, v2], v) => v1 === v ? v2 : v1;
  const iter = (v, vs, p) => {
    // console.log(v, vs, p);
    if (v === t) { return p }
    for (const e of g.outEdges(v)) {
      const u = other(e, v);
      if (!vs.has(u)) {
        const r = iter(u, new Set([...vs, u]), [...p, e]);
        if (r !== undefined) { return r }
      }
    }
  }
  return iter(s, new Set([s]), []);
};

module.exports = findPath;

if (require.main === module) {
  require('./test-find-path')(module.exports, process.argv[2]);
}
