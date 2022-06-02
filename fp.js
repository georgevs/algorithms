const pipe = (...fns) => fns.reduce((g,f) => (x) => f(g(x)));
const tap = (fn) => (x) => (fn(x), x);

const map = (fn) => (xs) => xs.map(fn);
const filter = (fn) => (xs) => xs.filter(fn);

const gmap = (fn) => function* (xs) { for (const x of xs) yield fn(x) };
const gfilter = (fn) => function* (xs) { for (const x of xs) if (fn(x)) yield x };

const imap = (fn) => (xs) => ({
  next() {
    this.it = this.it ?? xs[Symbol.iterator]();
    const { value, done } = this.it.next();
    return { value: done ? undefined : fn(value), done };
  },
  [Symbol.iterator]() { return this }
});

const ifilter = (fn) => (xs) => ({
  next() {
    this.it = this.it ?? xs[Symbol.iterator]();
    let { value, done } = this.it.next();
    while (!done) {
      if (fn(value)) { return { value, done } }
      ({ value, done } = this.it.next());
    }
    return { value: undefined, done };
  },
  [Symbol.iterator]() { return this }
});

module.exports = { pipe, tap, map, filter, gmap, gfilter, imap, ifilter };

if (require.main === module) {
  const { asserteq } = require('./asserteq');
  const add = (y) => (x) => String(x) + y;
  const even = (x) => x % 2 === 0;

  // pipe
  asserteq(['1ab','2ab','3ab'], [1,2,3].map(pipe(add('a'), add('b'))));  

  // map/filter
  asserteq(['1a','2a','3a','4a'], map(add('a'))([1,2,3,4]));
  asserteq([2,4], filter(even)([1,2,3,4]));

  // gmap/gfilter 
  asserteq(['1a','2a','3a','4a'], Array.from(gmap(add('a'))([1,2,3,4])));
  asserteq([2,4], Array.from(gfilter(even)([1,2,3,4])));

  // imap/ifilter 
  asserteq(['1a','2a','3a','4a'], Array.from(imap(add('a'))([1,2,3,4])));
  asserteq([2,4], Array.from(ifilter(even)([1,2,3,4])));
}

