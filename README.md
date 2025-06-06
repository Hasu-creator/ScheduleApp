# React Native Todo App

A cross-platform mobile task management application built with **React Native**, **Expo**, and **TypeScript**. This application integrates with **Firebase** for authentication and cloud storage of user tasks. Built using **Expo Router** and **Zustand** for routing and state management, it provides a clean and responsive UI for managing daily schedules and todos.

## ✨ Features

### ✅ User Authentication
- Firebase Authentication with email & password
- Secure session persistence

### 📋 Task Management
- Create, view, and delete tasks
- Mark tasks as complete
- Organize tasks by date and category
- View daily and scheduled tasks

### 🎨 Modern UI/UX
- Custom UI components: TaskCard, TodaySection, ProgressBar, etc.
- Responsive design with light structure
- Navigation with Expo Router and bottom tab layout

### ⚙️ Tech Stack

- **React Native** (via Expo)
- **Expo Router** for file-based navigation
- **TypeScript**
- **Firebase** (Authentication + Firestore)
- **Zustand** for global state management
- **AsyncStorage** for token/session management

---

## 📁 Folder Structure
```
TODO-APP/

```bash
.
├── .expo/                     # Expo-generated files
├── .git/                      # Git repo
├── .vscode/                   # VS Code editor configs
├── android/                   # Android native build folder
├── assets/                    # Images, fonts, and other static files
├── node_modules/              # Dependencies
│
├── src/
│   ├── app/                   # Screens for each route using Expo Router
│   │   ├── (tabs)/                         # Authenticated tab routes
│   │   │   ├── _layout.tsx                 # Tab navigation layout
│   │   │   ├── home.tsx                    # Home screen (today's tasks)
│   │   │   ├── add.tsx                     # Add new task screen
│   │   │   ├── schedule.tsx                # Schedule overview
│   │   │   ├── menu.tsx                    # Menu/settings screen
│   │   │   └── profile.tsx                 # User profile and stats
│   │   ├── _layout.tsx                     # Root layout (e.g. AuthProvider)
│   │   ├── index.tsx                       # Entry point - redirect to login or tabs
│   │   ├── login.tsx                       # Login screen
│   │   └── signup.tsx                      # Signup screen
│   ├── components/            # Reusable UI components
│   │   ├── ClassCard.tsx
│   │   ├── ClassForm.tsx
│   │   ├── DateSelector.tsx
│   │   ├── ExamCard.tsx
│   │   ├── ExamForm.tsx
│   │   ├── Header.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── SocialButtons.tsx
│   │   ├── TaskCard.tsx
│   │   ├── TaskCategoryCard.tsx
│   │   ├── TaskForm.tsx
│   │   ├── ThreeDotMenu.tsx
│   │   └── TodaySection.tsx
│
│   ├── hooks/                 # Custom hooks
│   │   ├── useAuth.tsx        # Firebase auth logic
│   │   └── useLoading.tsx     # Global loading state
│
│   ├── images/                # App-specific images (empty for now)
│
│   ├── store/                 # Zustand stores for global state
│   │   ├── useClassStore.tsx
│   │   ├── useExamStore.tsx
│   │   └── useTaskStore.tsx
│
│   └── utils/
│       └── helper.js          # Helper functions
│
├── app.json                   # Expo project config
├── eas.json                   # Expo Application Services config
├── FirebaseConfig.ts          # Firebase client config (auth + Firestore)
├── metro.config.js            # Metro bundler configuration
├── package.json               # Project metadata and scripts
├── package-lock.json          # Locked dependency versions (npm)
├── tsconfig.json              # TypeScript configuration
├── yarn.lock                  # Locked dependency versions (yarn)
└── README.md                               # Project overview

```

## 🧩 Setup and Installation

### ✅ Prerequisites

- Node.js (v14+)
- npm (v6+) or yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) on your mobile device

### 📦 Installation Steps

1. **Clone the Repository**

```bash
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app
# Using npm
npm install

# or using yarn
yarn install

# Start the Development Server
npm run start

Scan the QR code with Expo Go to open the app on your phone.

```
### Demo

https://github.com/user-attachments/assets/68118d89-3ae6-4811-b6bb-cde733bd33fc




