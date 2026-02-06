# API Documentation

## Overview

This API implements a technician management system with secure authentication, work order management, and direct S3 file uploads using presigned URLs.

## Authentication

### Sign Up
```
POST /api/v1/auth/signup
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "username": "johndoe",
  "password": "SecurePass123",
  "phone": "+1234567890",
  "address": "123 Main St",
  "role": "TECHNICIAN",
  "profileImageUrl": "https://s3.amazonaws.com/bucket/profiles/user123/image.jpg" // Optional
}
```

**Response:**
```json
{
  "statusCode": 201,
  "data": {
    "user": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "username": "johndoe",
      "role": "TECHNICIAN",
      "profileImageUrl": "https://..."
    },
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

### Sign In
```
POST /api/v1/auth/signin
```

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "data": {
    "user": { ... },
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

### Get Presigned URL for Profile Image (Public - for signup)
```
POST /api/v1/auth/presigned-url
```

**Request Body:**
```json
{
  "fileName": "profile.jpg",
  "contentType": "image/jpeg",
  "uploadType": "profile"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "data": {
    "presignedUrl": "https://s3.amazonaws.com/bucket/key?signature=...",
    "key": "profiles/temp/1234567890.jpg",
    "publicUrl": "https://bucket.s3.region.amazonaws.com/profiles/temp/1234567890.jpg",
    "expiresIn": 3600
  }
}
```

**Client Flow:**
1. Request presigned URL from server
2. Upload file directly to S3 using PUT request to `presignedUrl`
3. Include `publicUrl` in signup request as `profileImageUrl`

### Get Presigned URL for Profile Image (Authenticated - after signin)
```
POST /api/v1/auth/profile/presigned-url
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "fileName": "profile.jpg",
  "contentType": "image/jpeg"
}
```

**Response:** Same as above

### Update Profile Image
```
PATCH /api/v1/auth/profile/image
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "profileImageUrl": "https://bucket.s3.region.amazonaws.com/profiles/user123/image.jpg"
}
```

## Work Orders

### Get Work Orders for Technician
```
GET /api/v1/work-orders/technician/:technicianId
Authorization: Bearer {accessToken}
```

### Get Work Order Details
```
GET /api/v1/work-orders/:id
Authorization: Bearer {accessToken}
```

### Get Presigned URL for Work Order Attachment
```
POST /api/v1/work-orders/:workOrderId/attachments/presigned-url
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "fileName": "photo.jpg",
  "contentType": "image/jpeg",
  "attachmentType": "photo", // or "receipt"
  "description": "Work site photo" // Optional
}
```

**Response:**
```json
{
  "statusCode": 200,
  "data": {
    "presignedUrl": "https://s3.amazonaws.com/bucket/key?signature=...",
    "key": "work-orders/wo123/photo/att_1234567890_abc123.jpg",
    "publicUrl": "https://bucket.s3.region.amazonaws.com/work-orders/wo123/photo/att_1234567890_abc123.jpg",
    "expiresIn": 3600
  }
}
```

**Client Flow:**
1. Request presigned URL from server
2. Upload file directly to S3 using PUT request to `presignedUrl`
3. Create attachment record using `publicUrl`

### Create Attachment Record
```
POST /api/v1/work-orders/:workOrderId/attachments
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "url": "https://bucket.s3.region.amazonaws.com/work-orders/wo123/photo/att_1234567890_abc123.jpg",
  "type": "image/jpeg",
  "description": "Work site photo"
}
```

**Response:**
```json
{
  "statusCode": 201,
  "data": {
    "id": "attachment_id",
    "workOrderId": "wo123",
    "url": "https://...",
    "type": "image/jpeg",
    "description": "Work site photo",
    "createdAt": "2026-02-06T12:00:00Z"
  }
}
```

## File Upload Flow

### Profile Image Upload (During Signup)

1. **Request Presigned URL:**
   ```bash
   POST /api/v1/auth/presigned-url
   {
     "fileName": "profile.jpg",
     "contentType": "image/jpeg",
     "uploadType": "profile"
   }
   ```

2. **Upload to S3:**
   ```bash
   PUT {presignedUrl}
   Content-Type: image/jpeg
   Body: [binary file data]
   ```

3. **Sign Up with Image URL:**
   ```bash
   POST /api/v1/auth/signup
   {
     ...userData,
     "profileImageUrl": "{publicUrl}"
   }
   ```

### Work Order Attachment Upload

1. **Request Presigned URL:**
   ```bash
   POST /api/v1/work-orders/:workOrderId/attachments/presigned-url
   Authorization: Bearer {token}
   {
     "fileName": "photo.jpg",
     "contentType": "image/jpeg",
     "attachmentType": "photo"
   }
   ```

2. **Upload to S3:**
   ```bash
   PUT {presignedUrl}
   Content-Type: image/jpeg
   Body: [binary file data]
   ```

3. **Create Attachment Record:**
   ```bash
   POST /api/v1/work-orders/:workOrderId/attachments
   Authorization: Bearer {token}
   {
     "url": "{publicUrl}",
     "type": "image/jpeg",
     "description": "Work site photo"
   }
   ```

## Validation

All endpoints use class-validator for request validation. Invalid requests return:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    "email must be an email",
    "password must be longer than or equal to 8 characters"
  ]
}
```

## Error Handling

Errors are intercepted and formatted consistently:

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Invalid credentials"
}
```

## Security

- All endpoints except `/auth/signup`, `/auth/signin`, and `/auth/presigned-url` require JWT authentication
- Passwords are hashed using bcrypt
- JWT tokens expire after 7 days (configurable)
- Refresh tokens expire after 30 days (configurable)
- File types are validated against allowed types
- File sizes are limited (default: 10MB)

## Environment Variables

See `.env.example` for all required configuration variables.
