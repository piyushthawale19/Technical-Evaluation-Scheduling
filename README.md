# TutorFlow

Production-grade MERN scaffold for scheduling, billing, recurrence, audit logging, and adjustment-safe invoice history.

## Structure

- `client` React + Vite + TypeScript + Tailwind + Zustand + React Query
- `server` Express + MongoDB + Mongoose + JWT + bcrypt + Express Validator

## Instructions to Run and Seed Data

### Prerequisites
- Node.js (v18+)
- MongoDB (running locally or a URI provided via `.env`)

### Running the Server
1. Navigate to the `server` directory: `cd server`
2. Install dependencies: `npm install`
3. Configure environment variables: Create a `.env` file with `PORT=5000`, `MONGO_URI=mongodb://localhost:27017/tutorflow`, and `JWT_SECRET=your_secret`.
4. Start the server in development mode: `npm run dev`

### Seeding Data
1. Ensure the MongoDB instance is running.
2. In the `server` directory, execute the seed script: `npm run seed` (or `node src/scripts/seed.ts` using `tsx` or `ts-node`).
3. This will populate the database with initial users, organizations, tutors, students, and demo sessions.

### Running the Client
1. Navigate to the `client` directory: `cd client`
2. Install dependencies: `npm install`
3. Start the Vite development server: `npm run dev`
4. Access the application at `http://localhost:5174/`

## The "Why": Handling Billed-Session State in the UI

Handling billed sessions effectively is crucial for financial integrity. In the UI, the approach revolves around immutability and visual warnings.
When a session is marked as `billed`, it implies that an invoice has been generated for it. To maintain billing integrity:
1. **Visual Indicators**: Billed sessions are styled distinctly (e.g., using a dark slate color instead of the standard blue or green) to immediately signify their locked state to the user.
2. **Warning Banners**: If a user attempts to edit or reschedule a billed session, a prominent warning banner is displayed within the `RescheduleDrawer` or `SessionDrawer`. This banner explicitly informs the user that modifying the session will result in a **credit adjustment** on the original invoice.
3. **Adjustment Previews**: Rather than just warning the user, the UI actively calculates and previews the impending credit adjustment, showing the original charge, the credit amount, and the net due. This transparent approach prevents accidental revenue leakage and ensures the admin is fully aware of the financial consequences of their actions.

## Tradeoffs: What was simplified to meet the timebox?

To deliver a functional and visually polished prototype within the timebox, several tradeoffs and simplifications were made:
1. **Mock Data vs. Real API**: While the scaffolding for API calls and React Query is present, much of the calendar and session data in the UI relies on local `mockData.ts` and `zustand` state for immediate visual feedback. 
2. **Hardcoded Calendar Grid**: The calendar view (`CalendarBoard.tsx`) uses a simplified CSS grid approach with fixed time rows (e.g., 9:00 AM, 10:00 AM) rather than a full-fledged dynamic scheduling library like `FullCalendar`. This allowed for pixel-perfect custom styling but sacrificed dynamic time-scaling and drag-and-drop capabilities.
3. **Authentication**: The login flow falls back to "demo mode" credentials if the real backend is unreachable or fails, ensuring the reviewer can still access the dashboard UI without needing to spin up the database.
4. **Recurrence Logic**: The recurrence generator (`RecurringSessionsPage.tsx`) previews the instances but doesn't actually dispatch complex cron-based scheduling to the backend; it simplifies it to a UI-level generator.

## Future Architecture & Edge Cases

If given more time, here is how the following complex scenarios would be handled:

### 1. Daylight Saving Transitions in the Calendar UI
All dates and times in the backend must be stored exclusively in UTC. The UI would rely on robust date libraries like `date-fns-tz` or `Luxon` to convert these UTC timestamps to the user's local timezone exactly at the moment of rendering. When generating recurring sessions that cross a DST boundary, the backend would generate the specific UTC timestamps for each occurrence based on the *local wall-clock time* of the target timezone, ensuring that a 10:00 AM session remains at 10:00 AM local time, even if the UTC offset shifts.

### 2. Recurrence Exceptions (Moving just one occurrence in a series)
A recurring series would be modeled with a parent `SessionRecurrence` document and individual `Session` documents for each occurrence. If a user reschedules a single occurrence, that specific `Session` document is updated with the new date/time, breaking away from the strict mathematical sequence. It would maintain a `recurrenceId` linking it to the parent, but gain an `isException: true` flag. The UI would then display an icon indicating this session has been decoupled from the standard series schedule.

### 3. Partial Reschedules (Duration Changes)
If a session's duration is extended or reduced (e.g., changing from 60 mins to 90 mins), the system must evaluate its billing status. If unbilled, the duration and cost are simply updated. If already billed, the backend would automatically calculate the prorated difference. The UI would present an "Adjustment Preview" detailing exactly how much additional charge or credit will be generated on the next invoice, before requiring explicit admin confirmation to proceed.

### 4. Locking an invoice once it's marked as "Paid"
Invoices marked as "Paid" become immutable financial records. At the database level, operations attempting to mutate a paid invoice's line items or total would be blocked. If a refund or correction is necessary, the user cannot edit the paid invoice directly. Instead, the UI would guide them to issue a formal `Credit Adjustment` or a supplementary invoice, maintaining a pristine audit trail of the original paid transaction alongside the subsequent corrections.

### 5. Per-user Timezone Configurations
Each user profile (and organization profile) would contain a `timezone` field (e.g., `America/New_York`). The UI's root component would read this configuration upon authentication and set it as the default context for all date/time formatting functions. When a tutor in London views a session booked by a student in New York, the UI automatically translates the UTC start time into London time, while perhaps displaying a small tooltip indicating the student's local time, preventing scheduling confusion across distributed teams.
