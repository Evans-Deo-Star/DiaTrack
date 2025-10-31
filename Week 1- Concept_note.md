# 💡 Project Concept Note: DiaTrack - Simple Diabetes Management App

**Alignment:** SDG 3: Good Health and Well-Being

## 1. User Stories (Functional Requirements)

User stories define the functionality from the end-user's perspective. These will guide your development and testing.

### User Authentication
* **AS A** new user, **I WANT TO** create an account with my email and a secure password, **SO THAT** I can access my personalized health data.
* **AS A** returning user, **I WANT TO** log in securely, **SO THAT** I can resume tracking my health.

### Data Logging (The Core Feature)
* **AS A** user, **I WANT TO** easily input my blood sugar reading (with the time and date), **SO THAT** my progress is saved instantly.
* **AS A** user, **I WANT TO** log a basic note about my diet (e.g., "high-carb breakfast"), **SO THAT** I can see how food affects my readings.
* **AS A** user, **I WANT TO** log my exercise type and duration, **SO THAT** I can see the impact of physical activity.

### Dashboard & Visualization
* **AS A** user, **I WANT TO** see a clear visual chart of my blood sugar readings over the last 7 days, **SO THAT** I can spot trends quickly.
* **AS A** user, **I WANT TO** see a simple **Risk Score** (High/Medium/Low) based on recent readings, **SO THAT** I know when I need to be extra cautious.
* **AS A** user, **I WANT TO** see my latest reading and the time it was taken, **SO THAT** I know when I last tracked my status.

---

## 2. Wireframes and UI Sketch (Week 2 Output)

*(**Action:** After this section, you should draw or digitally create the wireframes and include them here via links or image placeholders.)*

The app will have a clean, mobile-first design focusing on simplicity and large, easy-to-read data.

### A. Login / Sign-up Screen
* **Layout:** Simple form fields for email and password, plus a button to toggle between Login and Sign-up.

### B. Data Logging Form
* **Layout:** A single, focused form accessible via a prominent "+" button.
    * Input Field: Blood Sugar Value (with unit selection - mg/dL or mmol/L).
    * Optional Text Field: Diet Note.
    * Optional Text Field: Exercise/Activity Log.
    * Button: "Save Reading".

### C. Dashboard (Home Screen)
* **Layout:** Vertical scrollable content.
    * Header: Greeting (e.g., "Welcome back, [User]!").
    * **Risk Score Card:** Large display showing the High/Medium/Low status.
    * **Trend Chart:** Line chart visualizing 7-day readings.
    * **Activity Log:** List of the last 3 logged readings/activities.

---

## 3. Preliminary API Endpoint Design (Week 2 Output)

This defines how the front-end (React) will talk to the back-end (Node/Express).

| Method | Endpoint | Description | Request Body (Data Sent) | Response Body (Data Received) |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Create a new user account. | `email`, `password` | User details and a secure token. |
| **POST** | `/api/auth/login` | Log in an existing user. | `email`, `password` | User details and a secure token. |
| **POST** | `/api/readings` | Log a new blood sugar reading. | `value`, `unit`, `notes`, `activity` | Status (Success/Fail) and the saved reading object. |
| **GET** | `/api/readings/latest` | Get the last 7 days of readings. | None (requires user token) | Array of reading objects (value, timestamp). |
| **GET** | `/api/data/risk-score` | Get the calculated risk score. | None (requires user token) | JSON object: `score: 'High' / 'Medium' / 'Low'` |

---

## 4. Monetization Strategy (Week 3 Focus)

* **Model:** **Freemium**
* **Free Features (MVP):** All core tracking, logging, and the 7-day trend chart are free.
* **Premium Features (Future Goal):**
    * **Historical Reports:** Access to data older than 30 days and printable PDFs for doctor visits.
    * **Advanced Analytics:** Predictive insights (e.g., "Your sugar is likely to spike at dinner").
    * **Integration:** Sync data with third-party apps (e.g., fitness trackers).

---
