const dfs = ({ addVertex: fnv, addEdge: fnx }, g, s) => {
  const vs = new Set;
  const iter = (v1) => { 
    if (fnv) { fnv(v1) }
    vs.add(v1);
    g.neighbours(v1).forEach(v2 => { 
      if (fnx) { fnx(v1, v2) }
      visit(v2);
    }); 
  };
  const visit = v => { vs.has(v) || iter(v) };
  if (s !== undefined) { visit(s) }
  else { g.vertices().forEach(visit) }
};

module.exports = dfs;
