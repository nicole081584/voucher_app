# 🧪 Pure Tests Environment

This folder contains a standalone Jest test suite for validating logic and utility functions in the voucher app. It is intentionally isolated from the main Expo project to avoid runtime conflicts introduced by Expo SDK 50+ (e.g. `expo/src/winter/runtime.native.ts`).

## 🎯 Purpose

The `pure-tests` environment is designed to:

- Run unit tests for pure TypeScript functions (e.g. validation, formatting, business logic)
- Avoid Expo runtime errors that interfere with Jest
- Enable fast, reliable testing of logic without UI or native dependencies

## 📁 Structure

- `validationServices.test.ts` — tests for email and UK phone number validation
- `validateVoucherForm.test.ts` — tests for full form validation logic
- `jest.config.js` — minimal Jest config using `ts-jest` and `node` environment
- `package.json` — local test runner setup

## 🚀 How to Run

From inside the `pure-tests` folder:

```bash
npm install
npm test
