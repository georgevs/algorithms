const logff = (log) => true ? { log, logf: (fnp, fn) => fnp ? (...args) => (log(...fnp(...args)), fn(...args)) : fn } : { log: () => void 0, logf: (_, fn) => fn };
module.exports = logff(console.log);
