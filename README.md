🚖 Ride Booking API

 🎯 Project Overview
The **Ride Booking API** is a secure, scalable, and role-based backend system for a ride booking platform (similar to Uber, Pathao) built with **Express.js** and **Mongoose**.  

It enables riders to request and manage rides, drivers to accept and complete them, and admins to oversee the entire system with proper authentication, authorization, and data management.

 ✨ Features
- 🔐 **JWT Authentication & Role-based Authorization** (Admin, Rider, Driver)
- 👤 **User Management**
  - Secure password hashing with bcrypt
  - Block/Unblock accounts
- 🧍 **Rider Functionalities**
  - Request a ride with pickup & destination
  - Cancel rides within allowed window
  - View ride history
- 🚗 **Driver Functionalities**
  - Accept/Reject ride requests
  - Update ride status (Picked Up → In Transit → Completed)
  - Set availability status (Online/Offline)
  - View earnings history
- 🛠 **Admin Functionalities**
  - Approve/Suspend drivers
  - View all rides, riders, and drivers
  - Manage system-level controls
- 📦 **Ride Management**
  - Full ride lifecycle with timestamps
  - Ride history logging
- 📂 **Modular Architecture** for scalability and maintainability
- ✅ **Proper API status codes** and error handling

---

 🛠 Tech Stack
- **Backend Framework:** [Express.js]
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **Password Hashing:** bcrypt
- **Validation:** Jod
- **HTTP Status Handling:** http-status-codes
- **Other:** dotenv, cors, nodemon



 📡 API Endpoints

### 🔐 Authentication (`/api/v1/auth`)
| Method | Endpoint        | Role(s) | Description |
|--------|-----------------|---------|-------------|
| POST   | `/api/v1/auth/register` | All | Register as Rider or Driver |
| POST   | `/api/v1/auth/login`    | All | Login and get JWT token |

---

🧍 Riders (`/api/v1/rides`)
| Method | Endpoint                | Role(s) | Description |
|--------|-------------------------|---------|-------------|
| POST   | `/api/v1/rides/request` | Rider   | Request a new ride |
| PATCH  | `/api/v1/rides/:id/cancel` | Rider | Cancel a ride (before driver accepts) |
| GET    | `/api/v1/rides/me`      | Rider, Driver | View own ride history |



 🚗 Drivers (`/api/v1/drivers`)
| Method | Endpoint                     | Role(s) | Description |
|--------|------------------------------|---------|-------------|
| PATCH  | `/api/v1/drivers/:id/accept` | Driver  | Accept a ride request |
| PATCH  | `/api/v1/drivers/:id/status` | Driver  | Update ride status (Picked Up → In Transit → Completed) |
| PATCH  | `/api/v1/drivers/me/availability` | Driver | Update availability (Online/Offline) |
| GET    | `/api/v1/drivers/me/earnings`     | Driver | View earnings history |



 🛠 Admins (`/api/v1/admin`)
| Method | Endpoint                        | Role(s) | Description |
|--------|---------------------------------|---------|-------------|
| GET    | `/api/v1/admin/users`           | Admin   | Get all users |
| GET    | `/api/v1/admin/rides`           | Admin   | Get all rides |
| PATCH  | `/api/v1/admin/drivers/approve/:id` | Admin | Approve a driver |
| PATCH  | `/api/v1/admin/drivers/suspend/:id` | Admin | Suspend a driver |
| PATCH  | `/api/v1/admin/users/block/:id`    | Admin | Block a user |
| PATCH  | `/api/v1/admin/users/unblock/:id`  | Admin | Unblock a user |

---

### 🌐 Root
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/`      | Welcome message `"Welcome to Ride Booking system"` |

---

✅ Status Codes & Responses

200 OK → Success response

201 Created → Resource successfully created

400 Bad Request → Invalid input/validation error

403 Forbidden → Unauthorized role access

404 Not Found → Resource not found

500 Internal Server Error → Unexpected server error





