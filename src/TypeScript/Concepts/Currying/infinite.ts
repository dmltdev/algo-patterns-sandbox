const addNumber = (a: number) => {
  const inner = (b: number) => {
    return addNumber(a + b);
  };

  inner.valueOf = () => a;

  return inner;
};

const sum1 = addNumber(1);
const sum2 = addNumber(1)(2);
const sum3 = addNumber(1)(2)(3);
const sum4 = addNumber(1)(2)(3)(4);
const sum5 = addNumber(1)(2)(3)(4)(5);

console.log(sum1.valueOf());
console.log(sum2.valueOf());
console.log(sum3.valueOf());
console.log(sum4.valueOf());
console.log(sum5.valueOf());
