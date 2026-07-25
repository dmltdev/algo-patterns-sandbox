import { describe, it, expect } from "vitest";
import { factorial } from "./Factorial";

describe("factorial", () => {
  it("calculates factorial of 1", () => {
    expect(factorial(1)).toBe(1);
  });

  it("calculates factorial of 5", () => {
    expect(factorial(5)).toBe(120);
  });

  it("calculates factorial of 0", () => {
    expect(factorial(0)).toBe(1);
  });

  it("handles negative numbers", () => {
    expect(() => factorial(-1)).toThrow(); 
  });

  it("calculates factorial of 10", () => {
    expect(factorial(10)).toBe(3628800);
  });

  it("tests large number", () => {
    expect(factorial(20)).toBe(2432902008176640000);
  });

  it("throws error for non-integer input", () => {
    expect(() => factorial(5.5)).toThrow();
  });
});
