# ⚡ DiaTrack: Simple Diabetes Management App

**Power Learn Project - SDG Project Building**

## 🎯 Project Goal & SDG Alignment

This project aims to address **SDG 3: Good Health and Well-Being** by providing a digital solution for managing chronic diseases.

### Problem Statement
Many individuals managing chronic conditions like Type 2 Diabetes rely on manual paper logbooks or disparate apps, leading to inconsistent tracking and difficulty identifying trends. This lack of clear, consolidated data hinders proactive self-management and effective doctor consultations.

### Solution (Core Value Proposition)
**DiaTrack** is an easy-to-use digital logbook that simplifies the tracking of critical health metrics (blood sugar, diet, and exercise). It generates **visual trends and a simple risk score** to help users proactively manage their condition and share actionable data with their healthcare providers.

---

## 🛠️ Technical Stack

This application is built using a modern full-stack architecture, focusing on the following core technologies:

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Front-End** | **React** | Interactive user interface and data visualization. |
| **Styling** | **Tailwind CSS / Bootstrap** | Responsive design and consistent styling. |
| **Back-End** | **Node.js (Express)** | RESTful API creation and server-side logic. |
| **Database** | **MongoDB** | Flexible NoSQL database for storing user profiles and time-series health readings. |
| **AI/Logic** | Custom Python/JS Logic | Simple risk assessment and trend analysis. |
| **Deployment** | Heroku / Vercel / Firebase | Cloud deployment for accessibility. |

---

## ✨ Key Features (Minimum Viable Product - MVP)

The initial version of DiaTrack will include the following functionality:

* **User Authentication:** Secure sign-up and log-in functionality.
* **Data Logging:** Simple, intuitive forms for recording:
    * Blood Sugar Readings (date, time, value)
    * Basic Diet Logs
    * Exercise/Activity Logs
* **Dashboard:** A personalized home screen showing:
    * Latest reading summary.
    * **Trend Visualization:** Simple line chart of blood sugar readings over the last 7 days.
    * **Simple Risk Score:** A quick calculation based on recent high readings.

---

## ⚙️ Setup and Installation Guide

To run this project locally, follow these steps:

### 1. Prerequisites

You must have the following installed on your machine:
* Node.js (LTS version)
* npm (or yarn)
* MongoDB (or a connection string to a cloud cluster like MongoDB Atlas)

### 2. Backend Setup (`backend/` folder)

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend/` directory with your environment variables (e.g., database connection string, port):
    ```
    PORT=5000
    MONGODB_URI=<Your MongoDB Connection String>
    # Other secrets (e.g., JWT_SECRET for authentication)
    ```
4.  Start the server:
    ```bash
    npm start
    ```

### 3. Frontend Setup (`frontend/` folder)

1.  Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the client application:
    ```bash
    npm start
    ```

The application should now be running locally, typically accessible at `http://localhost:3000`.

---

## 📈 Development Timeline (Power Learn Project Phases)

This project follows the structured 12-week development plan:

| Week Focus | Key Tasks Completed |
| :--- | :--- |
| **Week 1** | Project Scope, GitHub Setup, Initial Documentation. |
| **Week 2** | Wireframes, Problem Discovery, Initial API Setup. |
| **Week 3** | Concept Note Finalized, **Front-End Development** (Static UI). |
| **Week 4** | **Core Logic & Basic AI** (Risk Score logic) Integration. |
| **Week 5** | **Full Backend** (User Auth, CRUD operations) and Database Setup. |
| **Week 6** | Refine AI Models, **MVP Preparation**. |
| **Week 7** | Deploy MVP, Initial User Testing. |
| **Week 8** | Testing & Refinement (UX/UI improvements). |
| **Week 9-12** | Launch, Monitoring, Final Demo & Presentation. |
