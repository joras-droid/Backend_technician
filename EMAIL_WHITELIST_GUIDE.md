# Email Whitelist System Guide

## Overview

The Technician Management System implements an email whitelist system where only emails approved by administrators can sign up or sign in. This ensures that only authorized employees can access the system.

## How It Works

### 1. Admin Whitelists Email
- Admin adds an email address to the whitelist
- System creates a whitelisted user record (temporary account)
- User receives email notification (optional - to be implemented)

### 2. User Signs Up
- User attempts to sign up with whitelisted email
- System verifies email is whitelisted
- User completes signup and sets password
- Account is activated

### 3. User Signs In
- User signs in with username/password
- System verifies email is still whitelisted
- User gains access if whitelisted

### 4. Admin Creates Employee Account Directly
- Admin can create employee account with email, name, and password
- Account is automatically whitelisted and activated
- Employee can sign in immediately

## Admin Endpoints

All admin endpoints require `ADMIN` role and JWT authentication.

### List Whitelisted Emails
```
GET /api/v1/admin/employees/whitelist
Authorization: Bearer {admin_jwt_token}
```

**Response:**
```json
{
  "statusCode": 200,
  "data": [
    {
      "email": "employee@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "username": "employee_123456",
      "role": "TECHNICIAN",
      "accountCreated": false,
      "createdAt": "2026-02-06T12:00:00Z",
      "updatedAt": "2026-02-06T12:00:00Z"
    }
  ]
}
```

### Whitelist Single Email
```
POST /api/v1/admin/employees/whitelist
Authorization: Bearer {admin_jwt_token}
Content-Type: application/json

{
  "email": "employee@example.com",
  "firstName": "John",  // Optional
  "lastName": "Doe"     // Optional
}
```

**Response:**
```json
{
  "statusCode": 201,
  "data": {
    "id": "clx1234567890",
    "email": "employee@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "username": "employee_123456",
    "role": "TECHNICIAN",
    "whitelisted": true,
    "createdAt": "2026-02-06T12:00:00Z"
  }
}
```

### Whitelist Multiple Emails
```
POST /api/v1/admin/employees/whitelist/bulk
Authorization: Bearer {admin_jwt_token}
Content-Type: application/json

{
  "emails": [
    "employee1@example.com",
    "employee2@example.com",
    "employee3@example.com"
  ]
}
```

**Response:**
```json
{
  "statusCode": 201,
  "data": [
    {
      "email": "employee1@example.com",
      "status": "success",
      "data": { ... }
    },
    {
      "email": "employee2@example.com",
      "status": "error",
      "error": "Email is already whitelisted"
    }
  ]
}
```

### Create Employee Account Directly
```
POST /api/v1/admin/employees
Authorization: Bearer {admin_jwt_token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "employee@example.com",
  "password": "SecurePass123",
  "phone": "+1234567890",      // Optional
  "address": "123 Main St",     // Optional
  "role": "TECHNICIAN"          // Optional, defaults to TECHNICIAN
}
```

**Response:**
```json
{
  "statusCode": 201,
  "data": {
    "id": "clx1234567890",
    "firstName": "John",
    "lastName": "Doe",
    "email": "employee@example.com",
    "username": "employee_123456",
    "role": "TECHNICIAN",
    "whitelisted": true,
    "createdAt": "2026-02-06T12:00:00Z"
  }
}
```

### Remove Email from Whitelist
```
DELETE /api/v1/admin/employees/whitelist/:email
Authorization: Bearer {admin_jwt_token}
```

**Response:**
```json
{
  "statusCode": 200,
  "data": {
    "message": "Email removed from whitelist",
    "email": "employee@example.com"
  }
}
```

## User Signup Flow

### Step 1: Request Presigned URL (Optional - for profile image)
```
POST /api/v1/auth/presigned-url
{
  "fileName": "profile.jpg",
  "contentType": "image/jpeg",
  "uploadType": "profile"
}
```

### Step 2: Upload Image to S3 (if applicable)
```
PUT {presignedUrl}
Content-Type: image/jpeg
Body: [binary file data]
```

### Step 3: Sign Up
```
POST /api/v1/auth/signup
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "employee@example.com",  // Must be whitelisted
  "username": "johndoe",
  "password": "SecurePass123",
  "profileImageUrl": "https://..."  // Optional
}
```

**Success Response:**
```json
{
  "statusCode": 201,
  "data": {
    "user": { ... },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (if not whitelisted):**
```json
{
  "statusCode": 401,
  "message": "Email is not whitelisted. Please contact administrator."
}
```

## User Signin Flow

```
POST /api/v1/auth/signin
{
  "username": "johndoe",
  "password": "SecurePass123"
}
```

**Success Response:**
```json
{
  "statusCode": 200,
  "data": {
    "user": { ... },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (if not whitelisted):**
```json
{
  "statusCode": 401,
  "message": "Your account is not authorized. Please contact administrator."
}
```

## Security Features

1. **Email Whitelist Validation**
   - Signup: Checks if email is whitelisted before allowing registration
   - Signin: Checks if email is still whitelisted before allowing login

2. **Admin-Only Access**
   - All whitelist management endpoints require ADMIN role
   - Protected by JWT authentication and role-based guards

3. **Account Status Tracking**
   - Tracks whether whitelisted email has activated account
   - Distinguishes between whitelisted-only vs activated accounts

## Database Schema

The `User` model includes:
- `whitelisted` (Boolean): Indicates if email is whitelisted
- `password` (String): Hashed password (temporary hash for whitelisted-only accounts)

## Workflow Examples

### Example 1: Admin Whitelists, User Signs Up
1. Admin whitelists `employee@example.com`
2. System creates whitelisted user record (temporary)
3. User receives notification (optional)
4. User signs up with email
5. User sets password and completes profile
6. Account is activated

### Example 2: Admin Creates Account Directly
1. Admin creates employee account with email, name, password
2. Account is automatically whitelisted and activated
3. Employee can sign in immediately
4. Employee can update profile if needed

### Example 3: Remove Access
1. Admin removes email from whitelist
2. If account not activated: Record is deleted
3. If account activated: Account is deactivated (whitelisted = false)
4. User cannot sign in anymore

## Notes

- Only ADMIN role can manage whitelist
- Whitelisted emails can sign up anytime
- Once account is created, user can sign in
- Removing from whitelist deactivates account
- Admin can create accounts directly (bypasses signup)
