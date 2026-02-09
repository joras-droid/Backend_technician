# Backend API Documentation

**Base URL:** `http://localhost:3000/api/v1` (or your production URL)  
**API Version:** v1  
**Content-Type:** `application/json`  
**Authentication:** JWT Bearer Token (for protected endpoints)

---

## Table of Contents

1. [Authentication](#authentication)
2. [Technician Mobile App Endpoints](#technician-mobile-app-endpoints)
3. [Admin/Manager Endpoints (Mobile & Web)](#adminmanager-endpoints-mobile--web)
4. [File Upload Flows](#file-upload-flows)
5. [Data Models](#data-models)
6. [Error Handling](#error-handling)
7. [Common Patterns](#common-patterns)

**📱 Flutter Integration:** See [FLUTTER_API_MAPPING.md](./FLUTTER_API_MAPPING.md) for complete Flutter AppConstants mapping.

---

## Authentication

### Overview

All protected endpoints require a JWT Bearer token in the Authorization header:
```
Authorization: Bearer {accessToken}
```

Tokens expire after 7 days (configurable). Refresh tokens expire after 30 days.

### Sign Up

**Endpoint:** `POST /auth/signup`  
**Authentication:** Not required (Public)  
**Description:** Register a new user account. Email must be whitelisted by admin.

**Request:**
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
  "profileImageUrl": "https://bucket.s3.region.amazonaws.com/profiles/user123/image.jpg"
}
```

**Request Fields:**
- `firstName` (string, required): 2-50 characters
- `lastName` (string, required): 2-50 characters
- `email` (string, required): Valid email, must be whitelisted
- `username` (string, required): 3-30 characters, alphanumeric and underscores only
- `password` (string, required): Min 8 characters, must contain uppercase, lowercase, and number
- `phone` (string, optional): Phone number
- `address` (string, optional): Address
- `role` (enum, optional): `ADMIN`, `MANAGER`, or `TECHNICIAN` (default: `TECHNICIAN`)
- `profileImageUrl` (string, optional): S3 URL after uploading profile image

**Response (201 Created):**
```json
{
  "statusCode": 201,
  "data": {
    "user": {
      "id": "clx1234567890",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "username": "johndoe",
      "phone": "+1234567890",
      "address": "123 Main St",
      "profileImageUrl": "https://bucket.s3.region.amazonaws.com/profiles/user123/image.jpg",
      "role": "TECHNICIAN",
      "createdAt": "2026-02-06T12:00:00.000Z",
      "updatedAt": "2026-02-06T12:00:00.000Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbHh4eHh4eHh4eHgiLCJyb2xlIjoiVEVDSE5JQ0lBTiIsImlhdCI6MTY3MzA0ODAwMCwiZXhwIjoxNjczNjUyODAwfQ.signature",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbHh4eHh4eHh4eHgiLCJyb2xlIjoiVEVDSE5JQ0lBTiIsImlhdCI6MTY3MzA0ODAwMCwiZXhwIjoxNjczODM1MjAwfQ.signature"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation error
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
- `401 Unauthorized`: Email not whitelisted
  ```json
  {
    "statusCode": 401,
    "message": "Email is not whitelisted. Please contact administrator."
  }
  ```
- `409 Conflict`: User already exists
  ```json
  {
    "statusCode": 409,
    "message": "User with this email or username already exists"
  }
  ```

---

### Sign In

**Endpoint:** `POST /auth/signin`  
**Authentication:** Not required (Public)  
**Description:** Authenticate user and receive JWT tokens.

**Request:**
```json
{
  "username": "johndoe",
  "password": "SecurePass123"
}
```

**Response (200 OK):**
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
      "phone": "+1234567890",
      "address": "123 Main St",
      "profileImageUrl": "https://bucket.s3.region.amazonaws.com/profiles/user123/image.jpg",
      "role": "TECHNICIAN",
      "createdAt": "2026-02-06T12:00:00.000Z",
      "updatedAt": "2026-02-06T12:00:00.000Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid credentials or email not whitelisted
  ```json
  {
    "statusCode": 401,
    "message": "Invalid credentials"
  }
  ```
  OR
  ```json
  {
    "statusCode": 401,
    "message": "Your account is not authorized. Please contact administrator."
  }
  ```

---

### Get Profile Image Presigned URL (Public - for signup)

**Endpoint:** `POST /auth/presigned-url`  
**Authentication:** Not required (Public)  
**Description:** Get presigned URL for uploading profile image during signup.

**Request:**
```json
{
  "fileName": "profile.jpg",
  "contentType": "image/jpeg",
  "uploadType": "profile"
}
```

**Request Fields:**
- `fileName` (string, required): Name of the file
- `contentType` (string, required): MIME type (e.g., `image/jpeg`, `image/png`, `image/webp`)
- `uploadType` (enum, required): Must be `"profile"`

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "presignedUrl": "https://shotcaller-documents.s3.us-east-1.amazonaws.com/profiles/temp/1736179200000.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=...",
    "key": "profiles/temp/1736179200000.jpg",
    "publicUrl": "https://shotcaller-documents.s3.us-east-1.amazonaws.com/profiles/temp/1736179200000.jpg",
    "expiresIn": 3600
  }
}
```

**File Upload Flow:**
1. Request presigned URL from server
2. Upload file to S3 using PUT request:
   ```http
   PUT {presignedUrl}
   Content-Type: {contentType}
   Body: [binary file data]
   ```
3. Use `publicUrl` in signup request as `profileImageUrl`

---

### Get Profile Image Presigned URL (Authenticated)

**Endpoint:** `POST /auth/profile/presigned-url`  
**Authentication:** Required (JWT)  
**Description:** Get presigned URL for updating profile image after signin.

**Request:**
```json
{
  "fileName": "profile.jpg",
  "contentType": "image/jpeg"
}
```

**Response:** Same as above

**File Upload Flow:**
1. Request presigned URL
2. Upload file to S3 using PUT request
3. Update profile image URL (see next endpoint)

---

### Update Profile Image

**Endpoint:** `PATCH /auth/profile/image`  
**Authentication:** Required (JWT)  
**Description:** Update user profile image URL after uploading to S3.

**Request:**
```json
{
  "profileImageUrl": "https://shotcaller-documents.s3.us-east-1.amazonaws.com/profiles/user123/1736179200000.jpg"
}
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "id": "clx1234567890",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "username": "johndoe",
    "profileImageUrl": "https://shotcaller-documents.s3.us-east-1.amazonaws.com/profiles/user123/1736179200000.jpg",
    "role": "TECHNICIAN",
    "createdAt": "2026-02-06T12:00:00.000Z",
    "updatedAt": "2026-02-06T12:00:00.000Z"
  }
}
```

---

## Admin/Manager Endpoints (Mobile & Web)

### List All Work Orders

**Endpoint:** `GET /work-orders`  
**Authentication:** Required (JWT)  
**Role:** ADMIN or MANAGER  
**Description:** Retrieve all work orders with optional filters, pagination, and sorting. Available to administrators and managers only.

**Query Parameters:**
- `status` (enum, optional): Filter by status (`ACTIVE`, `COMPLETED`, `PAID`)
- `technicianId` (string, optional): Filter by technician ID
- `clientId` (string, optional): Filter by client ID
- `scheduledFrom` (ISO 8601 date, optional): Filter by scheduled date from
- `scheduledTo` (ISO 8601 date, optional): Filter by scheduled date to
- `workOrderNumber` (string, optional): Search by work order number (partial match)
- `page` (number, optional): Page number (default: 1, minimum: 1)
- `limit` (number, optional): Items per page (default: 20, minimum: 1, maximum: 100)
- `sortBy` (enum, optional): Sort field (`scheduledAt`, `createdAt`, `updatedAt`, `workOrderNumber`) (default: `scheduledAt`)
- `sortOrder` (enum, optional): Sort order (`asc`, `desc`) (default: `asc`)

**Example Request:**
```
GET /api/v1/work-orders?status=ACTIVE&technicianId=clx1234567890&page=1&limit=20&sortBy=scheduledAt&sortOrder=asc
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "data": [
      {
        "id": "clx1234567890",
        "workOrderNumber": "WO-2026-001",
        "scheduledAt": "2026-02-10T09:00:00.000Z",
        "estimatedHours": 4.5,
        "payRate": 25.0,
        "facilityName": "ABC Manufacturing",
        "facilityAddress": "123 Industrial Blvd, City, State 12345",
        "pointOfContact": "Jane Smith",
        "tasks": "Install new equipment\nTest functionality",
        "notes": "Customer requested early morning start",
        "status": "ACTIVE",
        "invoiceNumber": null,
        "client": {
          "id": "clx9876543210",
          "name": "ABC Manufacturing",
          "email": "contact@abcmanufacturing.com",
          "phone": "+1234567890"
        },
        "technician": {
          "id": "clx1234567890",
          "firstName": "John",
          "lastName": "Doe",
          "email": "john.doe@example.com",
          "phone": "+1234567890",
          "profileImageUrl": "https://..."
        },
        "attachments": [],
        "equipment": []
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: User does not have ADMIN or MANAGER role

---

## Technician Mobile App Endpoints

### Get My Work Orders

**Endpoint:** `GET /work-orders/technician`  
**Authentication:** Required (JWT)  
**Description:** Get all work orders assigned to the authenticated technician. Active work orders are prioritized first, then sorted by scheduled date.

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "clx1234567890",
      "workOrderNumber": "WO-2026-001",
      "scheduledAt": "2026-02-10T09:00:00.000Z",
      "estimatedHours": 4.5,
      "payRate": 25.0,
      "facilityName": "ABC Manufacturing",
      "facilityAddress": "123 Industrial Blvd, City, State 12345",
      "pointOfContact": "Jane Smith",
      "tasks": "Install new equipment\nTest functionality",
      "notes": "Customer requested early morning start",
      "status": "ACTIVE",
      "invoiceNumber": null,
      "client": {
        "id": "clx9876543210",
        "name": "ABC Manufacturing",
        "email": "contact@abcmanufacturing.com",
        "phone": "+1234567890"
      },
      "technician": {
        "id": "clx1234567890",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "phone": "+1234567890"
      },
      "attachments": [],
      "equipment": []
    }
  ]
}
```

---

### Get Work Orders for Technician (Admin/Manager)

**Endpoint:** `GET /work-orders/technician/:technicianId`  
**Authentication:** Required (JWT)  
**Description:** Get all work orders assigned to a specific technician (for admin/manager use). Active work orders are prioritized.

**Path Parameters:**
- `technicianId` (string, required): Technician user ID (use `req.user.id` from JWT token)

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "clx1234567890",
      "workOrderNumber": "WO-2026-001",
      "scheduledAt": "2026-02-10T09:00:00.000Z",
      "estimatedHours": 4.5,
      "payRate": 25.0,
      "facilityName": "ABC Manufacturing",
      "facilityAddress": "123 Industrial Blvd, City, State 12345",
      "pointOfContact": "Jane Smith",
      "tasks": "Install new equipment\nTest functionality\nDocument results",
      "notes": "Customer requested early morning start",
      "status": "ACTIVE",
      "invoiceNumber": null,
      "clientId": "clx9876543210",
      "technicianId": "clx1234567890",
      "templateId": null,
      "createdAt": "2026-02-06T12:00:00.000Z",
      "updatedAt": "2026-02-06T12:00:00.000Z",
      "client": {
        "id": "clx9876543210",
        "name": "ABC Manufacturing",
        "email": "contact@abcmanufacturing.com",
        "phone": "+1234567890",
        "address": "123 Industrial Blvd"
      },
      "technician": {
        "id": "clx1234567890",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "phone": "+1234567890"
      },
      "attachments": [
        {
          "id": "clx1111111111",
          "url": "https://shotcaller-documents.s3.us-east-1.amazonaws.com/work-orders/wo123/photo/att_123.jpg",
          "type": "image/jpeg",
          "description": "Work site photo",
          "createdAt": "2026-02-06T13:00:00.000Z"
        }
      ],
      "equipment": [
        {
          "id": "clx2222222222",
          "name": "Wrench Set",
          "quantity": 2,
          "cost": 45.99,
          "vendor": "Home Depot"
        }
      ]
    }
  ]
}
```

---

### Get Work Orders for Technician (Admin/Manager)

**Endpoint:** `GET /work-orders/technician/:technicianId`  
**Authentication:** Required (JWT)  
**Description:** Get all work orders assigned to a specific technician. This endpoint is for admin/manager use to view work orders for any technician.

**Path Parameters:**
- `technicianId` (string, required): Technician user ID

**Response:** Same format as "Get My Work Orders" above

---

### Get Work Order Details

**Endpoint:** `GET /work-orders/:id`  
**Authentication:** Required (JWT)  
**Description:** Get detailed information about a specific work order including time entries.

**Path Parameters:**
- `id` (string, required): Work order ID

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "id": "clx1234567890",
    "workOrderNumber": "WO-2026-001",
    "scheduledAt": "2026-02-10T09:00:00.000Z",
    "estimatedHours": 4.5,
    "payRate": 25.0,
    "facilityName": "ABC Manufacturing",
    "facilityAddress": "123 Industrial Blvd, City, State 12345",
    "pointOfContact": "Jane Smith",
    "tasks": "Install new equipment\nTest functionality",
    "notes": "Customer requested early morning start",
    "status": "ACTIVE",
    "invoiceNumber": null,
    "client": {
      "id": "clx9876543210",
      "name": "ABC Manufacturing",
      "email": "contact@abcmanufacturing.com",
      "phone": "+1234567890"
    },
    "technician": {
      "id": "clx1234567890",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "profileImageUrl": "https://..."
    },
    "attachments": [...],
    "equipment": [...],
    "timeEntries": [
      {
        "id": "clx3333333333",
        "checkInAt": "2026-02-10T09:05:00.000Z",
        "checkInLat": 40.7128,
        "checkInLng": -74.0060,
        "checkOutAt": "2026-02-10T13:30:00.000Z",
        "checkOutLat": 40.7128,
        "checkOutLng": -74.0060,
        "technician": {
          "id": "clx1234567890",
          "firstName": "John",
          "lastName": "Doe"
        }
      }
    ]
  }
}
```

---

### Get Presigned URL for Work Order Attachment

**Endpoint:** `POST /work-orders/:workOrderId/attachments/presigned-url`  
**Authentication:** Required (JWT)  
**Description:** Get presigned URL for uploading photos or receipts to a work order.

**Path Parameters:**
- `workOrderId` (string, required): Work order ID

**Request:**
```json
{
  "fileName": "photo.jpg",
  "contentType": "image/jpeg",
  "attachmentType": "photo",
  "description": "Work site photo"
}
```

**Request Fields:**
- `fileName` (string, required): Name of the file
- `contentType` (string, required): MIME type (`image/jpeg`, `image/png`, `image/webp`, `application/pdf`)
- `attachmentType` (enum, required): `"photo"` or `"receipt"`
- `description` (string, optional): Description of the attachment

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "presignedUrl": "https://shotcaller-documents.s3.us-east-1.amazonaws.com/work-orders/wo123/photo/att_1234567890_abc123.jpg?X-Amz-Algorithm=...",
    "key": "work-orders/clx1234567890/photo/att_1736179200000_abc123.jpg",
    "publicUrl": "https://shotcaller-documents.s3.us-east-1.amazonaws.com/work-orders/clx1234567890/photo/att_1736179200000_abc123.jpg",
    "expiresIn": 3600
  }
}
```

**File Upload Flow:**
1. Request presigned URL
2. Upload file to S3 using PUT request:
   ```http
   PUT {presignedUrl}
   Content-Type: {contentType}
   Body: [binary file data]
   ```
3. Create attachment record (see next endpoint)

---

### Create Attachment Record

**Endpoint:** `POST /work-orders/:workOrderId/attachments`  
**Authentication:** Required (JWT)  
**Description:** Create an attachment record after uploading file to S3.

**Path Parameters:**
- `workOrderId` (string, required): Work order ID

**Request:**
```json
{
  "url": "https://shotcaller-documents.s3.us-east-1.amazonaws.com/work-orders/clx1234567890/photo/att_1736179200000_abc123.jpg",
  "type": "image/jpeg",
  "description": "Work site photo showing completed installation"
}
```

**Request Fields:**
- `url` (string, required): S3 public URL from presigned URL response
- `type` (string, optional): MIME type
- `description` (string, optional): Description

**Response (201 Created):**
```json
{
  "statusCode": 201,
  "data": {
    "id": "clx4444444444",
    "workOrderId": "clx1234567890",
    "url": "https://shotcaller-documents.s3.us-east-1.amazonaws.com/work-orders/clx1234567890/photo/att_1736179200000_abc123.jpg",
    "type": "image/jpeg",
    "description": "Work site photo showing completed installation",
    "createdAt": "2026-02-06T14:00:00.000Z"
  }
}
```

**Error Responses:**
- `404 Not Found`: Work order not found
  ```json
  {
    "statusCode": 404,
    "message": "Work order not found"
  }
  ```

---

## Admin/Manager Endpoints (Mobile & Web)

### Admin: List Whitelisted Employee Emails

**Endpoint:** `GET /admin/employees/whitelist`  
**Authentication:** Required (JWT - ADMIN role only)  
**Description:** Get list of all whitelisted email addresses and their account status.

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "email": "employee1@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "username": "employee1_123456",
      "role": "TECHNICIAN",
      "accountCreated": false,
      "createdAt": "2026-02-06T12:00:00.000Z",
      "updatedAt": "2026-02-06T12:00:00.000Z"
    },
    {
      "email": "employee2@example.com",
      "firstName": "Jane",
      "lastName": "Smith",
      "username": "employee2_789012",
      "role": "TECHNICIAN",
      "accountCreated": true,
      "createdAt": "2026-02-05T10:00:00.000Z",
      "updatedAt": "2026-02-05T15:30:00.000Z"
    }
  ]
}
```

**Response Fields:**
- `email` (string): Email address
- `firstName` (string): First name
- `lastName` (string): Last name
- `username` (string): Username (auto-generated if whitelisted only)
- `role` (enum): User role
- `accountCreated` (boolean): `true` if user has signed up, `false` if only whitelisted
- `createdAt` (datetime): When email was whitelisted
- `updatedAt` (datetime): Last update timestamp

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User is not an ADMIN

---

### Admin: Whitelist Single Email

**Endpoint:** `POST /admin/employees/whitelist`  
**Authentication:** Required (JWT - ADMIN role only)  
**Description:** Add an email address to the whitelist. User can then signup with this email.

**Request:**
```json
{
  "email": "newemployee@example.com",
  "firstName": "New",
  "lastName": "Employee"
}
```

**Request Fields:**
- `email` (string, required): Email address to whitelist
- `firstName` (string, optional): First name (can be set during signup)
- `lastName` (string, optional): Last name (can be set during signup)

**Response (201 Created):**
```json
{
  "statusCode": 201,
  "data": {
    "id": "clx5555555555",
    "email": "newemployee@example.com",
    "firstName": "New",
    "lastName": "Employee",
    "username": "newemployee_345678",
    "role": "TECHNICIAN",
    "whitelisted": true,
    "createdAt": "2026-02-06T15:00:00.000Z",
    "updatedAt": "2026-02-06T15:00:00.000Z"
  }
}
```

**Error Responses:**
- `409 Conflict`: Email already whitelisted
  ```json
  {
    "statusCode": 409,
    "message": "Email is already whitelisted"
  }
  ```

---

### Admin: Whitelist Multiple Emails (Bulk)

**Endpoint:** `POST /admin/employees/whitelist/bulk`  
**Authentication:** Required (JWT - ADMIN role only)  
**Description:** Add multiple email addresses to the whitelist at once.

**Request:**
```json
{
  "emails": [
    "employee1@example.com",
    "employee2@example.com",
    "employee3@example.com"
  ]
}
```

**Response (201 Created):**
```json
{
  "statusCode": 201,
  "data": [
    {
      "email": "employee1@example.com",
      "status": "success",
      "data": {
        "id": "clx1111111111",
        "email": "employee1@example.com",
        "whitelisted": true
      }
    },
    {
      "email": "employee2@example.com",
      "status": "error",
      "error": "Email is already whitelisted"
    },
    {
      "email": "employee3@example.com",
      "status": "success",
      "data": {
        "id": "clx3333333333",
        "email": "employee3@example.com",
        "whitelisted": true
      }
    }
  ]
}
```

---

### Admin: Create Employee Account Directly

**Endpoint:** `POST /admin/employees`  
**Authentication:** Required (JWT - ADMIN role only)  
**Description:** Create an employee account directly with email, name, and password. Employee can sign in immediately.

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "employee@example.com",
  "password": "SecurePass123",
  "phone": "+1234567890",
  "address": "123 Main St",
  "role": "TECHNICIAN"
}
```

