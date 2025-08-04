# 📱 Phone Testing Setup Guide

## Prerequisites

1. **Install Expo Go** on your phone:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Install Expo CLI** on your computer:
   ```bash
   npm install -g @expo/cli
   ```

## Step 1: Find Your Computer's IP Address

### Windows:
```bash
ipconfig
```
Look for "IPv4 Address" under your WiFi adapter (usually starts with 192.168.x.x)

### Mac/Linux:
```bash
ifconfig
# or
ip addr
```

## Step 2: Update API URL

Edit `frontend/src/services/api.js` and replace the IP address:
```javascript
const API_BASE_URL = 'http://YOUR_IP_ADDRESS:3000/api';
```

## Step 3: Start the Backend

```bash
cd backend
npm install
npm run dev
```

You should see:
```
🚀 MummyHelp API server running on port 3000
🌐 Network access: http://YOUR_IP_ADDRESS:3000/health
```

## Step 4: Start the Frontend

```bash
cd frontend
npm install
npm start
```

This will open Expo DevTools in your browser.

## Step 5: Test on Your Phone

1. **Scan the QR code** with:
   - iOS: Camera app
   - Android: Expo Go app

2. **The app will load** on your phone

## Testing Flow

1. **Create a Mother Account:**
   - Tap "Create Account"
   - Fill in details
   - Select "Mother/Parent" role
   - Complete registration

2. **Create a Child Account:**
   - Logout
   - Create new account
   - Select "Child" role
   - Note the pairing code

3. **Test Login:**
   - Try logging in with both accounts
   - Verify role-based dashboards

## Troubleshooting

### Can't connect to backend?
- Check your computer's IP address
- Make sure both devices are on the same WiFi network
- Verify the backend is running on `0.0.0.0:3000`
- Check Windows Firewall settings

### App won't load?
- Make sure Expo Go is installed
- Check your internet connection
- Try restarting the Expo development server

### API errors?
- Verify the IP address in `frontend/src/services/api.js`
- Check that the backend is running
- Look at the backend console for errors

## Network Configuration

If you're having network issues, you might need to:

1. **Allow Expo through Windows Firewall**
2. **Use your computer's IP address** (not localhost)
3. **Ensure both devices are on the same network**

## Next Steps

Once testing is complete, we can proceed to **Phase 2: Pairing** functionality! 