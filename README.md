# Insta Focus

A mobile app concept designed to make Instagram more intentional by keeping the features I actually want while limiting endless scrolling and recommended content.

## Project Goal

Insta Focus aims to provide a simpler Instagram experience focused on staying connected with people rather than consuming an endless stream of content.

## Planned Features

* **Stories:** View Stories from accounts I follow.
* **Direct Messages:** Access conversations and messages.
* **Restricted Content:** Keep Reels and other distracting content locked by default.
* **Timed Access:** Temporarily unlock restricted content for a limited period.
* **Daily Limits:** Set a daily allowance for restricted content.
* **Persistent Timer:** Preserve usage limits when the app is closed or reopened.
* **Minimal Interface:** Remove unnecessary feeds and discovery features from the custom interface.

## Tech Stack

* React Native
* Expo
* TypeScript
* Expo Router
* Expo SQLite
* Expo SecureStore

## Development Status

**Current stage:** Initial setup and prototyping.

The first version will use mock Instagram data to develop and test the interface and timer system.

Real Instagram integration will be investigated separately. Available features will depend on Meta's official APIs, account eligibility, and permissions.

## Getting Started

### Prerequisites

* Node.js (LTS)
* Git
* VS Code (recommended)

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd insta-focus
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npx expo start
```

Follow the Expo CLI instructions to run the app on a compatible device or emulator.

## Project Roadmap

* [ ] Set up the Expo project and navigation.
* [ ] Build the Stories screen using mock data.
* [ ] Build the DM inbox using mock data.
* [ ] Create the restricted-content screen.
* [ ] Implement timed unlocking and daily usage limits.
* [ ] Persist timer state locally.
* [ ] Investigate official Instagram API capabilities.
* [ ] Integrate supported Instagram functionality.
* [ ] Test and polish the application.

## Important Note

This is an independent project concept, not an official Instagram application. It will use supported integration methods and will not rely on scraping private data or extracting Instagram session cookies.