**Request Fields:**
- `firstName` (string, required): 2-50 characters
- `lastName` (string, required): 2-50 characters
- `email` (string, required): Valid email, must be unique
- `password` (string, required): Min 8 characters
- `phone` (string, optional): Phone number
- `address` (string, optional): Address
- `role` (enum, optional): `ADMIN`, `MANAGER`, or `TECHNICIAN` (default: `TECHNICIAN`)

**Response (201 Created):**
```json
{
  "statusCode": 201,
  "data": {
    "id": "clx6666666666",
    "firstName": "John",
    "lastName": "Doe",
    "email": "employee@example.com",
    "username": "employee_456789",
    "phone": "+1234567890",
    "address": "123 Main St",
    "role": "TECHNICIAN",
    "whitelisted": true,
    "createdAt": "2026-02-06T16:00:00.000Z",
    "updatedAt": "2026-02-06T16:00:00.000Z"
  }
}
```

**Error Responses:**
- `409 Conflict`: Employee account already exists
  ```json
  {
    "statusCode": 409,
    "message": "Employee account already exists"
  }
  ```

---

### Admin: Remove Email from Whitelist

**Endpoint:** `DELETE /admin/employees/whitelist/:email`  
**Authentication:** Required (JWT - ADMIN role only)  
**Description:** Remove an email from whitelist. If account exists, it will be deactivated.

