# 📚 LibroFlow – Modern MERN Book Management System

LibroFlow is a full-stack web application designed for seamless book catalog management. It features a professional, secure backend and a high-performance, interactive frontend built with the latest industry standards.

## ✨ Key Features

- **🔐 Secure Authentication**: JWT-based user registration and login with encrypted password storage (bcryptjs).
- **📋 Book Dashboard**: Full CRUD (Create, Read, Update, Delete) functionality for managing your book collection.
- **⚡ Reactive UI**: Smooth state management using **Redux Toolkit** for real-time updates without page reloads.
- **🎨 Glassmorphic Design**: A premium, modern interface featuring **Framer Motion** animations and a sleek glassmorphism aesthetic.
- **🛡️ Robust Backend**: Modular Route-Controller-Service architecture with global error handling and input validation.
- **📱 Responsive Layout**: Fully optimized for various screen sizes, ensuring a consistent experience across all devices.

## 🛠️ Tech Stack

**Frontend:**
- **React.js** (Vite)
- **Redux Toolkit** (State Management)
- **Framer Motion** (Animations)
- **Lucide React** (Modern Icons)
- **Vanilla CSS** (Custom Styling)

**Backend:**
- **Node.js & Express.js**
- **MongoDB & Mongoose** (Database)
- **JSON Web Token** (Authentication)
- **Express-Validator** (Input Validation)

## 🚀 Quick Start

### 1. Prerequisites
- Node.js installed
- MongoDB URI (Atlas or Local)

### 2. Backend Setup
```bash
cd backend
npm install
# Create .env with: PORT, MONGO_URI, JWT_SECRET
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
