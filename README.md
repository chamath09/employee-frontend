# 👨‍💼 Employee Management System

A full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) to manage employee records efficiently. The system provides secure authentication, role-based access control, CRUD operations, and automated email notifications for key updates.

---

## 🚀 Features

- 🔐 Secure Login & Authentication (JWT-based)
- 👥 Role-based Access (Admin/HR)
- 📋 Add, View, Update, and Delete Employee Records
- 🔎 Search & Filter Employees by Name, Role, or Department
- 📧 Email Notifications for Important Events (e.g., new hires, role changes)
- 📱 Responsive UI with clean design

---

## 🛠️ Tech Stack

| Frontend        | Backend          | Database   | Others           |
|----------------|------------------|------------|------------------|
| React.js       | Node.js          | MongoDB    | JWT Authentication |
| Tailwind CSS   | Express.js       | Mongoose   | Nodemailer        |
| Axios          | RESTful API      |            | dotenv, CORS      |

---

## 🧑‍💻 Installation

### Prerequisites

- Node.js
- MongoDB (local or cloud)
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system

## Backend Setup

cd backend
npm install
# Create a .env file and add your variables
npm start

## Frontend Setup

cd frontend
npm install
npm run dev

⚙️ .env Configuration
Create a .env file in the backend directory and add the following:

MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password


📂 Project Structure

employee-management-system/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
├── frontend/
│   ├── components/
│   ├── pages/
│   └── App.jsx
│
└── README.md


🖼️ Screenshots


📌 Future Improvements
Add employee performance tracking
PDF report generation
Admin analytics dashboard
Multi-language support

📫 Contact
Developed by Chamath.
If you found this useful, feel free to connect or ⭐ the repo!
