import { isValidEmail, isValidPhoneNumber } from './validationServices';

export type VoucherFormData = {
  title: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  value: number;
};

export function validateVoucherForm(data: VoucherFormData): string | null {
  if (data.title === '') {
    return "Please select your title";
  }
  if (data.firstName === '') {
    return "Please enter your first name.";
  }
  if (data.lastName === '') {
    return "Please enter your last name.";
  }
  if (data.phoneNumber === '' || !isValidPhoneNumber(data.phoneNumber)) {
    return "Please enter a valid UK mobile or landline number (e.g. 07700 900123 or 020 7946 0958).";
  }
  if (data.email === '' || !isValidEmail(data.email)) {
    return "Please provide a valid email address";
  }
  if (data.value === 0) {
    return "Please select a value for your voucher";
  }
  return null;
}
