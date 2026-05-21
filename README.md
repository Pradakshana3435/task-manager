# Task Manager App

A full-stack Task Manager web application built using FastAPI, SQLite, JWT Authentication, HTML, CSS, and JavaScript.

---

## Features

- User Registration
- User Login
- JWT Authentication
- Password Hashing
- Create Tasks
- View Tasks
- Complete Tasks
- Delete Tasks
- User-specific Tasks
- Interactive Frontend UI
- Notifications & Validation

---

## Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication
- Passlib (bcrypt)

### Frontend
- HTML
- CSS
- JavaScript

---

## Project Structure

task-manager/
│
├── backend/
│ ├── app/
│ │ ├── auth/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── schemas/
│ │ ├── database.py
│ │ └── main.py
│
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── script.js
│
├── requirements.txt
├── .env.example
├── .gitignore
└── README.md

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/Pradakshana3435/task-manager.git
```

### 2. Navigate Into Project

```bash
cd task-manager
```

### 3. Create Virtual Environment

```bash
python -m venv venv
```

### 4. Activate Virtual Environment

#### Windows

```bash
venv\Scripts\activate
```

### 5. Install Dependencies

```bash
pip install -r requirements.txt
```

### 6. Create .env File

Create a `.env` file and add:

```env
SECRET_KEY=your_secret_key_here
```

### 7. Run FastAPI Server

```bash
uvicorn backend.app.main:app --reload
```

---

## API Documentation

Swagger Docs:

```text
http://127.0.0.1:8000/docs
```

---

## Frontend

Open:

```text
frontend/index.html
```

in browser.

---

## GitHub Repository

https://github.com/Pradakshana3435/task-manager
