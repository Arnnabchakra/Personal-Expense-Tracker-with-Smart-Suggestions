# 💸 Personal Expense Tracker with Smart Suggestions

A **full-stack web application** to track income and expenses with a clean dashboard and smart rule-based suggestions. Built using modern technologies like React, FastAPI, and PostgreSQL.

---

## 🚀 Tech Stack

* **Frontend:** React (Vite)
* **Backend:** FastAPI
* **Database:** PostgreSQL
* **Authentication:** JWT (JSON Web Token)
* **API Docs:** Swagger UI (FastAPI built-in)

---

## ✨ Features

### 🔐 Authentication

* User Signup
* User Login (JWT-based authentication)
* Secure password hashing

### 📊 Dashboard

* Total Income
* Total Expense
* Balance calculation
* User profile (top-right with avatar)

### 💰 Transactions

* Add income / expense
* View all transactions
* Delete transactions

### 🧠 Smart Suggestions

* Rule-based spending insights
* Helps users control unnecessary expenses

---

## 📁 Project Structure

```
expense-tracker/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── auth.py
│   │   └── routes.py
│   ├── requirements.txt
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── assets/
    │   │   └── default-avatar.png
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── SummaryCard.jsx
    │   │   ├── ProfileBox.jsx
    │   │   ├── TransactionForm.jsx
    │   │   └── TransactionList.jsx
    │   ├── pages/
    │   │   ├── Signup.jsx
    │   │   ├── Login.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── Transactions.jsx
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    └── package.json
```

📌 This structure separates **frontend and backend**, making the project scalable and easy to understand. 

---

## ⚙️ Setup Instructions

### 🔹 1. Clone Repository

```bash
git clone https://github.com/your-username/personal-expense-tracker.git
cd personal-expense-tracker
```

---

### 🔹 2. Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env` file:

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/expense_tracker
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

Run backend:

```bash
uvicorn app.main:app --reload
```

Open API Docs:

```
http://127.0.0.1:8000/docs
```

---

### 🔹 3. Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 🧪 How to Test

1. Signup new user
2. Login
3. Add income and expenses
4. View transactions
5. Delete transactions
6. Click **AI Suggestion** button

---

## 💼 Project Explanation (Interview Ready)

> I built a full-stack Personal Expense Tracker using React, FastAPI, and PostgreSQL. The application allows users to securely sign up and log in using JWT authentication, manage income and expenses, and view a real-time dashboard with total income, expense, and balance. I also implemented a rule-based suggestion system that provides spending insights based on transaction history. FastAPI was used for efficient backend API development with Swagger documentation, and PostgreSQL ensures structured and reliable data storage.

---

## 🔮 Future Improvements

* Edit transactions
* Category dropdown
* Charts & analytics 📊
* Monthly reports
* Budget alerts
* Real AI integration (OpenAI API)

---

## Screenshots

### Signup Page
<img src="Login Page.png" alt="Login Page" width="800"/>

### Dashboard
<img src="Dashboard.png" alt="Dashboard" width="800"/>

### Client Management
<img src="Client Management.png" alt="Client Management" width="800"/>

### Project Management
<img src="Project Management.png" alt="Project Management" width="800"/>

### Task Management
<img src="Task Management.png" alt="Task Management" width="800"/>

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
