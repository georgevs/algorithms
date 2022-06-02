const vertices = Array.from('ABCDEFGH').map(Symbol);
const [A, B, C, D, E, F, G, H] = vertices;

const dagxs = [
  [A, B, 3], [A, C, 6], 
  [B, C, 4], [B, D, 4], [B, E, 11], 
  [C, D, 8], [C, G, 11], 
  [D, E, -4], [D, F, 5], [D, G, 2], 
  [E, H, 9], 
  [F, H, 1],
  [G, H, 2]
];

module.exports = { dagxs, vertices };
