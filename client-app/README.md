# 🏨 TravelHive - Hotel Booking Management System

TravelHive is a modern, full-stack hotel booking platform built with **.NET 8** and **React**. It allows users to browse hotels, search by location, view details on a map, and book rooms. It also includes a comprehensive **Admin Panel** for managing hotels and rooms.

![Project Status](https://img.shields.io/badge/Status-Development-green)
![.NET](https://img.shields.io/badge/.NET-8.0-purple)
![React](https://img.shields.io/badge/React-18-blue)

---

## 🚀 Tech Stack (තාක්ෂණික පසුබිම)

### **Backend (API)**
* **Framework:** ASP.NET Core Web API (.NET 8)
* **Database:** Microsoft SQL Server (LocalDB)
* **ORM:** Entity Framework Core (Code-First Approach)
* **Authentication:** JWT (JSON Web Tokens) with ASP.NET Core Identity
* **Architecture:** Clean Architecture Principles (Separation of concerns)
* **Documentation:** Swagger UI

### **Frontend (Client)**
* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Icons:** Lucide React
* **HTTP Client:** Axios
* **Routing:** React Router DOM

---

## 🛠️ Project Features (විශේෂාංග)

### 👤 User Side (Client)
* **Modern Hero Section:** Cinematic background with glassmorphism search bar.
* **Search Functionality:** Filter hotels by Name or City instantly.
* **Hotel Listing:** View featured hotels with ratings and pricing.
* **Hotel Details:**
    * View full description, amenities, and room availability.
    * **Google Maps Integration:** View exact hotel location on an embedded map.
    * **Booking Modal:** Pop-up booking form for reservations.
* **Authentication:** User Registration and Login using JWT.

### 🛡️ Admin Side (Dashboard)
* **Secure Login:** Admin authentication required to access the dashboard.
* **Dashboard Layout:** Sidebar navigation with protected routes.
* **Manage Hotels:**
    * Add new hotels with images and details.
    * View all hotels in a data table.
    * **Edit & Delete:** Update hotel details or remove them from the system.

---

## 🗄️ Database Details

The project uses **Microsoft SQL Server**.
* **Database Name:** `TravelHiveDb`
* **Connection String:** Defined in `appsettings.json`.

### **Main Tables:**
1.  **AspNetUsers** - Manages User Login/Register data (Identity).
2.  **Hotels** - Stores hotel details (Name, City, Description, ImageUrl, Rating).
3.  **Rooms** - Stores room details linked to Hotels (Price, Type, Availability).

---

## ⚙️ How to Run (ධාවනය කරන ආකාරය)

Follow these steps to set up the project locally.

### Prerequisites (අවශ්‍ය දේවල්)
* [.NET 8 SDK](https://dotnet.microsoft.com/download)
* [Node.js](https://nodejs.org/) (Latest LTS Version)
* [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (or Visual Studio LocalDB)

---

### 1️⃣ Backend Setup (.NET API)

1.  Navigate to the API folder:
    ```bash
    cd TravelHive/TravelHive.API
    ```
2.  Restore dependencies:
    ```bash
    dotnet restore
    ```
3.  **Database Migration (Important):**
    Since we use Code-First, you need to create the database.
    ```bash
    dotnet ef database update --project ../TravelHive.Infrastructure --startup-project .
    ```
    *(Or use Package Manager Console in Visual Studio: `Update-Database`)*

4.  Run the API:
    ```bash
    dotnet run
    ```
    *The API will start at: `https://localhost:7162` (or similar).*
    *Swagger UI: `https://localhost:7162/swagger/index.html`*

---

### 2️⃣ Frontend Setup (React)

1.  Open a new terminal and navigate to the client folder:
    ```bash
    cd TravelHive/client-app
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
    *The App will start at: `http://localhost:5173`*

---

## 🔑 API Endpoints (Backend විස්තර)

### **Authentication**
* `POST /api/Account/register` - Create a new user account.
* `POST /api/Account/login` - Login and receive JWT Token.

### **Hotels**
* `GET /api/Hotels` - Get all hotels.
* `GET /api/Hotels/{id}` - Get single hotel details.
* `POST /api/Hotels` - Add a new hotel (**Requires Auth**).
* `PUT /api/Hotels/{id}` - Update hotel details (**Requires Auth**).
* `DELETE /api/Hotels/{id}` - Remove a hotel (**Requires Auth**).

### **Rooms**
* `GET /api/Rooms/hotel/{hotelId}` - Get rooms for a specific hotel.
* `POST /api/Rooms` - Add a room to a hotel.

---

## 📸 Screenshots

*(You can add screenshots of your Home Page and Admin Dashboard here)*

---

## 👨‍💻 Author

Developed by **[Your Name]**
*A Full-Stack .NET & React Project.*