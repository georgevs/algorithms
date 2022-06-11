const sort = (g) => {
  const vs = new Set;
  const rs = [];
  const iter = (v) => {
    vs.add(v);
    g.neighbours(v).filter(v2 => !vs.has(v2)).forEach(iter);
    rs.unshift(v);
  };
  for (const v of g.vertices()) {
    if (!vs.has(v)) {
      iter(v);
    }
  }
  return rs;
};

module.exports = sort;
