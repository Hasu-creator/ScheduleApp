# StudyScheduleApp

A React Native application for managing study schedules, featuring a calendar, event management, and SQLite database storage.

## Setup
1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Run on Android: `npx react-native run-android`
4. Run on iOS: `npx react-native run-ios`

## Directory Structure
- `src/components/`: Reusable UI components (Button, EventCard, Header).
- `src/screens/`: App screens (Login, Home, Calendar, AddEvent).
- `src/database/`: SQLite database queries and logic.
- `src/assets/`: Images, fonts, and static resources.

## Dependencies
- `@react-navigation/native`, `@react-navigation/stack`
- `react-native-sqlite-storage`
- `react-native-vector-icons`
- `react-native-calendars`