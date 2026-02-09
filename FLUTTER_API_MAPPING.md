# Flutter AppConstants API Mapping

This document maps Flutter AppConstants endpoints to backend API endpoints.

## Base URL
```dart
static const String apiBaseUrl = 'http://192.168.1.73:3000/api/v1';
```

---

## Auth Endpoints

### ✅ Sign Up
**Flutter:** `apiSignupEndpoint = '/auth/signup'`  
**Backend:** `POST /auth/signup`  
**Status:** ✅ Implemented  
**Auth:** Not required (Public)

### ✅ Sign In
**Flutter:** `apiSigninEndpoint = '/auth/signin'`  
**Backend:** `POST /auth/signin`  
**Status:** ✅ Implemented  
**Auth:** Not required (Public)

### ✅ Presigned URL (Public - for signup)
**Flutter:** `apiPresignedUrlEndpoint = '/auth/presigned-url'`  
**Backend:** `POST /auth/presigned-url`  
**Status:** ✅ Implemented  
**Auth:** Not required (Public)

### ✅ Profile Presigned URL (Authenticated)
**Flutter:** `apiProfilePresignedUrlEndpoint = '/auth/profile/presigned-url'`  
**Backend:** `POST /auth/profile/presigned-url`  
**Status:** ✅ Implemented  
**Auth:** Required (JWT)

### ✅ Update Profile Image
**Flutter:** `apiUpdateProfileImageEndpoint = '/auth/profile/image'`  
**Backend:** `PATCH /auth/profile/image`  
**Status:** ✅ Implemented  
**Auth:** Required (JWT)  
**Note:** Uses PATCH method, not POST

---

## Work Order Endpoints

### ✅ List All Work Orders (Admin/Manager)
**Backend:** `GET /work-orders`  
**Status:** ✅ Implemented  
**Auth:** Required (JWT)  
**Role:** ADMIN or MANAGER  
**Description:** List all work orders with filters, pagination, and sorting. Query parameters: status, technicianId, clientId, scheduledFrom, scheduledTo, workOrderNumber, page, limit, sortBy, sortOrder.

### ✅ Get My Work Orders
**Flutter:** `apiTechnicianWorkOrdersEndpoint = '/work-orders/technician'`  
**Backend:** `GET /work-orders/technician`  
**Status:** ✅ Implemented  
**Auth:** Required (JWT)  
**Description:** Returns work orders for authenticated technician. Active orders prioritized.

### ✅ Get Work Order Details
**Flutter:** `apiWorkOrderDetailsEndpoint = '/work-orders'`  
**Backend:** `GET /work-orders/:id`  
**Status:** ✅ Implemented  
**Auth:** Required (JWT)  
**Usage:** `GET /work-orders/{workOrderId}`

### ✅ Get Attachment Presigned URL
**Flutter:** `apiAttachmentPresignedUrlEndpoint = '/work-orders'`  
**Backend:** `POST /work-orders/:workOrderId/attachments/presigned-url`  
**Status:** ✅ Implemented  
**Auth:** Required (JWT)  
**Usage:** `POST /work-orders/{workOrderId}/attachments/presigned-url`

### ✅ Create Attachment
**Flutter:** `apiCreateAttachmentEndpoint = '/work-orders'`  
**Backend:** `POST /work-orders/:workOrderId/attachments`  
**Status:** ✅ Implemented  
**Auth:** Required (JWT)  
**Usage:** `POST /work-orders/{workOrderId}/attachments`

---

## Admin Endpoints

### ✅ List Whitelisted Emails
**Flutter:** `apiWhitelistEndpoint = '/admin/employees/whitelist'`  
**Backend:** `GET /admin/employees/whitelist`  
**Status:** ✅ Implemented  
**Auth:** Required (JWT)  
**Role:** ADMIN

### ✅ Bulk Whitelist Emails
**Flutter:** `apiBulkWhitelistEndpoint = '/admin/employees/whitelist/bulk'`  
**Backend:** `POST /admin/employees/whitelist/bulk`  
**Status:** ✅ Implemented  
**Auth:** Required (JWT)  
**Role:** ADMIN

### ✅ Create Employee
**Flutter:** `apiCreateEmployeeEndpoint = '/admin/employees'`  
**Backend:** `POST /admin/employees`  
**Status:** ✅ Implemented  
**Auth:** Required (JWT)  
**Role:** ADMIN

### ✅ Get All Technicians
**Flutter:** `apiTechniciansEndpoint = '/users/technicians'`  
**Backend:** `GET /users/technicians`  
**Status:** ✅ Implemented  
**Auth:** Required (JWT)  
**Role:** Any authenticated user

