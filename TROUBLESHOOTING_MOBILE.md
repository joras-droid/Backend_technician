# Troubleshooting Mobile API Connection

## Quick Checklist

1. ✅ **Server is running** - Check if server is listening on port 3000
2. ✅ **Correct IP address** - Use your computer's network IP, not localhost
3. ✅ **Same network** - Mobile device and server must be on same Wi-Fi
4. ✅ **Firewall** - Port 3000 must be open
5. ✅ **CORS configured** - Server allows mobile app origins

## Step 1: Start the Server

```bash
cd backend
npm run start:dev
```

You should see:
```
🚀 Application is running on:
   Local:    http://localhost:3000/api/v1
   Network:  http://YOUR_IP:3000/api/v1
```

## Step 2: Find Your Network IP

### macOS
```bash
ipconfig getifaddr en0
# or
ifconfig | grep "inet " | grep -v 127.0.0.1
```

### Linux
```bash
hostname -I | awk '{print $1}'
```

### Windows
```bash
ipconfig
# Look for IPv4 Address under your active adapter
```

## Step 3: Test Server Accessibility

### From Computer (Browser)
```
http://localhost:3000/api/v1
```

### From Mobile Device Browser
```
http://YOUR_IP:3000/api/v1
```

If this doesn't work, the server isn't accessible from network.

## Step 4: Check Firewall

### macOS
```bash
# Check if port 3000 is blocked
sudo lsof -i :3000

# Allow Node.js in System Preferences:
# System Preferences → Security & Privacy → Firewall → Firewall Options
# Add Node.js and allow incoming connections
```

### Linux
```bash
sudo ufw allow 3000/tcp
sudo ufw reload
```

### Windows
- Windows Defender Firewall → Advanced Settings
- Inbound Rules → New Rule → Port → TCP 3000 → Allow

## Step 5: Verify CORS Configuration

Check `.env`:
```env
CORS_ORIGIN=*
CORS_CREDENTIALS=true
HOST=0.0.0.0
PORT=3000
```

## Step 6: Flutter App Configuration

### For Physical Device (Same Network)
```dart
const String baseUrl = 'http://YOUR_IP:3000/api/v1';
// Example: 'http://192.168.1.100:3000/api/v1'
```

### For Android Emulator
```dart
const String baseUrl = 'http://10.0.2.2:3000/api/v1';
```

### For iOS Simulator
```dart
const String baseUrl = 'http://localhost:3000/api/v1';
```

## Common Issues

### Issue 1: Connection Refused
**Symptom**: `SocketException: Connection refused`

**Solutions**:
- Verify server is running: `lsof -i :3000`
- Check firewall settings
- Ensure mobile device is on same network
- Verify IP address is correct

### Issue 2: Timeout
**Symptom**: Request times out

**Solutions**:
- Check if server is listening on `0.0.0.0` (not just `localhost`)
- Verify firewall allows port 3000
- Check network connectivity between devices

### Issue 3: CORS Error
**Symptom**: CORS policy error in browser console

**Solutions**:
- Set `CORS_ORIGIN=*` in `.env` for development
- Restart server after changing `.env`
- Ensure CORS is enabled in `main.ts`

### Issue 4: 401 Unauthorized
**Symptom**: All requests return 401

**Solutions**:
- Check if endpoint requires authentication
- Verify JWT token is being sent in headers
- Use `@Public()` decorator for public endpoints

### Issue 5: Wrong Base URL
**Symptom**: 404 Not Found

**Solutions**:
- Verify API prefix: `/api/v1`
- Check endpoint paths match documentation
- Ensure base URL ends with `/api/v1`

## Testing from Command Line

### Test Health Endpoint
```bash
curl http://localhost:3000/api/v1
```

### Test from Network IP
```bash
curl http://YOUR_IP:3000/api/v1
```

### Test with Authentication
```bash
curl -X POST http://YOUR_IP:3000/api/v1/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"username":"admin@technician.com","password":"Test@123!"}'
```

## Debug Mode

Enable detailed logging by checking server console output. The logging interceptor will show:
- All incoming requests
- Request IP addresses
- Response status codes
- Request duration

## Network Diagnostics

### Check Server Status
```bash
# Check if port is listening
netstat -an | grep 3000  # Linux/Mac
netstat -ano | findstr 3000  # Windows

# Check if process is running
ps aux | grep node  # Linux/Mac
tasklist | findstr node  # Windows
```

### Test Network Connectivity
```bash
# From mobile device, ping server IP
ping YOUR_IP

# From server, check if mobile can reach it
# (Use network monitoring tools)
```

## Production Considerations

For production deployment:
1. Use HTTPS instead of HTTP
2. Configure proper CORS origins (not `*`)
3. Use reverse proxy (nginx)
4. Set up proper domain name
5. Configure SSL certificates
6. Use environment-specific base URLs
