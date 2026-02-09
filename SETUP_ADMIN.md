# Setting Up Default Admin Account

## Quick Setup

### Option 1: Using Seed Script (Recommended)

Run the seed script to create the default admin account:

```bash
cd backend
npm run db:seed
```

This will create an admin user with:
- **Email**: `admin@technician.com` (or from `DEFAULT_ADMIN_EMAIL` env var)
- **Username**: `admin` (or from `DEFAULT_ADMIN_USERNAME` env var)
- **Password**: `ChangeMe123!` (or from `DEFAULT_ADMIN_PASSWORD` env var)
- **Role**: `ADMIN`
- **Whitelisted**: `true`

### Option 2: Using Admin API Endpoint

After creating the admin account manually, you can use the admin endpoint:

```bash
# First, you need to create admin account directly via API
# But this requires authentication... so use seed script instead
```

### Option 3: Manual Database Insert

If you prefer to create it manually via SQL:

```sql
INSERT INTO "User" (
  id, "createdAt", "updatedAt",
  "firstName", "lastName", email, username, password, role, whitelisted
) VALUES (
  'admin_id_here',
  NOW(),
  NOW(),
  'Admin',
  'User',
  'admin@technician.com',
  'admin',
  '$2b$10$hashed_password_here', -- Use bcrypt to hash 'ChangeMe123!'
  'ADMIN',
  true
);
```

## Sign In

After creating the admin account, you can sign in using **either username or email**:

### Using Username:
```bash
curl -X POST 'http://localhost:3000/api/v1/auth/signin' \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "admin",
    "password": "ChangeMe123!"
  }'
```

### Using Email:
```bash
curl -X POST 'http://localhost:3000/api/v1/auth/signin' \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "admin@technician.com",
    "password": "ChangeMe123!"
  }'
```

**Note:** The `username` field in signin accepts both username and email addresses.

## Custom Admin Credentials

To use custom admin credentials, set environment variables before running seed:

```bash
export DEFAULT_ADMIN_EMAIL=your-admin@example.com
export DEFAULT_ADMIN_USERNAME=your-admin-username
export DEFAULT_ADMIN_PASSWORD=YourSecurePassword123!

npm run db:seed
```

Or add to `.env` file:
```env
DEFAULT_ADMIN_EMAIL=your-admin@example.com
DEFAULT_ADMIN_USERNAME=your-admin-username
DEFAULT_ADMIN_PASSWORD=YourSecurePassword123!
```

## Troubleshooting

### "Invalid credentials" Error

1. **Check if admin exists:**
   ```bash
   # Check database directly or use admin API (if you have another admin)
   ```

2. **Verify password:**
   - Default password is `ChangeMe123!`
   - Make sure you're using the correct username/email

3. **Check whitelist status:**
   - Admin must have `whitelisted: true`
   - Seed script sets this automatically

### "Email is not whitelisted" Error

- Run the seed script to create admin with whitelisted=true
- Or use admin API to whitelist the email first

### Seed Script Fails

1. **Check database connection:**
   ```bash
   # Verify DATABASE_URL in .env
   echo $DATABASE_URL
   ```

2. **Check Prisma client:**
   ```bash
   npm run prisma:generate
   ```

3. **Run migrations first:**
   ```bash
   npm run prisma:migrate
   ```

## Next Steps

After signing in as admin:

1. **Change default password** (recommended)
2. **Whitelist employee emails** using `/admin/employees/whitelist`
3. **Create employee accounts** using `/admin/employees`
4. **Start managing work orders**
