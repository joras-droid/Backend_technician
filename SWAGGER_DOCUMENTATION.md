# Swagger API Documentation

## Overview

The Technician Management System API is fully documented using Swagger/OpenAPI 3.0. The Swagger UI provides an interactive interface to explore and test all API endpoints.

## Accessing Swagger Documentation

Once the application is running, access the Swagger UI at:

```
http://localhost:3000/api/docs
```

The path can be configured via the `SWAGGER_PATH` environment variable (default: `api/docs`).

## Features

### Interactive API Explorer
- **Try It Out**: Test endpoints directly from the browser
- **Request/Response Examples**: See example payloads and responses
- **Schema Validation**: View request/response schemas
- **Authentication**: Test authenticated endpoints with JWT tokens

### Documentation Sections

#### 1. Authentication (`/auth`)
- **POST /auth/signup** - Register a new user
- **POST /auth/signin** - Sign in and get JWT tokens
- **POST /auth/presigned-url** - Get presigned URL for profile image (public)
- **POST /auth/profile/presigned-url** - Get presigned URL for profile image (authenticated)
- **PATCH /auth/profile/image** - Update profile image URL

#### 2. Users (`/users`)
- **GET /users/me** - Get current user profile (for settings/profile page - technician, manager, admin)
- **GET /users/technicians** - Get all technicians

#### 3. Clients (`/clients`)
- **GET /clients** - Get all clients

#### 4. Work Orders (`/work-orders`)
- **POST /work-orders** - Create work order (Admin/Manager)
- **GET /work-orders** - List all work orders with filters (Admin/Manager)
- **GET /work-orders/technician** - Get my work orders (Technician)
- **GET /work-orders/technician/:technicianId** - Get work orders for a technician (Admin/Manager)
- **GET /work-orders/:id** - Get work order details
- **PATCH /work-orders/:id** - Update work order
- **POST /work-orders/:id/duplicate** - Duplicate work order (Admin/Manager)
- **POST /work-orders/:workOrderId/attachments/presigned-url** - Get presigned URL for attachment upload
- **POST /work-orders/:workOrderId/attachments** - Create attachment record after S3 upload

## Authentication

Most endpoints require JWT authentication. To authenticate:

1. Sign up or sign in using `/auth/signup` or `/auth/signin`
2. Copy the `accessToken` from the response
3. Click the **Authorize** button in Swagger UI
4. Enter: `Bearer <your-access-token>`
5. Click **Authorize**

Now you can test authenticated endpoints. The token persists during your session.

## Presigned URL and Upload Media Mechanism

The API uses **presigned URLs** for secure, direct-to-S3 file uploads. This approach:
- **No file passes through the server** - files go directly from client to S3
- **Time-limited access** - presigned URLs expire (default: 1 hour)
- **Secure** - no need to expose S3 credentials to the client
- **Scalable** - reduces server load for large file uploads

### How It Works
1. Client requests a presigned URL from the API (includes fileName, contentType)
2. API generates a temporary S3 upload URL and returns it with the public URL
3. Client uploads file directly to S3 using PUT request with the presigned URL
4. Client uses the public URL when creating records (e.g., profile image, attachment)

### Supported File Types
- Images: `image/jpeg`, `image/png`, `image/jpg`, `image/webp`
- Documents: `application/pdf`

### Presigned URL Endpoints
| Endpoint | Auth | Use Case |
|----------|------|----------|
| POST /auth/presigned-url | Public | Profile image during signup |
| POST /auth/profile/presigned-url | JWT | Profile image update (authenticated) |
| POST /work-orders/:workOrderId/attachments/presigned-url | JWT | Work order photos/receipts |

### Response Format
```json
{
  "presignedUrl": "https://bucket.s3.region.amazonaws.com/...",
  "key": "profiles/user123/1234567890.jpg",
  "publicUrl": "https://bucket.s3.region.amazonaws.com/...",
  "expiresIn": 3600
}
```

## File Upload Flow Documentation

### Profile Image Upload (During Signup)

1. **Request Presigned URL**
   ```
   POST /auth/presigned-url
   {
     "fileName": "profile.jpg",
     "contentType": "image/jpeg",
     "uploadType": "profile"
   }
   ```

2. **Upload to S3** (outside Swagger - use curl/Postman)
   ```bash
   PUT {presignedUrl}
   Content-Type: image/jpeg
   Body: [binary file data]
   ```

