# 🦷 DentaID - Frontend
DentAid is the frontend of a full-stack dental appointment management system. It enables patients to schedule appointments with dentists, dentists to manage their schedules and view patient details, and administrators to oversee users and appointments. Administrators have full access to all system functionalities, including user management, appointment control, and schedule configuration.

## 🛠️ Technologies Used

- **React** – Frontend library for building the UI.

- **Redux** State management for a predictable application flow.

- **Material-UI (MUI)** Pre-built and customizable UI components.

- **Tailwind CSS** Utility-first CSS framework for styling.

- **React Router** Client-side routing for seamless navigation.

- **Axios** Handles HTTP requests to the backend API.

- **Vite** Fast build tool for development and production.

- **Framer Motion** Smooth animations and transitions.

- **SweetAlert2** Elegant and responsive alert modals.

- **Yup** Schema validation for form handling.

## 📂 Project Structure

```
  └── 📁src
  ├── 📁api # API configuration and Axios instance
  ├── 📁auth # Authentication-related components and pages
  ├── 📁context # React context for form state management
  ├── 📁dentaid # Main application components and pages
  │ ├── 📁components # Reusable components (e.g., appointments, schedules, user details)
  │ ├── 📁layout # Layout components (e.g., main layout, navbar)
  │ ├── 📁pages # Application pages (e.g., dashboard, appointments, user management)
  │ └── 📁router # Router for DentaID pages
  ├── 📁helpers # Utility functions and helpers (e.g., date formatting, validation)
  ├── 📁hooks # Custom React hooks (e.g., state management, logic)
  ├── 📁routes # Main application router
  ├── 📁store # Redux store configuration and slices
  ├── DentAidApp.jsx # Main application component
  └── main.jsx # Entry point of the application
```

## 🚀 Installation

Follow these steps to set up and run the project:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/MaiGdev/dent_aid.git
cd dentaid-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

### 4️⃣ Start the Development Server

```bash
npm run dev
```
---

## 🌐 Key Features

🏥 Patients

✅ Register & Login – Secure authentication via JWT.✅ Book Appointments – Select available dates and time slots.✅ View Appointments – See upcoming and past appointments.

🦷 Dentists

✅ Manage Schedules – Set working hours, breaks, and appointment durations.✅ View Patient Details – Access medical conditions and allergies.✅ View Appointments – See scheduled appointments.

🏢 Administrators

✅ Manage Users – Create, update, and delete users (patients, dentists, admins).✅ View All Appointments – Access all appointments in the system.

## 🌐 API Endpoints Consumed

### Authentication

```
POST /api/auth/login – User login.

POST /api/auth/register – User registration.

POST /api/auth/renew – Renew JWS Token.
```

### Appointments

```
GET /api/appointments – Get all appointments.

GET /api/appointments/patient/:id – Get appointments for a specific patient.

GET /api/appointments/dentist/:id – Get appointments for a specific dentist.

POST /api/appointments – Create a new appointment.
```

### Schedules

```
GET /api/schedule – Get a dentist's schedule.

GET /api/schedule/availableSlots – Get available time slots for a dentist.

POST /api/schedule – Create a new schedule.

PUT /api/schedule – Update a dentist's schedule.
```

### Users

```
PUT /api/user – Update users information.

GET /api/getUser – Get user by type (patient, dentist, admin).

PUT /api/user/dentist – Update dentist-specific information.

PUT /api/user/patient – Update patient-specific information.
```

## 🎨 UI Components

Material-UI – Pre-built components for a modern design.

SweetAlert2 – Beautiful alerts for user interactions.

Tailwind CSS – Utility-first CSS for styling.

Framer Motion – Smooth animations and transitions.

## 🛠️ Redux Store

### Slices
```
AuthSlice – Manages authentication state (login, logout, token validation).
```
```
UserSlice – Manages user data (patients, dentists, admins).
```
```
ScheduleSlice – Manages dentist schedules and available slots.
```
```
AppointmentSlice – Manages appointment data and state.
```