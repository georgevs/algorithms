// Traveling salesman - https://youtu.be/09_LlHjoEiY?t=12012
// Related to https://leetcode.com/problems/shortest-path-visiting-all-nodes/

const travelingSalesman = (m, v1) => {
  const n = m.length;

  const iter = (si, i) => {
    const s = si & ~(1 << i);  // si\{i}
    let w = Infinity;
    for (let j = 0; j < n; ++j) {
      if (j != v1 && (s & (1 << j)) != 0) {  // s\{v1}
        w = Math.min(w, dp(s, j) + m[j][i]);
      }
    }
    return w;
  };
  
  const dp = (() => {
    const n = m.length;
    const rs = new Map;
    const set = (s, i, w) => (rs.get(s) ?? rs.set(s, new Map).get(s)).set(i, w);
    const get = (s, i) => rs.get(s)?.get(i);

    for (let i = 0; i < n; ++i) {
      if (i != v1) {
        set((1 << v1) | (1 << i), i, m[v1][i]);
      }
    }

    return (s, i) => { let w; return get(s, i) ?? (set(s, i, w = iter(s, i)), w) };
  })();

  const minRoute = () => {
    let w = Infinity;
    const s = (1 << n) - 1; // all of `n`
    for (let i = 0; i < n; ++i) {
      if (i != v1) {  // s\{v1}
        w = Math.min(w, dp(s, i) + m[i][v1]);
      }
    }
    return w;
  };

  return minRoute();
};

if (require.main === module) {
  require('./test')({ travelingSalesman });
}