**Path Parameters:**
- `email` (string, required): Email address to remove (URL encoded)

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "message": "Email removed from whitelist",
    "email": "employee@example.com"
  }
}
```

OR (if account was activated):
```json
{
  "statusCode": 200,
  "data": {
    "message": "Email removed from whitelist (account deactivated)",
    "email": "employee@example.com"
  }
}
```

**Error Responses:**
- `404 Not Found`: Email not found
- `400 Bad Request`: Email is not whitelisted

---

### Get All Technicians

**Endpoint:** `GET /users/technicians`  
**Authentication:** Required (JWT)  
**Description:** Get list of all users with TECHNICIAN role. Used by admin/manager to assign work orders.

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "clx1234567890",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "role": "TECHNICIAN",
      "createdAt": "2026-02-06T12:00:00.000Z"
    }
  ]
}
```

---

### Get All Clients

**Endpoint:** `GET /clients`  
**Authentication:** Required (JWT)  
**Description:** Get list of all clients. Used for work order creation and management.

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "clx9876543210",
      "name": "ABC Manufacturing",
      "email": "contact@abcmanufacturing.com",
      "phone": "+1234567890",
      "address": "123 Industrial Blvd, City, State 12345",
      "notes": "Preferred contact: Jane Smith",
      "createdAt": "2026-02-01T10:00:00.000Z",
      "updatedAt": "2026-02-06T12:00:00.000Z"
    }
  ]
}
```

---

## File Upload Flows

### Profile Image Upload (During Signup)

**Step 1: Request Presigned URL**
```http
POST /api/v1/auth/presigned-url
Content-Type: application/json

