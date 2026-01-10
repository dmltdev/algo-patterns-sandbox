import Chance from "chance";
import { describe, test, expect } from "vitest";

import validateCreditCard from "./Luhn.ts";

describe("Luhn algorithm", () => {
  const chance = new Chance();
  const visaCard = chance.cc({ type: "visa" });
  const mastercardCard = chance.cc({ type: "mc" });
  const amexCard = chance.cc({ type: "amex" });
  const visaElectronCard = chance.cc({ type: "electron" });

  test("handles odd-length card numbers correctly", () => {
    const oddLengthCard = "123456789012345"; // 15 digits
    expect(validateCreditCard(oddLengthCard)).toBeFalsy();
  });

  test("validates correct credit card number", () => {
    expect(validateCreditCard(visaCard)).toBeTruthy();
    expect(validateCreditCard(mastercardCard)).toBeTruthy();
    expect(validateCreditCard(amexCard)).toBeTruthy();
    expect(validateCreditCard(visaElectronCard)).toBeTruthy();
  });

  test("rejects invalid credit card number", () => {
    const invalidVisa = 4123456789012345;
    const invalidMastercard = 5123456789012345;
    expect(validateCreditCard(invalidVisa)).toBeFalsy();
    expect(validateCreditCard(invalidMastercard)).toBeFalsy();
  });

  test("handles non-standard input (such as spaces or dashes)", () => {
    let cardNumber = visaCard.split("-").join("");
    expect(validateCreditCard(cardNumber)).toBeTruthy();
    cardNumber = mastercardCard.split(" ").join("");
    expect(validateCreditCard(cardNumber)).toBeTruthy();
    cardNumber = amexCard.split("- ").join("");
    expect(validateCreditCard(cardNumber)).toBeTruthy();
  });

  test("rejects empty string", () => {
    expect(validateCreditCard("")).toBeFalsy();
  });

  test("rejects non-numeric characters", () => {
    expect(validateCreditCard("abcd")).toBeFalsy();
    expect(validateCreditCard("credit card number")).toBeFalsy();
  });

  test("rejects too short and too long numbers", () => {
    expect(validateCreditCard("123")).toBeFalsy();
    expect(validateCreditCard("12345678901234567890")).toBeFalsy();
    expect(validateCreditCard("123456789012")).toBeFalsy();
    expect(validateCreditCard("123456789012345678901")).toBeFalsy();
  });
});