---

## Client Endpoints

### ✅ Get All Clients
**Flutter:** `apiClientsEndpoint = '/clients'`  
**Backend:** `GET /clients`  
**Status:** ✅ Implemented  
**Auth:** Required (JWT)  
**Role:** Any authenticated user

---

## Complete Endpoint List

| Flutter Constant | Method | Endpoint | Auth | Role | Status |
|------------------|--------|----------|------|------|--------|
| `apiSignupEndpoint` | POST | `/auth/signup` | ❌ | - | ✅ |
| `apiSigninEndpoint` | POST | `/auth/signin` | ❌ | - | ✅ |
| `apiPresignedUrlEndpoint` | POST | `/auth/presigned-url` | ❌ | - | ✅ |
| `apiProfilePresignedUrlEndpoint` | POST | `/auth/profile/presigned-url` | ✅ | Any | ✅ |
| `apiUpdateProfileImageEndpoint` | PATCH | `/auth/profile/image` | ✅ | Any | ✅ |
| `apiTechnicianWorkOrdersEndpoint` | GET | `/work-orders/technician` | ✅ | Any | ✅ |
| `apiWorkOrderDetailsEndpoint` | GET | `/work-orders/:id` | ✅ | Any | ✅ |
| `apiAttachmentPresignedUrlEndpoint` | POST | `/work-orders/:id/attachments/presigned-url` | ✅ | Any | ✅ |
| `apiCreateAttachmentEndpoint` | POST | `/work-orders/:id/attachments` | ✅ | Any | ✅ |
| `apiWhitelistEndpoint` | GET | `/admin/employees/whitelist` | ✅ | ADMIN | ✅ |
| `apiBulkWhitelistEndpoint` | POST | `/admin/employees/whitelist/bulk` | ✅ | ADMIN | ✅ |
| `apiCreateEmployeeEndpoint` | POST | `/admin/employees` | ✅ | ADMIN | ✅ |
| `apiTechniciansEndpoint` | GET | `/users/technicians` | ✅ | Any | ✅ |
| `apiClientsEndpoint` | GET | `/clients` | ✅ | Any | ✅ |

---

## Usage Examples

### Sign Up Flow
```dart
// 1. Get presigned URL (optional)
POST ${AppConstants.apiBaseUrl}${AppConstants.apiPresignedUrlEndpoint}
Body: {
  "fileName": "profile.jpg",
  "contentType": "image/jpeg",
  "uploadType": "profile"
}

// 2. Upload to S3 using presignedUrl (PUT request)

// 3. Sign up with profileImageUrl
POST ${AppConstants.apiBaseUrl}${AppConstants.apiSignupEndpoint}
Body: {
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "SecurePass123",
  "profileImageUrl": "{publicUrl}"
}
```

### Get My Work Orders
```dart
GET ${AppConstants.apiBaseUrl}${AppConstants.apiTechnicianWorkOrdersEndpoint}
Headers: {
  "Authorization": "Bearer {accessToken}"
}
```

### Create Attachment Flow
```dart
// 1. Get presigned URL
POST ${AppConstants.apiBaseUrl}/work-orders/{workOrderId}/attachments/presigned-url
Headers: {
  "Authorization": "Bearer {accessToken}"
}
Body: {
  "fileName": "photo.jpg",
  "contentType": "image/jpeg",
  "attachmentType": "photo",
  "description": "Work site photo"
}

// 2. Upload to S3 using presignedUrl (PUT request)

// 3. Create attachment record
POST ${AppConstants.apiBaseUrl}/work-orders/{workOrderId}/attachments
Headers: {
  "Authorization": "Bearer {accessToken}"
}
Body: {
  "url": "{publicUrl}",
  "type": "image/jpeg",
  "description": "Work site photo"
}
```

---

## Notes

1. **All endpoints are prefixed with** `/api/v1` (configured in `API_PREFIX`)
2. **Base URL** should be set to your server's IP address for mobile devices
3. **Authentication** is done via JWT Bearer token in Authorization header
4. **File uploads** use presigned URLs - client uploads directly to S3, then creates record in backend
5. **Work orders** are automatically sorted with ACTIVE status first, then by scheduled date

---

## Testing

All endpoints are documented in Swagger UI:
- Local: `http://localhost:3000/api/docs`
- Network: `http://192.168.1.73:3000/api/docs`

Use Swagger to test endpoints and see request/response examples.