{
  "fileName": "profile.jpg",
  "contentType": "image/jpeg",
  "uploadType": "profile"
}
```

**Step 2: Upload to S3**
```http
PUT {presignedUrl}
Content-Type: image/jpeg

[binary file data]
```

**Step 3: Sign Up with Image URL**
```http
POST /api/v1/auth/signup
Content-Type: application/json

{
  ...userData,
  "profileImageUrl": "{publicUrl}"
}
```

---

### Profile Image Upload (After Signin)

**Step 1: Request Presigned URL**
```http
POST /api/v1/auth/profile/presigned-url
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "fileName": "profile.jpg",
  "contentType": "image/jpeg"
}
```

**Step 2: Upload to S3**
```http
PUT {presignedUrl}
Content-Type: image/jpeg

[binary file data]
```

**Step 3: Update Profile Image URL**
```http
PATCH /api/v1/auth/profile/image
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "profileImageUrl": "{publicUrl}"
}
```

---

### Work Order Photo/Receipt Upload

**Step 1: Request Presigned URL**
```http
POST /api/v1/work-orders/{workOrderId}/attachments/presigned-url
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "fileName": "photo.jpg",
  "contentType": "image/jpeg",
  "attachmentType": "photo",
  "description": "Work site photo"
}
```

**Step 2: Upload to S3**
```http
PUT {presignedUrl}
Content-Type: image/jpeg

