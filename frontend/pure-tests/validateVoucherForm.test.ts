import { validateVoucherForm } from "../components/validateVoucherForm";

const validData = {
  title: "Mr.",
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "07700900123",
  email: "john@example.com",
  value: 50,
};

test("returns null for valid data", () => {
  expect(validateVoucherForm(validData)).toBeNull();
});

test("returns error for missing title", () => {
  expect(validateVoucherForm({ ...validData, title: "" })).toBe("Please select your title");
});

test("returns error for invalid phone number", () => {
  expect(validateVoucherForm({ ...validData, phoneNumber: "abc" })).toMatch(/valid UK mobile/);
});

test("returns error for invalid email", () => {
  expect(validateVoucherForm({ ...validData, email: "not-an-email" })).toMatch(/valid email/);
});
