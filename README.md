# 📘 Subscription Tracker

A **Node.js** app to manage and track subscriptions with **email reminders** before renewal dates.  
Built using **Express**, **MongoDB**, **Upstash Workflows (QStash)**, and **Nodemailer**.

---

## 🚀 Features

- 🔐 User authentication (JWT-based)  
- 👥 Role-based access (Admin / User)  
- 📦 Add, update, and delete subscriptions  
- ⏰ Automatic renewal reminders (7, 5, 2, and 1 day before)  
- 💌 Email templates for personalized reminders  
- 🧱 Secure API with ownership checks  

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Backend** | Node.js, Express |
| **Database** | MongoDB + Mongoose |
| **Workflow** | Upstash QStash |
| **Email** | Nodemailer (SMTP) |
| **Auth** | JWT |
| **Config** | dotenv |

---

## ⚙️ Setup Guide

### 1️⃣ Prerequisites
- Node.js v16+  
- MongoDB (local or Atlas)  
- Upstash account for QStash  
- Email account with **App Password** (for Gmail or similar)

### 2️⃣ Installation
```bash
git clone https://github.com/ahsamehx/Subscription-Tracker.git
cd Subscription-Tracker
npm install
```

### 2️⃣ Environment Variables

Create a .env file in the project root:
```bash
PORT=3000
DB_URI=mongodb://localhost:27017/subscription_tracker

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d

QSTASH_TOKEN=your_upstash_token

EMAIL_ACCOUNT=youremail@example.com
EMAIL_PASSWORD=your_app_password
```

### 4️⃣ Run the Application
```bash
npm run dev
```
Now open http://localhost:3000
 to access the API 🚀