[binary file data]
```

**Step 3: Create Attachment Record**
```http
POST /api/v1/work-orders/{workOrderId}/attachments
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "url": "{publicUrl}",
  "type": "image/jpeg",
  "description": "Work site photo"
}
```

---

## Data Models

### User Model

```typescript
{
  id: string;                    // CUID format
  firstName: string;
  lastName: string;
  email: string;                 // Unique
  phone?: string;
  address?: string;
  username: string;               // Unique, alphanumeric + underscores
  password: string;               // Hashed (never returned in responses)
  profileImageUrl?: string;      // S3 URL
  role: "ADMIN" | "MANAGER" | "TECHNICIAN";
  whitelisted: boolean;           // Email whitelist status
  createdAt: string;             // ISO 8601 datetime
  updatedAt: string;             // ISO 8601 datetime
}
```

### Work Order Model

```typescript
{
  id: string;
  workOrderNumber: string;        // Unique (e.g., "WO-2026-001")
  scheduledAt: string;           // ISO 8601 datetime
  estimatedHours?: number;
  payRate?: number;
  facilityName: string;
  facilityAddress: string;
  pointOfContact?: string;
  tasks?: string;                 // Text or JSON
  notes?: string;
  status: "ACTIVE" | "COMPLETED" | "PAID";
  invoiceNumber?: string;         // Admin-only
  clientId?: string;
  technicianId?: string;
  templateId?: string;
  createdAt: string;
  updatedAt: string;
  
  // Relations (when included)
  client?: Client;
  technician?: User;
  attachments?: Attachment[];
  equipment?: WorkOrderEquipment[];
  timeEntries?: TimeEntry[];
}
```

### Attachment Model

```typescript
{
  id: string;
  workOrderId: string;
  url: string;                    // S3 public URL
  type?: string;                  // MIME type
  description?: string;
  createdAt: string;
}
```

### Time Entry Model

```typescript
{
  id: string;
  workOrderId: string;
  technicianId: string;
  checkInAt?: string;             // ISO 8601 datetime
  checkInLat?: number;             // GPS latitude
  checkInLng?: number;             // GPS longitude
  checkOutAt?: string;            // ISO 8601 datetime
  checkOutLat?: number;            // GPS latitude
  checkOutLng?: number;            // GPS longitude
  createdAt: string;
  updatedAt: string;
  
  // Relations (when included)
  technician?: User;
  edits?: TimeEntryEdit[];
}
```

### Client Model

```typescript
{
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

---

## Error Handling

### Standard Error Response Format

All errors follow this format:

```json
{
  "statusCode": 400,
  "message": "Error message",
  "errors": ["Detailed error 1", "Detailed error 2"]  // Optional, for validation errors
}
```

### HTTP Status Codes

- `200 OK`: Successful GET request
- `201 Created`: Successful POST request (resource created)
- `400 Bad Request`: Validation error or bad request
- `401 Unauthorized`: Missing or invalid authentication token, or email not whitelisted
- `403 Forbidden`: User doesn't have required role (e.g., ADMIN only)
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource already exists (e.g., duplicate email/username)
- `500 Internal Server Error`: Server error

### Common Error Scenarios

**1. Missing Authentication Token**
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

**2. Invalid Token**
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

**3. Email Not Whitelisted (Signup)**
```json
{
  "statusCode": 401,
  "message": "Email is not whitelisted. Please contact administrator."
}
```

**4. Account Not Whitelisted (Signin)**
```json
{
  "statusCode": 401,
  "message": "Your account is not authorized. Please contact administrator."
}
```

**5. Validation Error**
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    "email must be an email",
    "password must be longer than or equal to 8 characters",
    "username can only contain letters, numbers, and underscores"
  ]
}
```

**6. Insufficient Permissions**
```json
{
  "statusCode": 403,
  "message": "Forbidden - Admin access required"
}
```

---

## Common Patterns

### Authentication Header

For all protected endpoints, include the JWT token:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Response Wrapper

All successful responses are wrapped:

```json
{
  "statusCode": 200,
  "data": { ... }
}
```

### Date/Time Format

All dates are in ISO 8601 format (UTC):
```
2026-02-06T12:00:00.000Z
```

### Pagination

Currently not implemented. All list endpoints return all results. Consider implementing pagination for large datasets.

### Filtering & Sorting

Currently not implemented. Consider adding query parameters for filtering and sorting.

---

## Flutter Implementation Notes

### 1. HTTP Client Setup

```dart
// Use http package or dio
import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  final String baseUrl = 'http://localhost:3000/api/v1';
  String? accessToken;
  
  Map<String, String> get headers => {
    'Content-Type': 'application/json',
    if (accessToken != null) 'Authorization': 'Bearer $accessToken',
  };
}
```

### 2. File Upload to S3

```dart
// After getting presigned URL
Future<void> uploadToS3(String presignedUrl, File file, String contentType) async {
  final request = http.Request('PUT', Uri.parse(presignedUrl));
  request.headers['Content-Type'] = contentType;
  request.bodyBytes = await file.readAsBytes();
  
  final response = await request.send();
  if (response.statusCode == 200) {
    print('Upload successful');
  }
}
```

### 3. Error Handling

```dart
try {
  final response = await http.post(
    Uri.parse('$baseUrl/auth/signin'),
    headers: headers,
    body: jsonEncode({'username': username, 'password': password}),
  );
  
  if (response.statusCode == 200) {
    final data = jsonDecode(response.body);
    // Handle success
  } else {
    final error = jsonDecode(response.body);
    // Handle error: error['message'], error['errors']
  }
} catch (e) {
  // Handle network error
}
```

### 4. Token Storage

Store JWT tokens securely:
- **Flutter**: Use `flutter_secure_storage` package
- **Web**: Use `localStorage` or `sessionStorage`

### 5. GPS Location

For check-in/check-out:
```dart
import 'package:geolocator/geolocator.dart';

