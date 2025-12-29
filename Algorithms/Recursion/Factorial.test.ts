import Factorial from "./Factorial";

describe("Factorial", () => {
  it("calculates factorial of 1", () => {
    expect(Factorial(1)).toBe(1);
  });

  it("calculates factorial of 5", () => {
    expect(Factorial(5)).toBe(120);
  });

  it("calculates factorial of 0", () => {
    expect(Factorial(0)).toBe(1);
  });

  it("handles negative numbers", () => {
    expect(() => Factorial(-1)).toThrow(); 
  });

  it("calculates factorial of 10", () => {
    expect(Factorial(10)).toBe(3628800);
  });

  it("tests large number", () => {
    expect(Factorial(20)).toBe(2432902008176640000);
  });

  it("throws error for non-integer input", () => {
    expect(() => Factorial(5.5)).toThrow();
  });
});
