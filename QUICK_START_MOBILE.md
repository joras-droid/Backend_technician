# Quick Start for Mobile API Access

## Your Network IP
**Current IP**: `192.168.1.73`

## Step 1: Start the Server

```bash
cd backend
npm run start:dev
```

Wait for this message:
```
🚀 Application is running on:
   Network:  http://192.168.1.73:3000/api/v1
```

## Step 2: Configure Flutter App

### For Physical Device (iPhone/Android on same Wi-Fi)
```dart
const String baseUrl = 'http://192.168.1.73:3000/api/v1';
```

### For Android Emulator
```dart
const String baseUrl = 'http://10.0.2.2:3000/api/v1';
```

### For iOS Simulator
```dart
const String baseUrl = 'http://localhost:3000/api/v1';
```

## Step 3: Test Connection

### From Mobile Browser
Open: `http://192.168.1.73:3000/api/v1`

Should return: `"Hello World!"`

### From Flutter App
```dart
final response = await http.get(
  Uri.parse('http://192.168.1.73:3000/api/v1'),
);
print(response.body); // Should print "Hello World!"
```

## Common Fixes

### Server Not Responding?
1. Check server is running: Look for "Application is running" message
2. Check firewall: Allow port 3000 in macOS System Preferences
3. Verify IP: Run `ipconfig getifaddr en0` to confirm IP

### Connection Refused?
- Ensure server is listening on `0.0.0.0` (check `.env`: `HOST=0.0.0.0`)
- Check mobile device is on same Wi-Fi network
- Verify firewall allows incoming connections

### CORS Errors?
- Already configured with `CORS_ORIGIN=*` in `.env`
- Restart server after any `.env` changes

## Test Endpoints

### Health Check (No Auth Required)
```
GET http://192.168.1.73:3000/api/v1
```

### Sign In
```
POST http://192.168.1.73:3000/api/v1/auth/signin
Content-Type: application/json

{
  "username": "admin@technician.com",
  "password": "Test@123!"
}
```

## Need Help?

See `TROUBLESHOOTING_MOBILE.md` for detailed troubleshooting steps.