Future<Position> getCurrentLocation() async {
  bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
  if (!serviceEnabled) {
    // Handle location services disabled
  }
  
  LocationPermission permission = await Geolocator.checkPermission();
  if (permission == LocationPermission.denied) {
    permission = await Geolocator.requestPermission();
  }
  
  return await Geolocator.getCurrentPosition();
}
```

---

## Endpoints Summary

### Public Endpoints (No Authentication)
- `POST /auth/signup` - Register new user
- `POST /auth/signin` - Sign in
- `POST /auth/presigned-url` - Get profile image presigned URL (public)

### Technician Endpoints (JWT Required)
- `GET /work-orders/technician/:technicianId` - Get my work orders
- `GET /work-orders/:id` - Get work order details
- `POST /work-orders/:workOrderId/attachments/presigned-url` - Get attachment presigned URL
- `POST /work-orders/:workOrderId/attachments` - Create attachment record
- `POST /auth/profile/presigned-url` - Get profile image presigned URL
- `PATCH /auth/profile/image` - Update profile image

### Admin/Manager Endpoints (JWT + ADMIN/MANAGER Role)
- `GET /admin/employees/whitelist` - List whitelisted emails
- `POST /admin/employees/whitelist` - Whitelist single email
- `POST /admin/employees/whitelist/bulk` - Whitelist multiple emails
- `POST /admin/employees` - Create employee account
- `DELETE /admin/employees/whitelist/:email` - Remove from whitelist
- `GET /users/technicians` - Get all technicians
- `GET /clients` - Get all clients

---

## Notes for Flutter Developers

1. **Base URL**: Configure base URL in your app settings (development vs production)
2. **Token Management**: Store tokens securely and refresh when expired
3. **File Uploads**: Use presigned URLs for direct S3 uploads (don't upload through your server)
4. **GPS**: Request location permissions and capture coordinates only at check-in/check-out
5. **Error Handling**: Always check `statusCode` and handle errors appropriately
6. **Loading States**: Show loading indicators during API calls
7. **Offline Support**: Consider caching work orders for offline viewing
8. **Push Notifications**: Configure Firebase for push notifications (endpoints to be implemented)

---

## Missing Endpoints (To Be Implemented)

The following endpoints are planned but not yet implemented:

### Work Order Management
- `POST /work-orders` - Create work order (Admin/Manager)
- `PATCH /work-orders/:id` - Update work order (Admin/Manager)
- `DELETE /work-orders/:id` - Delete work order (Admin)
- `POST /work-orders/:id/duplicate` - Duplicate work order (Admin/Manager)
- ✅ `GET /work-orders` - List all work orders with filters (Admin/Manager) - **IMPLEMENTED**

### Work Order Templates
- `GET /work-order-templates` - List templates
- `POST /work-order-templates` - Create template
- `PATCH /work-order-templates/:id` - Update template
- `DELETE /work-order-templates/:id` - Delete template

### Time Tracking
- `POST /work-orders/:workOrderId/time-entries/check-in` - Check in (Technician)
- `POST /work-orders/:workOrderId/time-entries/check-out` - Check out (Technician)
- `GET /work-orders/:workOrderId/time-entries` - Get time entries
- `PATCH /time-entries/:id` - Edit time entry (Admin only, with audit)

### Client Management
- `POST /clients` - Create client (Admin/Manager)
- `PATCH /clients/:id` - Update client (Admin/Manager)
- `DELETE /clients/:id` - Delete client (Admin)

### User Management
- `GET /users` - List all users (Admin)
- `GET /users/:id` - Get user details (Admin)
- `PATCH /users/:id` - Update user (Admin)
- `DELETE /users/:id` - Delete user (Admin)

### Notifications
- `GET /notifications` - Get user notifications
- `PATCH /notifications/:id/read` - Mark notification as read
- `GET /notifications/unread-count` - Get unread count

### Reporting
- `GET /reports/work-orders` - Work order reports
- `GET /reports/time-summary` - Technician time summaries
- `GET /reports/export` - Export data (CSV)

---

## Testing

### Using Swagger UI

1. Start the backend server
2. Navigate to `http://localhost:3000/api/docs`
3. Use "Try it out" feature to test endpoints
4. Authorize with JWT token using "Authorize" button

### Using Postman/Insomnia

1. Import the Swagger JSON from `/api/docs-json`
2. Set base URL to `http://localhost:3000/api/v1`
3. Add JWT token to Authorization header for protected endpoints

---

## Support

For API questions or issues, refer to:
- Swagger UI: `http://localhost:3000/api/docs`
- API Documentation: This file
- Email Whitelist Guide: `EMAIL_WHITELIST_GUIDE.md`