3. **Sign Up with Image URL**
   ```
   POST /auth/signup
   {
     ...userData,
     "profileImageUrl": "{publicUrl}"
   }
   ```

### Work Order Attachment Upload

1. **Request Presigned URL**
   ```
   POST /work-orders/:workOrderId/attachments/presigned-url
   {
     "fileName": "photo.jpg",
     "contentType": "image/jpeg",
     "attachmentType": "photo"
   }
   ```

2. **Upload to S3** (outside Swagger)
   ```bash
   PUT {presignedUrl}
   Content-Type: image/jpeg
   Body: [binary file data]
   ```

3. **Create Attachment Record**
   ```
   POST /work-orders/:workOrderId/attachments
   {
     "url": "{publicUrl}",
     "type": "image/jpeg",
     "description": "Work site photo"
   }
   ```

## Presigned URL and Upload Media Mechanism

### How It Works

The API uses **presigned URLs** for secure, direct-to-S3 file uploads. This approach:
- **No file passes through the API server** - files go directly from client to S3
- **Secure** - presigned URLs expire (default: 1 hour) and are single-use
- **Scalable** - reduces server load for large file uploads

### Flow Overview

1. **Client requests presigned URL** - Send `fileName`, `contentType`, and `attachmentType` (or `uploadType` for profile)
2. **API returns** - `presignedUrl` (for PUT upload), `publicUrl` (to save after upload), `key`, `expiresIn`
3. **Client uploads to S3** - PUT request to `presignedUrl` with file in body, `Content-Type` header
4. **Client saves reference** - Use `publicUrl` when creating the record (signup profileImageUrl, or attachment url)

### Supported Endpoints

| Endpoint | Use Case | Auth |
|----------|----------|------|
| `POST /auth/presigned-url` | Profile image during signup | Public |
| `POST /auth/profile/presigned-url` | Profile image after signin | JWT |
| `POST /work-orders/:id/attachments/presigned-url` | Work order photos/receipts | JWT |

### Allowed File Types

- Images: `image/jpeg`, `image/png`, `image/jpg`, `image/webp`
- Documents: `application/pdf`

### Work Order Create Request Body

```
POST /work-orders
{
  "scheduledAt": "2026-02-10T09:00:00.000Z",
  "facilityName": "Main Office",
  "facilityAddress": "123 Main St",
  "facilityLat": 40.7128,
  "facilityLng": -74.006,
  "technicianId": "clx1234567890",
  "clientId": "clx9876543210",
  "workOrderNumber": "WO-2026-001",
  "estimatedHours": 4,
  "payRate": 25.5,
  "pointOfContact": "John Doe",
  "tasks": "Install equipment",
  "notes": "Bring ladder",
  "equipment": [
    { "name": "Wrench Set", "quantity": 2, "cost": 45.99, "vendor": "Home Depot" }
  ]
}
```

## Response Formats

All responses follow a consistent format:

### Success Response
```json
{
  "statusCode": 200,
  "data": {
    // Response data
  }
}
```

### Error Response
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

## Environment Configuration

Swagger can be enabled/disabled via environment variable:

```env
SWAGGER_ENABLED=true  # Default: true
SWAGGER_PATH=api/docs  # Default: api/docs
```

## API Tags

Endpoints are organized by tags:
- **auth** - Authentication endpoints
- **users** - User management
- **clients** - Client management
- **work-orders** - Work order management

## Examples

### Sign Up Request
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "username": "johndoe",
  "password": "SecurePass123",
  "phone": "+1234567890",
  "role": "TECHNICIAN",
  "profileImageUrl": "https://bucket.s3.region.amazonaws.com/profiles/user123/image.jpg"
}
```

### Sign In Request
```json
{
  "username": "johndoe",
  "password": "SecurePass123"
}
```

### Sign In Response
```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "id": "clx1234567890",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "username": "johndoe",
      "role": "TECHNICIAN"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## Testing Tips

1. **Start with Authentication**: Always sign up or sign in first
2. **Use Authorize Button**: Click "Authorize" and enter your token
3. **Check Response Codes**: Swagger shows HTTP status codes
4. **View Schemas**: Click "Schema" to see request/response structures
5. **Try Different Values**: Modify examples to test validation

## Notes

- Swagger UI persists authorization during your session
- File uploads to S3 must be done outside Swagger (use curl, Postman, or your client app)
- All timestamps are in ISO 8601 format (UTC)
- JWT tokens expire after 7 days (configurable)
- Presigned URLs expire after 1 hour
