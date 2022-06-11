const queue = () => {
  const xs = [];
  const enqueue = (x) => xs.push(x);
  const dequeue = () => xs.shift();
  const isEmpty = () => xs.length === 0;
  return { enqueue, dequeue, isEmpty };
};

module.exports = queue;
