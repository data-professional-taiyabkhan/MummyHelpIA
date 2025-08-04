# MummyHelp App: Flow and Features

This document outlines the user flows, key features, and a phase-wise development plan for the **MummyHelp** mobile application, an emergency-alert system for children and parents. It’s designed as a clear, implementation-independent blueprint focusing on app behavior and incremental delivery.

---

## 1. Goals and Principles

* **Instant, Voice-Triggered Alerts:** Let children call for help hands-free with a simple wake-phrase.
* **False-Alarm Mitigation:** Use confirmation prompts and escalation rules to reduce accidental alerts.
* **Parental Peace of Mind:** Deliver timely notifications, show up-to-date location, and maintain a history of alerts.

---

## 2. Project Structure

Organize the codebase into two main folders:

```
root/
├── backend/    # API server, database integration, business logic
└── frontend/   # Mobile app, UI flows, notification handling
```

---

## 3. Phase-Wise Development Plan

Break down implementation into three incremental phases:

### Phase 1: Authentication

**Objective:** Establish user registration and login flows with role selection.

**Backend (********`backend/`****\*\*\*\*\*\*\*\*):**

* Create `/signup` and `/signin` API endpoints.
* Accept `role` parameter (`mother` or `child`) during signup.
* Store users with unique IDs and roles in the database.
* Return authentication tokens on successful login.

**Frontend (********`frontend/`****\*\*\*\*\*\*\*\*):**

* Build registration screen with fields: email, password, role selector.
* Build login screen with email and password.
* Persist authentication token locally for API calls.

**Deliverables:**

* Working signup/login screens.
* Secure storage of user credentials/tokens.

**Post-Backend Deployment:**

* Upload the `backend/` folder to a new GitHub repository.
* Configure a Render service connected to that repository.
* Deploy the backend API and obtain the public server URL.
* Share the deployed server link for frontend integration.

---

### Phase 2: Pairing

**Objective:** Enable linking of a mother and child account.

**Backend (********`backend/`****\*\*\*\*\*\*\*\*):**

* Create `/pair` endpoint:

  * Accepts `motherId` and `childCode`.
  * Generates a unique pairing code for a child upon signup or via `/pair-code` endpoint.
  * Stores pairing relationships in the database.
* Create `/pair/code` endpoint for children to retrieve their pairing code.
* Enforce role-based access: only children can generate codes; only mothers can submit pairing.

**Frontend (********`frontend/`****\*\*\*\*\*\*\*\*):**

* Child app: screen to display the unique pairing code.
* Mother app: screen to enter/sc ana pairing code to link accounts.
* Confirmation UI on successful pairing.

**Deliverables:**

* Pairing code generation and retrieval.
* Pairing submission flow and confirmation.

---

### Phase 3: Alerts & Real-Time Features

**Objective:** Add voice-triggered alerts, location capture, and push notifications.

**Backend (********`backend/`****\*\*\*\*\*\*\*\*):**

* Create `/alerts` endpoint to record soft and emergency alerts.
* Create `/locations` endpoint to store timestamped coordinates.
* Integrate push notification service to dispatch to paired mothers.
* Implement real-time data delivery (e.g., via WebSockets) for live location updates.

**Frontend (********`frontend/`****\*\*\*\*\*\*\*\*):**

* Child app:

  * Background wake-phrase listener.
  * Confirmation prompt (send or cancel).
  * Auto-escalation after repeated detections.
  * API calls for `/alerts` and `/locations`.
* Mother app:

  * Register for and handle push notifications (override DND for emergencies).
  * Live map view subscribing to real-time location updates.
  * Alert history screen listing all events with details.

**Deliverables:**

* Fully working emergency and soft-alert workflows.
* Real-time map and notification handling.

---

## 4. Core User Journeys

Summarised for reference:

* **Onboarding & Pairing:** Registration with role selection → pairing code exchange → linked accounts.
* **Child Alerts:** Voice wake-phrase → confirmation → soft or emergency alert → location capture.
* **Mother Experience:** Receive silent or high-priority notifications → live map → alert history.

---