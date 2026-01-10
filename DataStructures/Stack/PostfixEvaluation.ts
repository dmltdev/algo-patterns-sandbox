"use strict";
import { Stack } from "./Stack.ts";

/* 
Postfix expression is the expression of the form "a b operator" (like ab+) => a pair of operands is followed by an operator.

Examples:
Input: str = “2 3 1 * + 9 -“
Output: -4
Explanation: If the expression is converted into an infix expression, it will be 2 + (3 * 1) – 9 = 5 – 9 = -4.

Input: str = “100 200 + 2 / 5 * 7 +”
Output: 757
*/

function postFixEvaluation(tokens: string | string[]) {
  const stack: number[] = [];

  for (const token of tokens) {
    if (!isNaN(parseInt(token))) {
      stack.push(parseInt(token));
    } else {
      const val1 = stack.pop()!;
      const val2 = stack.pop()!;
      switch (token) {
        case "+":
          stack.push(val2 + val1);
          break;
        case "-":
          stack.push(val2 - val1);
          break;
        case "/":
          stack.push(Math.trunc(val2 / val1));
          break;
        case "*":
          stack.push(val2 * val1);
          break;
      }
    }
  }

  return stack.pop()!;
}

// calling the above method
// returns 9
console.log(postFixEvaluation("235*+8-"));

// returns postfix evaluation can't be performed
console.log(postFixEvaluation("23*+"));
