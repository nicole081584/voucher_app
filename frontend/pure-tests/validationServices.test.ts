import { isValidEmail, isValidPhoneNumber } from "../components/validationServices";

describe("ValidationServices", () => {
  test("valid email passes", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
  });

  test("invalid email fails", () => {
    expect(isValidEmail("not-an-email")).toBe(false);
  });

  test("valid UK phone passes", () => {
    expect(isValidPhoneNumber("07700900123")).toBe(true);
  });

  test("invalid phone fails", () => {
    expect(isValidPhoneNumber("abc123")).toBe(false);
  });

  test("email with subdomain passes", () => {
  expect(isValidEmail("user@mail.example.co.uk")).toBe(true);
});

test("email with plus sign passes", () => {
  expect(isValidEmail("user+promo@example.com")).toBe(true);
});

test("email with leading/trailing spaces fails", () => {
  expect(isValidEmail(" user@example.com ")).toBe(false);
});

test("email missing @ fails", () => {
  expect(isValidEmail("userexample.com")).toBe(false);
});

test("email with multiple @ fails", () => {
  expect(isValidEmail("user@@example.com")).toBe(false);
});

});
