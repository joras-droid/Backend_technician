# Network Access Configuration

## Overview

The backend server is configured to listen on `0.0.0.0`, making it accessible from other devices on your network via your machine's IP address.

## Configuration

The server listens on all network interfaces (`0.0.0.0`) by default, which allows:
- **Local access**: `http://localhost:3000`
- **Network access**: `http://YOUR_IP_ADDRESS:3000`

## Finding Your IP Address

### macOS / Linux
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

Or more specifically:
```bash
# macOS
ipconfig getifaddr en0

# Linux
hostname -I | awk '{print $1}'
```

### Windows
```bash
ipconfig
```
Look for "IPv4 Address" under your active network adapter.

## Access URLs

Once you have your IP address (e.g., `192.168.1.100`), you can access:

- **API Base**: `http://192.168.1.100:3000/api/v1`
- **Swagger Docs**: `http://192.168.1.100:3000/api/docs`
- **Health Check**: `http://192.168.1.100:3000/api/v1`

## Flutter App Configuration

### Development (Testing on Physical Device)

Update your Flutter app's base URL:

```dart
// Development
const String baseUrl = 'http://192.168.1.100:3000/api/v1';

// Or use environment variables
const String baseUrl = Platform.isAndroid 
  ? 'http://10.0.2.2:3000/api/v1'  // Android Emulator
  : 'http://localhost:3000/api/v1'; // iOS Simulator

// For physical devices on same network
const String baseUrl = 'http://YOUR_COMPUTER_IP:3000/api/v1';
```

### Android Emulator

If testing on Android emulator:
- Use `10.0.2.2` instead of `localhost` (Android emulator maps this to host machine)
- Example: `http://10.0.2.2:3000/api/v1`

### iOS Simulator

If testing on iOS simulator:
- Use `localhost` or your Mac's IP address
- Example: `http://localhost:3000/api/v1` or `http://192.168.1.100:3000/api/v1`

### Physical Devices

For physical devices (iPhone/Android) on the same network:
- Use your computer's IP address
- Example: `http://192.168.1.100:3000/api/v1`

## Environment Variable

You can configure the host in `.env`:

```env
HOST=0.0.0.0  # Listen on all interfaces (default)
# OR
HOST=192.168.1.100  # Listen on specific IP
```

## Security Notes

⚠️ **Important**: When running on `0.0.0.0`:

1. **Firewall**: Ensure your firewall allows incoming connections on port 3000
2. **Network**: Only accessible on your local network (not exposed to internet)
3. **Production**: Use proper reverse proxy (nginx) and HTTPS in production
4. **CORS**: Configure `CORS_ORIGIN` in `.env` to restrict origins

## Firewall Configuration

### macOS
```bash
# Allow incoming connections on port 3000
sudo pfctl -f /etc/pf.conf
```

Or use System Preferences → Security & Privacy → Firewall → Firewall Options

### Linux
```bash
# Allow port 3000
sudo ufw allow 3000/tcp
```

### Windows
- Windows Defender Firewall → Advanced Settings
- Inbound Rules → New Rule → Port → TCP 3000 → Allow

## Testing Network Access

### From Another Device

1. **Find your IP**: Use commands above
2. **Test from browser**: `http://YOUR_IP:3000/api/v1`
3. **Test from Flutter app**: Update base URL and test

### From Mobile Device

1. Ensure mobile device is on same Wi-Fi network
2. Use your computer's IP address in Flutter app
3. Test API calls

## Troubleshooting

### Cannot Connect from Mobile Device

1. **Check IP Address**: Verify you're using the correct IP
2. **Check Firewall**: Ensure port 3000 is open
3. **Check Network**: Ensure both devices are on same network
4. **Check Server**: Verify server is running and listening on `0.0.0.0`

### Connection Refused

- Verify server is running: `npm run start:dev`
- Check port is not in use: `lsof -i :3000` (Mac/Linux) or `netstat -ano | findstr :3000` (Windows)
- Verify firewall settings

### CORS Errors

If you see CORS errors from web browser:
- Update `CORS_ORIGIN` in `.env` to include your IP or use `*` for development
- Restart server after changing `.env`

## Production Deployment

For production:
- Use a reverse proxy (nginx/Apache)
- Configure HTTPS/SSL
- Use domain name instead of IP
- Set `CORS_ORIGIN` to your actual domain(s)
- Use `HOST=0.0.0.0` or specific IP
- Configure firewall rules properly
