# Practical Exam 1 Report Template & Screenshot Guide

> **Document Name Guideline**:
> Save your final report document as **`StudentID_Exam1.docx`** (e.g. `QE123456_Exam1.docx`).
> Below is the ready-to-use template structure and screenshot guide for your report.

---

# PRACTICAL EXAM 1 REPORT: TASK MANAGEMENT APP
- **Course**: Mobile Multiplatform Application Development (MMA301)
- **Student Name**: [Your Full Name]
- **Student ID**: [Your Student ID]
- **Class**: [Your Class]
- **Date**: [Submission Date]

---

## 1. Project Information & Links
- **GitHub Repository URL**: [https://github.com/DinhLoii/assignment-mma301](https://github.com/DinhLoii/assignment-mma301)
- **Expo Project Link / QR Code**: [Paste Expo link or QR code from `npx expo start`]
- **APK Download Link (Optional / EAS Build)**: [Optional APK Link]

---

## 2. Firestore Data Model & Schema Description

The application connects to **Google Firebase Cloud Firestore** using the JavaScript SDK (`firebase@latest`) with a dedicated service layer (`src/api/firebase.ts`, `src/api/taskApi.ts`) and state management via **Zustand** (`src/store/useTaskStore.ts`).

### Collection: `tasks`
Every document in the `tasks` collection contains the following fields:

| Field Name | Data Type | Requirement | Description |
| :--- | :--- | :---: | :--- |
| **`id`** | `string` | Auto | Firestore auto-generated document ID |
| **`title`** | `string` | Required | Name of the task (validated client-side, min 3 chars) |
| **`description`** | `string` | Optional | Detailed instructions, acceptance criteria |
| **`status`** | `string` | Required | Current state: `'TODO'`, `'IN_PROGRESS'`, or `'DONE'` |
| **`priority`** | `string` | Required | Priority level: `'LOW'`, `'MEDIUM'`, or `'HIGH'` |
| **`dueDate`** | `string` / `null` | Optional | Due date formatted as `YYYY-MM-DD` |
| **`createdAt`** | `number` / `Timestamp` | Required | Document creation timestamp |
| **`teamId`** | `string` / `null` | Optional | Reserved for Practical Exam 2 (left null for Exam 1) |
| **`assigneeId`** | `string` / `null` | Optional | Reserved for Practical Exam 2 (left null for Exam 1) |

---

## 3. Required Screenshots & Captions

> [!TIP]
> Paste full-screen, high-resolution screenshots below each section. Do not crop out the navigation bar or headers.

### Screenshot 1: Firebase Console – Firestore Database
- **Requirement Demonstrated**: Section 3 (Firebase Project & Data Setup)
- **Image Placeholder**:
  *(Paste screenshot of Firebase Console -> Cloud Firestore -> Data tab showing the `tasks` collection with sample documents)*
- **Caption**:
  *Figure 1: Cloud Firestore Database in the Firebase Console showing the `tasks` collection populated with documents containing all required schema fields (`id`, `title`, `description`, `status`, `priority`, `dueDate`, `createdAt`, `teamId`, `assigneeId`).*

---

### Screenshot 2: Home Screen (Task List & Create Task Form/Button)
- **Requirement Demonstrated**: Section 4 & 5 (Home Screen, Task List & Create Action)
- **Image Placeholder**:
  *(Paste screenshot of the Home Screen displaying app title, subtitle, connection badge, task progress stats, search bar, and task cards)*
- **Caption**:
  *Figure 2: TaskFlow Home screen displaying the task management dashboard with real-time Firestore sync, summary progress metrics, status filter tabs, search bar, and existing tasks list.*

---

### Screenshot 3: Create Task Form Filled In Before Submitting
- **Requirement Demonstrated**: Section 5 (Create Task Form with Validation)
- **Image Placeholder**:
  *(Paste screenshot of the Create Task modal filled in with Title, Description, Status, Priority, and Due Date before clicking Submit)*
- **Caption**:
  *Figure 3: "Create New Task" modal dialog with title, description, priority selector, status options, and due date filled in prior to submission to Cloud Firestore.*

---

### Screenshot 4: Task List After New Task Has Been Created
- **Requirement Demonstrated**: Section 5 (Real-time Creation Verification)
- **Image Placeholder**:
  *(Paste screenshot of the Home Screen showing the newly added task appearing at the top of the list)*
- **Caption**:
  *Figure 4: Home screen task list automatically updated in real-time via `onSnapshot` listener showing the newly created task at the top of the list.*

---

### Screenshot 5: Edit Task Screen / Modal With Updated Values
- **Requirement Demonstrated**: Section 5 (Edit Task Modal)
- **Image Placeholder**:
  *(Paste screenshot of the Edit Task modal showing pre-filled data with modified title, description, or status)*
- **Caption**:
  *Figure 5: "Edit Task" modal dialog with pre-populated values being modified to update the task in Cloud Firestore.*

---

### Screenshot 6: Task List After Task Has Been Edited
- **Requirement Demonstrated**: Section 5 (Real-time Update Verification)
- **Image Placeholder**:
  *(Paste screenshot showing the updated task reflect its new title/status in the list)*
- **Caption**:
  *Figure 6: Home screen displaying the task item successfully updated in real-time with the new title, status badge, and priority chip.*

---

### Screenshot 7: Task List After Task Has Been Deleted
- **Requirement Demonstrated**: Section 5 (Delete Task Verification)
- **Image Placeholder**:
  *(Paste screenshot showing the deletion confirmation alert or the list after the item is removed)*
- **Caption**:
  *Figure 7: Home screen task list after deleting a task, confirming real-time removal from Cloud Firestore.*

---

### Screenshot 8: Navigation Bar & "Coming Soon" Teams Placeholder Screen
- **Requirement Demonstrated**: Section 4 (Navigation & Teams Placeholder)
- **Image Placeholder**:
  *(Paste screenshot of the Teams tab showing the "Coming Soon" placeholder screen for Practical Exam 2)*
- **Caption**:
  *Figure 8: Bottom tab navigation showing the active Teams tab with a polished "Coming Soon" placeholder screen outlining planned features for Practical Exam 2.*

---

### Screenshot 9: Profile Placeholder Screen
- **Requirement Demonstrated**: Section 4 (Profile Placeholder Screen)
- **Image Placeholder**:
  *(Paste screenshot of the Profile tab)*
- **Caption**:
  *Figure 9: Profile placeholder tab displaying evaluator details, public access mode, and Firestore database status.*

---

## 4. Git Commit History
*(Include a screenshot or terminal output of `git log --oneline` demonstrating at least 5 clean, conventional commits)*

- `b4e5435`: feat(models): define task and user interfaces with firestore schema
- `63d9dd2`: feat(api): implement firebase firestore client and task service
- `709dae3`: feat(store): setup zustand store for task state management
- `c4b706f`: feat(components): implement common button, input, and task ui cards
- `aadf1ee`: feat(navigation): configure bottom tabs with home, teams, profile, and demo screens
- `bc17d6f`: feat(crud): implement real-time task management with filters, search, and validation
- `af77ff9`: ci: add github actions workflow for continuous integration
- `...`: docs: add comprehensive readme with erd diagram and exam report guide
