# MummyHelp Frontend

React Native mobile application for the MummyHelp emergency alert system.

## Features (Phase 1 - Authentication)

- User registration with role selection (mother/child)
- User authentication and login
- Role-based dashboard navigation
- Secure token storage
- Modern, intuitive UI with React Native Paper

## Prerequisites

- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **iOS setup (macOS only):**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Start Metro bundler:**
   ```bash
   npm start
   ```

4. **Run the app:**
   ```bash
   # Android
   npm run android
   
   # iOS (macOS only)
   npm run ios
   ```

## Project Structure

```
frontend/
├── src/
│   ├── screens/           # App screens
│   │   ├── SignupScreen.js
│   │   ├── SigninScreen.js
│   │   ├── ChildDashboard.js
│   │   └── MotherDashboard.js
│   └── services/          # API and utilities
│       └── api.js
├── App.js                 # Main app component
├── package.json
└── README.md
```

## API Configuration

Update the API base URL in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://your-backend-url.com/api';
```

For local development, use:
```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

## User Flows

### Registration Flow
1. User opens app
2. Selects "Create Account"
3. Fills in name, email, password
4. Selects role (mother/child)
5. Account created with automatic pairing code (for children)
6. Redirected to appropriate dashboard

### Login Flow
1. User opens app
2. Enters email and password
3. Authenticated and redirected to dashboard based on role

### Dashboard Features
- **Child Dashboard:**
  - Display pairing code (if not paired)
  - Pairing status
  - Placeholder for emergency alerts (Phase 3)
  - Placeholder for soft alerts (Phase 3)

- **Mother Dashboard:**
  - Pairing instructions (if not paired)
  - Child status (if paired)
  - Placeholder for live map (Phase 3)
  - Placeholder for alert history (Phase 3)

## Development

### Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm test` - Run tests
- `npm run lint` - Run ESLint

### Key Dependencies

- **React Native Paper** - Material Design components
- **React Navigation** - Navigation between screens
- **Axios** - HTTP client for API calls
- **AsyncStorage** - Local data persistence

## Next Steps (Phase 2)

- Pairing functionality between mothers and children
- Pairing code management
- Role-based pairing restrictions

## Troubleshooting

### Common Issues

1. **Metro bundler issues:**
   ```bash
   npm start -- --reset-cache
   ```

2. **Android build issues:**
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

3. **iOS build issues:**
   ```bash
   cd ios && pod deintegrate && pod install && cd ..
   ```

### Backend Connection

Ensure your backend server is running and accessible. The frontend will show connection errors if the backend is not available.

## Security Notes

- Authentication tokens are stored securely using AsyncStorage
- API calls include automatic token injection
- Failed authentication automatically clears stored credentials
- All sensitive data is handled through secure API endpoints 