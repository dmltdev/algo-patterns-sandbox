/*
Luhn algorithm is a simple checksum formula used to 
validate a variety of identification numbers, such as credit card numbers, 
IMEI numbers, National Provider Identifier numbers in the US, Canadian Social Insurance Numbers, 
Israeli ID Numbers, South African ID Numbers, Greek Social Security Numbers (ΑΜΚΑ), and Greek VAT numbers (ΑΦΜ).
The algorithm is in the public domain and is in wide use today.

How to validate a Credit Card Number? https://www.freeformatter.com/credit-card-number-generator-validator.html
Most credit card number can be validated using the Luhn algorithm, which is more or a less a glorified Modulo 10 formula!

The Luhn Formula:
-- Drop the last digit from the number. The last digit is what we want to check against
-- Reverse the numbers
-- Multiply the digits in odd positions (1, 3, 5, etc.) by 2 and subtract 9 to all any result higher than 9
-- Add all the numbers together
-- The check digit (the last number of the card) is the amount that you would need to add to get a multiple of 10 (Modulo 10)
*/

export default function validateCreditCard(input: string | number): boolean {
  if (typeof input !== "string") {
    input = input.toString();
  }
  if (input.length < 13 || input.length > 19) return false;
  if (input.match(/[^0-9]/g)) return false;

  input = input.replace(/[\s-]/g, "");

  let creditCard: number[] = input.split("").map(Number);

  for (let i = creditCard.length - 2; i >= 0; i = i - 2) {
    let tempValue = creditCard[i];
    tempValue *= 2;
    if (tempValue > 9) {
      tempValue = (tempValue % 10) + 1;
    }
    creditCard[i] = tempValue;
  }

  let total = 0;

  for (let i = 0; i < creditCard.length; i++) {
    total += creditCard[i];
  }

  return total % 10 === 0;
}

console.log(validateCreditCard(4532778771091795));
