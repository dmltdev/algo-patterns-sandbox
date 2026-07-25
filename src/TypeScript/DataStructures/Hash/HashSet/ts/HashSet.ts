/* 
Hash set is an implementation of a set - a collection of unique keys. 

- has dynamic size
- is unordered: the order in which elements are added may not be the same as the order in which they are iterated
- has these operations: add, remove, lookup, iterate
- stores keys with boolean values: values associated with the keys are not stored
- does not allow duplicate keys
- fast lookup of O(1) time
- handles key collisions
- uses a hashing function to map keys to indices in the underlying data structure, typically an array

*/

export type Input = string | number | symbol;

export type Set = {
  [key: Input]: boolean;
};

export function createHashSet() {
  let hashSet: Set = {};

  return {
    add(key: Input) {
      hashSet[key] = true;
    },

    remove(key: Input) {
      delete hashSet[key];
    },

    has(key: Input): boolean {
      return hashSet.hasOwnProperty(key);
    },

    clear() {
      hashSet = {};
    },

    iterator() {
      let i = 0;
      const keys = Object.keys(hashSet);
      const range = keys.length;

      const setIterator = {
        next() {
          if (i < range) {
            const result = { value: keys[i], done: false };
            i++;
            return result;
          }
          return { value: Object.keys(hashSet)[i], done: true };
        },
        reset() {
          i = 0;
        },
      };

      return setIterator;
    },
  };
}
