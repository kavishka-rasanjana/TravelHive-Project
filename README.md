# 🏨 TravelHive - Hotel Booking Management System

**TravelHive** is a modern, full-stack hotel booking platform built to provide a seamless experience for travelers and administrators. It features a robust **.NET 8** backend and a dynamic **React** frontend, following **Clean Architecture** principles.

![Project Status](https://img.shields.io/badge/Status-Development-green)
![.NET](https://img.shields.io/badge/.NET-8.0-purple)
![React](https://img.shields.io/badge/React-18-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-cyan)

---

## 🚀 Tech Stack

### **Backend (Server-Side)**
* **Framework:** ASP.NET Core Web API (.NET 8)
* **Database:** Microsoft SQL Server (LocalDB)
* **ORM:** Entity Framework Core (Code-First)
* **Authentication:** JWT (JSON Web Tokens) & ASP.NET Core Identity
* **Architecture:** Clean Architecture (Separation of Concerns)
* **Documentation:** Swagger UI

### **Frontend (Client-Side)**
* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Icons:** Lucide React
* **HTTP Client:** Axios
* **Routing:** React Router DOM

---

## 🛠️ Key Features

### 👤 User Features (Public)
* **Cinematic Hero Section:** Modern UI with a glassmorphism search bar and video/image backgrounds.
* **Advanced Search:** Filter hotels instantly by **Name** or **City**.
* **Interactive Maps:** View exact hotel locations via embedded **Google Maps**.
* **Room Booking:** View room availability and book rooms via a pop-up modal.
* **User Accounts:** Secure Registration and Login system.

### 🛡️ Admin Features (Dashboard)
* **Admin Dashboard:** A secured area for managing the platform.
* **Hotel Management:**
    * **Create:** Add new hotels with images, descriptions, and ratings.
    * **Read:** View all listed hotels in a structured table.
    * **Update:** Edit hotel details dynamically.
    * **Delete:** Remove hotels from the system.
* **Room Management:** (In Progress) Add and manage rooms for specific hotels.

---

## ⚙️ Installation & Setup Guide

Follow these steps to run the project locally.

### Prerequisites
Ensure you have the following installed:
* [.NET 8 SDK](https://dotnet.microsoft.com/download)
* [Node.js](https://nodejs.org/) (Latest LTS)
* [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (or Visual Studio LocalDB)

### 1️⃣ Backend Setup (.NET API)

1.  Navigate to the API directory:
    ```bash
    cd TravelHive/TravelHive.API
    ```
2.  Restore dependencies:
    ```bash
    dotnet restore
    ```
3.  **Update Database:**
    Apply the Entity Framework migrations to create the database.
    ```bash
    dotnet ef database update --project ../TravelHive.Infrastructure --startup-project .
    ```
4.  Run the API:
    ```bash
    dotnet run
    ```
    * API URL: `https://localhost:7162`
    * Swagger Docs: `https://localhost:7162/swagger/index.html`

### 2️⃣ Frontend Setup (React App)

1.  Open a new terminal and navigate to the client directory:
    ```bash
    cd TravelHive/client-app
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    * Frontend URL: `http://localhost:5173`

---

## 🔑 API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| **POST** | `/api/Account/register` | Register a new user | ❌ |
| **POST** | `/api/Account/login` | Login & Get JWT Token | ❌ |
| **GET** | `/api/Hotels` | Get all hotels | ❌ |
| **GET** | `/api/Hotels/{id}` | Get specific hotel details | ❌ |
| **POST** | `/api/Hotels` | Add a new hotel | ✅ |
| **PUT** | `/api/Hotels/{id}` | Update hotel details | ✅ |
| **DELETE** | `/api/Hotels/{id}` | Delete a hotel | ✅ |
| **GET** | `/api/Rooms/hotel/{id}` | Get rooms for a hotel | ❌ |

---

## 📂 Project Structure

```text
TravelHive-Project/
├── TravelHive.sln              # Backend Solution File
├── TravelHive.API/             # API Controllers & Setup
├── TravelHive.Application/     # DTOs & Business Logic
├── TravelHive.Domain/          # Entities (Hotel, Room, User)
├── TravelHive.Infrastructure/  # Database Context & Migrations
└── client-app/                 # React Frontend (Vite)