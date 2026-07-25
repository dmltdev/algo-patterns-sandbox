/* 
In mathematics and computer science, currying is the technique of translating a function 
that takes multiple arguments into a sequence of families of functions, each taking a single argument. 

Currying  improves readability, enhances reusability, and increases modularity.

Currying can make code more expressive and concise by avoiding repetition and nesting of arguments.
*/

const addMyTriple = (a: number, b: number, c: number) => {
  return a + b + c;
};

const addMyTripleCurried = (a: number) => {
  return (b: number) => {
    return (c: number) => {
      return a + b + c;
    };
  };
};

const usual = addMyTriple(1, 2, 3);
const curried = addMyTripleCurried(1)(2)(3);

console.log(usual);
console.log(curried);

// Let's add numbers, but set a default value.

const addDoubleToTen = (a: number, b: number) => addMyTripleCurried(10)(a)(b);

console.log(addDoubleToTen(2, 5));
