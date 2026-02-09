# Test Admin Login

## Admin Credentials

The default admin account has been created with:

- **Email**: `admin@technician.com`
- **Username**: `admin`
- **Password**: `Test@123!` (from your .env file)
- **Role**: `ADMIN`
- **Whitelisted**: `true`

## Sign In Options

You can now sign in using **either username or email**:

### Option 1: Using Email
```bash
curl -X POST 'http://localhost:3000/api/v1/auth/signin' \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "admin@technician.com",
    "password": "Test@123!"
  }'
```

### Option 2: Using Username
```bash
curl -X POST 'http://localhost:3000/api/v1/auth/signin' \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "admin",
    "password": "Test@123!"
  }'
```

## Expected Response

```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "id": "clx...",
      "firstName": "Admin",
      "lastName": "User",
      "email": "admin@technician.com",
      "username": "admin",
      "role": "ADMIN",
      "whitelisted": true,
      "createdAt": "2026-02-06T...",
      "updatedAt": "2026-02-06T..."
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## Using the Access Token

After signing in, use the `accessToken` for authenticated requests:

```bash
curl -X GET 'http://localhost:3000/api/v1/admin/employees/whitelist' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

## Troubleshooting

If you still get "Invalid credentials":

1. **Verify admin exists:**
   ```bash
   # Check if admin was created
   npm run db:seed
   # Should say "Admin user already exists" if it exists
   ```

2. **Check password:**
   - Make sure you're using the password from `.env` (`DEFAULT_ADMIN_PASSWORD`)
   - Default is `Test@123!` if not set in .env

3. **Verify database:**
   - Make sure database is running
   - Check `DATABASE_URL` in `.env`

4. **Restart server:**
   ```bash
   npm run start:dev
   ```

## Next Steps

After successful login:

1. **Use the access token** for admin endpoints
2. **Whitelist employee emails** via `/admin/employees/whitelist`
3. **Create employee accounts** via `/admin/employees`
4. **Change admin password** (recommended - implement password change endpoint)
