
# 🎯 Voucher App Backend

This is the backend service for the Voucher App — a Node.js + Express API that handles voucher creation, storage, PDF generation, and email delivery. It connects to a local SQL database and exposes a single route for purchasing vouchers.

---

## 🚀 Features

- 🎟️ Create and store gift vouchers
- 📄 Generate PDF vouchers with dynamic content
- ✉️ Send vouchers via email as attachments
- 🔒 Input validation for phone numbers and email formats
- 🧪 Fully tested with Jest and Supertest

---

## 🧱 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** SQLite (via `sqlite3`)
- **Email:** Nodemailer
- **PDF Generation:** PDFKit
- **Testing:** Jest, Supertest

---

## 📁 Folder Structure

```
backend/
├── __tests__/              # Jest test suite for backend routes and logic
├── assets/                 # Static assets like voucher background images
├── db/                     # SQLite database file and schema
├── libraries/              # Core logic: voucher class, service manager, validation
├── routes/                 # Express route handlers (e.g. /vouchers)
├── templates/              # HTML or PDF templates (if used for email or rendering)
├── app.js                  # Express app setup (used for testing and server)
├── package-lock.json       # Auto-generated dependency lock file
├── package.json            # Project metadata and scripts
└── server.js               # Entry point for starting the server
```
Some folders like .expo/ and node_modules/ are omitted from this overview for clarity.
---

## ⚙️ Environment Setup

Create a `.env` file in the `backend/` folder with the following:

```env
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_password_or_app_password
SERVER_URL=http://localhost:3001
```

> These credentials are used by Nodemailer to send voucher emails. For Gmail, you may need to enable "App Passwords" or allow less secure apps.

---

## 🧪 Running Tests

```bash
npm test
```

Tests are written with Jest and Supertest. They cover:

- Successful voucher creation
- Failure scenarios (DB error, email failure)
- Route response codes and messages

---

## 🛠️ Development

### Install dependencies

```bash
npm install
```

### Start the server

```bash
npm run dev
```

> Starts the Express server with nodemon on port `3001`.

---

## 🔍 API Reference

### `POST /vouchers`

Creates a new voucher and sends it via email.

#### Request Body

```json
{
  "title": "Mr.",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "07700900123",
  "email": "john@example.com",
  "value": 50
}
```

#### Response

```json
{
  "status": "success",
  "data": {
    "voucherNumber": "abc123...",
    "date": "31/08/2025",
    ...
  }
}
```

---

## 🧾 Notes

- Voucher PDFs use a background image located at `assets/images/voucher_background.png`. You can host this image online and update the frontend to reference it in emails.
- The backend uses SQLite for simplicity. You can swap it out for PostgreSQL or MySQL for production.
- All validation logic is centralized in `libraries/validationServices.js` and `validateVoucherForm.js`.

---

## 📦 Deployment Tips

- Use environment variables for email credentials and server URLs
- Consider using a transactional email service (e.g. SendGrid) for production
- Add HTTPS and rate limiting for security
- Use a persistent database for production (e.g. PostgreSQL)

---

## 👩‍🔧 Author

Built by Nicole Niebel — independent developer passionate about robust, testable mobile apps and resilient backend APIs.