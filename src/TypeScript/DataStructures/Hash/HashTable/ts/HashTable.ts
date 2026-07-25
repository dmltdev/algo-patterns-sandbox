type Key = string;
type Value = string | number;

export function createHashTable() {
  let table: Array<Array<[Key, Value]>> = new Array(127);
  let size: number = 0;

  return {
    hash(key: Key): number {
      let hash = 0;
      for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i);
      }
      return hash % table.length;
    },

    set(key: Key, value: Value) {
      const index = this.hash(key);
      if (table[index]) {
        for (let i = 0; i < table[index]!.length; i++) {
          if (table[index]![i][0] === key) {
            table[index]![i][1] = value;
            return;
          }
        }
        table[index]!.push([key, value]);
      } else {
        table[index] = [];
        table[index]!.push([key, value]);
      }
      size++;
    },

    get(key: Key): Value | undefined {
      const index = this.hash(key);
      if (table[index]) {
        for (let i = 0; i < table.length; i++) {
          if (table[index]![i][0] === key) {
            return table[index]![i][1];
          }
        }
      }
      return undefined;
    },

    getSize(): number {
      return size;
    },

    remove(key: Key): boolean {
      const index = this.hash(key);

      if (table[index] && table[index]!.length) {
        for (let i = 0; i < table.length; i++) {
          if (table[index]![i][0] === key) {
            table[index]!.splice(i, 1);
            size--;
            return true;
          }
        }
      }

      return false;
    },

    display() {
      table.forEach((values, index) => {
        if (values && values.length > 0) {
          const chainedValues = values.map(
            ([key, value]) => `[ ${key}: ${value} ]`
          );
          console.log(`${index}: ${chainedValues.join(" -> ")}`);
        } else {
          console.log(`${index}: empty`);
        }
      });
    },
  };
}

const ht = createHashTable();
ht.set("apple", 50);
ht.set("banana", 30);
ht.set("orange", 70);

ht.display();
