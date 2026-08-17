# 🎓 College Event Management Portal

A full-stack web application for managing college events, registrations, organizers, students, and event attendance.

The platform allows students to discover and register for events, while organizers and administrators can create, manage, and monitor events and registrations.

## 🚀 Live Demo

### 🌐 Frontend

[College Event Management Portal](https://college-event-management-portal-gules.vercel.app)

### ⚙️ Backend API

[Backend API](https://college-event-management-portal-sqtn.onrender.com)

---

## ✨ Features

### 👨‍🎓 Student

* User registration and login
* JWT-based authentication
* Browse published college events
* Search and filter events
* View complete event details
* Register for events
* Cancel event registration
* View personal registrations
* Track attendance status
* Responsive interface for mobile and desktop

### 👨‍💼 Organizer

* Create events
* Edit own events
* Delete own events
* View events created by the organizer
* View event registrations
* Manage participant attendance
* Event capacity management
* Registration deadline management

### 🛡️ Admin

* Admin authentication
* Manage events
* Edit and delete events
* View event registrations
* Manage attendance
* Access administrative functionality
* Role-based authorization

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* CSS3
* Responsive Design

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Joi Validation
* REST API

### Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas
* **Version Control:** Git & GitHub

---

## 🏗️ Project Architecture

```text
College Event Management Portal
│
├── client
│   ├── React
│   ├── React Router
│   ├── Axios
│   └── CSS
│
├── server
│   ├── Node.js
│   ├── Express.js
│   ├── Controllers
│   ├── Routes
│   ├── Models
│   ├── Middleware
│   └── Validators
│
└── Database
    └── MongoDB Atlas
```

---

## 🔐 Authentication & Authorization

The application uses **JWT-based authentication**.

Different roles have different permissions:

| Role      | Permissions                                 |
| --------- | ------------------------------------------- |
| Student   | Browse and register for events              |
| Organizer | Create and manage own events                |
| Admin     | Manage events and administrative operations |

Protected API routes require a valid JWT token.

---

## 📋 Event Management

Each event can contain:

* Event title
* Description
* Category
* Venue
* Event date
* Registration deadline
* Maximum participants
* Banner
* Organizer
* Event status

The system validates:

* Event date
* Registration deadline
* Event capacity
* Duplicate registrations
* Registration status
* Organizer ownership

---

## 📝 Registration System

Students can:

1. Browse available events
2. Open event details
3. Register for an event
4. View their registrations
5. Cancel registration before the event
6. Check attendance status

The system prevents duplicate active registrations and checks event capacity before accepting new registrations.

---

## 📊 Attendance Management

Organizers and admins can mark registered students as:

* ✅ Present
* ❌ Absent
* ⏳ Not Marked

Students can view their attendance status from **My Registrations**.

---

## 🔎 Event Discovery

Students can explore events using:

* Event categories
* Search
* Event details
* Event dates
* Venue information
* Registration availability

---

## 📱 Responsive Design

The application is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📱 Tablet

---

## ⚙️ Environment Variables

Create a `.env` file in the backend:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Never commit `.env` files or secret credentials to GitHub.

---

## 💻 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/ayushkumar0808/college-event-management-portal.git
cd college-event-management-portal
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create your `.env` file and add the required environment variables.

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The frontend will run on the local development URL provided by Vite.

---

## 🔄 Deployment

The project is deployed using:

```text
GitHub
   │
   ├── Frontend → Vercel
   │
   └── Backend → Render
                    │
                    ↓
              MongoDB Atlas
```

Both frontend and backend are connected to GitHub for automatic deployments after pushing new changes.

---

## 🧪 Testing

The application has been tested for:

* User authentication
* Role-based authorization
* Event creation
* Event editing
* Event deletion
* Event registration
* Registration cancellation
* Duplicate registration prevention
* Event capacity
* Attendance management
* MongoDB Atlas connectivity
* Production API connectivity
* Responsive UI

---

## 🔒 Security

Security considerations implemented in the project include:

* JWT authentication
* Protected routes
* Role-based authorization
* Password protection
* Request validation
* Environment variables for secrets
* Organizer ownership checks
* Registration validation

---

## 📂 Main Backend Structure

```text
server/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── validators/
├── config/
├── server.js
└── package.json
```

---

## 📂 Main Frontend Structure

```text
client/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   ├── styles/
│   └── App.jsx
│
└── package.json
```

---

## 🎯 Future Improvements

Possible future enhancements:

* Event notifications
* Email notifications
* QR-based attendance
* Event certificates
* Calendar integration
* Event image upload improvements
* Advanced admin analytics
* Pagination improvements
* PWA support
* Search optimization

---

## 👨‍💻 Developer

**Ayush Kumar**

MCA Student | Full-Stack Developer

Interested in:

* MERN Stack
* JavaScript
* React
* Node.js
* MongoDB
* Data Structures & Algorithms

---

## ⭐ Project

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

### 📌 Project Status

**🟢 Live & Production Deployed**
