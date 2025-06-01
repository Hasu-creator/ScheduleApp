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
├── src/
│   ├── app/                                # Expo Router pages
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
│
│   ├── components/                         # Reusable UI components
│   │   ├── Header.tsx                      # Custom header with title/back
│   │   ├── TaskCard.tsx                    # Displays a task item
│   │   ├── TaskCategoryCard.tsx            # Category UI block
│   │   ├── ProgressBar.tsx                 # Task completion progress
│   │   ├── TodaySection.tsx                # Displays tasks for today
│   │   ├── DateSelector.tsx                # Scrollable date row
│   │   └── SocialButtons.tsx               # Social login buttons (optional)
│
│   ├── store/                              # Zustand global state
│   │   └── useTaskStore.tsx                # Task state store
│
│   ├── hooks/                              # Custom hooks
│   │   ├── useAuth.ts                      # Firebase auth handling
│   │   └── useLoading.ts                   # Hook for loading states
│
│   ├── utils/                              # Utility functions and helpers
│   │   └── helper.ts                       # Formatting, time utils, etc.
│
│   └── FirebaseConfig.ts                   # Firebase config/init
│
├── assets/                                 # Static assets (images, fonts, etc.)
│   ├── images/
│   │   └── logo.png
│   └── fonts/
│       └── Inter-Regular.ttf
│
├── .env                                    # Optional: environment variables
├── .gitignore
├── app.json                                # Expo app configuration
├── package.json
├── tsconfig.json                           # TypeScript configuration
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




