
---

```markdown
# 🎟️ Voucher App Frontend

This is the mobile frontend for the Voucher App, built with **React Native (Expo)** and **TypeScript**. It allows users to purchase gift vouchers, view them with a QR code, and download them as PDFs for sharing or printing.

---

## ✨ Features

- 📱 Mobile-friendly voucher purchase flow
- 🔍 Input validation (email and UK phone number formats)
- 🎟️ Dynamic voucher display with QR code
- 📄 PDF voucher generation and sharing
- 🔁 State-driven UI transitions (order → display → reset)
- 🧪 Isolated logic tests using Jest

---

## 🧱 Tech Stack

- **Framework:** React Native (Expo)
- **Language:** TypeScript
- **UI:** Custom themed components (`ThemedText`, `ThemedView`, etc.)
- **PDF & Sharing:** `expo-print`, `expo-sharing`
- **QR Code:** `react-native-qrcode-svg`
- **Validation:** Custom logic via `validateVoucherForm`
- **Testing:** Jest (with isolated logic tests in `pure-tests/`)

---

## 📁 Folder Structure

```bash
frontend/
├── app/                    # App routing and screens
│   └── index.tsx
├── assets/                 # Images and static assets
├── components/             # Reusable UI and logic components
├── constants/              # Static data (e.g. emptyVoucher)
├── hooks/                  # Custom React hooks
├── pure-tests/             # Isolated Jest test suite for logic
├── scripts/                # Utility scripts (if any)
├── app.config.ts           # Expo app configuration
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Dependency lock file
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```
Some folders like .expo/ and node_modules/ are omitted from this overview for clarity.
---

## ⚙️ Environment Setup

Create a `.env` file in the `frontend/` folder with:

```env
API_BASE=http://localhost:3001
```

> If you're testing on a physical device, replace `localhost` with your machine’s local IP address (e.g. `http://192.168.x.x:3001`).

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the Expo server

```bash
npx expo start
```

> Scan the QR code with Expo Go or launch in an emulator.

---

## 🧪 Running Tests

Logic tests are isolated in the `pure-tests/` folder to avoid Expo runtime conflicts.

```bash
cd pure-tests
npm install
npm test
```

> These tests cover validation logic and voucher form behavior.

---

## 🖼️ Notes

- In `components/createVoucherDownload.ts`, line 34 references a background image. You can replace the placeholder URL with a hosted version of `voucher_background.png` from `assets/images` to ensure it loads correctly in emails.
- The frontend uses Expo’s safe area and scroll views for responsive layout.
- All voucher logic is centralized in `VouchersScreen`, with clean separation of validation, submission, and download.

---

## 🔐 Security & Validation

- Email and phone number formats are validated before submission
- Invalid inputs trigger alerts and prevent API calls
- QR code is generated from the voucher number and embedded in the PDF

---

## 📦 Deployment Tips

- Use `.env.production` for staging or live environments
- Host static assets (e.g. voucher background) on a CDN for email compatibility
- Consider integrating push notifications for voucher delivery confirmation

---

## 👩‍🔧 Author

Built by Nicole Niebel — independent developer passionate about robust, testable mobile apps and resilient backend APIs.

