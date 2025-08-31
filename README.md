# Voucher App 🎟️

A full-stack app where users can purchase vouchers via a **React Native (Expo) mobile frontend** and a **Node.js/Express backend**.  
The frontend handles voucher purchase flow, PDF generation and download to device.
The backend handles voucher persistence in a database, PDF generation and email delivery.

---

## Features
- 🔑 input validation (email and phone number format checks)
- 🎟️ Voucher purchase flow
- 💾 Voucher storage in SQL database
- 📄 PDF voucher generation
- ✉️ Email confirmations (with attachment)

---

## Tech Stack
**Frontend:** React Native (Expo), TypeScript  
**Backend:** Node.js, Express, SQL, Nodemailer  
**Testing:** Jest, React Testing Library  
**Other:** GitHub Actions (CI), Expo Go for demo

---

## Setup

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/voucher-app.git
cd voucher-app
```

### 2. Configure environment variables

#### 🔧 Backend (`voucher-app/backend`)
Create a `.env` file in the backend folder with the following:

```env
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_password_or_app_password
SERVER_URL=http://localhost:3001
```

> These credentials are used for sending voucher emails via Nodemailer. You may need to enable "less secure apps" or generate an app password depending on your email provider.

#### 🔧 Frontend (`voucher-app/frontend`)
Create a `.env` file in the frontend folder with:

```env
API_BASE=http://localhost:3001
```

> If you're testing on a physical device, replace `localhost` with your machine’s local IP address (e.g. `http://192.168.x.x:3001`).

---

### 3. Install dependencies

#### 📦 Backend
```bash
cd backend
npm install
```

#### 📦 Frontend
```bash
cd frontend
npm install
```

---

### 4. Start the app

#### 🚀 Backend
```bash
npm run dev
```

> Starts the Express server with nodemon on port `3001`.

#### 🚀 Frontend
```bash
npx expo start
```

> Launches the Expo development server. You can open the app in Expo Go or an emulator.

---

## Notes

- 🖼️ In `frontend/components/createVoucherDownload.ts`, line 34 references a background image. You can replace the placeholder URL with a hosted version of `voucher_background.png` from `assets/images` to ensure it loads correctly in emails.
- 🧪 Tests are written using Jest and can be run with `npm test` in both frontend and backend folders.
- 🧱 The backend uses SQLite for local development. You can swap this out for PostgreSQL or MySQL for production.
- 📬 Email delivery uses SMTP. For production, consider using a transactional email service like SendGrid or Mailgun.
- 🔐 Never commit your `.env` files — they contain sensitive credentials.

---

## Coming Soon

- 🧾 Voucher redemption flow
- 📊 Admin dashboard for voucher tracking

---
## 👩‍🔧 Author

Built by Nicole Niebel — independent developer passionate about robust, testable mobile apps and resilient backend APIs.