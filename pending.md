# Pending Backend Implementation Tasks

**Base URL:** `http://localhost:3000/api/v1` (or production URL)  
**API Version:** v1  
**Content-Type:** `application/json`  
**Authentication:** JWT Bearer Token (for protected endpoints)

**Standard Headers:**
```
Content-Type: application/json
Authorization: Bearer {accessToken}
```

**Standard Response Wrapper:**
```json
{
  "statusCode": 200,
  "data": { ... }
}
```

**Standard Error Response:**
```json
{
  "statusCode": 400,
  "message": "Error message",
  "errors": ["Detailed error 1", "Detailed error 2"]  // Optional, for validation errors
}
```

---

## Table of Contents

1. [Work Order Management](#work-order-management)
2. [Work Order Templates](#work-order-templates)
3. [Time Tracking](#time-tracking)
4. [Client Management](#client-management)
5. [User Management](#user-management)
6. [Notifications](#notifications)
7. [Reporting](#reporting)
8. [Additional Features](#additional-features)

---

## Work Order Management

### 1. Create Work Order

**Endpoint:** `POST /work-orders`  
**Authentication:** Required (JWT - ADMIN or MANAGER role)  
**Description:** Create a new work order and assign it to a technician.

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "scheduledAt": "2026-02-10T09:00:00.000Z",
  "estimatedHours": 4.5,
  "payRate": 25.0,
  "facilityName": "ABC Manufacturing",
  "facilityAddress": "123 Industrial Blvd, City, State 12345",
  "pointOfContact": "Jane Smith",
  "tasks": "Install new equipment\nTest functionality",
  "notes": "Customer requested early morning start",
  "clientId": "clx9876543210",
  "technicianId": "clx1234567890",
  "templateId": null
}
```

**Request Fields:**
- `scheduledAt` (string, required): ISO 8601 datetime
- `estimatedHours` (number, optional): Estimated hours to complete
- `payRate` (number, optional): Pay rate per hour
- `facilityName` (string, required): Name of the facility
- `facilityAddress` (string, required): Full address
- `pointOfContact` (string, optional): Contact person name
- `tasks` (string, optional): Task description (multiline supported)
- `notes` (string, optional): Additional notes
- `clientId` (string, required): Client ID
- `technicianId` (string, required): Technician user ID
- `templateId` (string, optional): Work order template ID

**Response (201 Created):**
```json
{
  "statusCode": 201,
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
    "clientId": "clx9876543210",
    "technicianId": "clx1234567890",
    "templateId": null,
    "createdAt": "2026-02-06T12:00:00.000Z",
    "updatedAt": "2026-02-06T12:00:00.000Z",
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
      "email": "john.doe@example.com"
    }
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User does not have ADMIN or MANAGER role
- `404 Not Found`: Client or technician not found

---

### 2. Update Work Order

**Endpoint:** `PATCH /work-orders/:id`  
**Authentication:** Required (JWT - ADMIN or MANAGER role)  
**Description:** Update an existing work order.

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer {accessToken}
```

**Path Parameters:**
- `id` (string, required): Work order ID

**Request Body:** (All fields optional - only include fields to update)
```json
{
  "scheduledAt": "2026-02-11T09:00:00.000Z",
  "estimatedHours": 5.0,
  "payRate": 26.0,
  "facilityName": "Updated Facility Name",
  "facilityAddress": "Updated Address",
  "pointOfContact": "Updated Contact",
  "tasks": "Updated tasks",
  "notes": "Updated notes",
  "clientId": "clx9876543210",
  "technicianId": "clx1234567890",
  "status": "COMPLETED"
}
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "id": "clx1234567890",
    "workOrderNumber": "WO-2026-001",
    "scheduledAt": "2026-02-11T09:00:00.000Z",
    "estimatedHours": 5.0,
    "payRate": 26.0,
    "facilityName": "Updated Facility Name",
    "facilityAddress": "Updated Address",
    "pointOfContact": "Updated Contact",
    "tasks": "Updated tasks",
    "notes": "Updated notes",
    "status": "COMPLETED",
    "updatedAt": "2026-02-06T15:00:00.000Z",
    ...
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User does not have ADMIN or MANAGER role
- `404 Not Found`: Work order not found

---

### 3. Delete Work Order

**Endpoint:** `DELETE /work-orders/:id`  
**Authentication:** Required (JWT - ADMIN role only)  
**Description:** Delete a work order (soft delete recommended).

**Request Headers:**
```
Authorization: Bearer {accessToken}
```

**Path Parameters:**
- `id` (string, required): Work order ID

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "message": "Work order deleted successfully",
    "id": "clx1234567890"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User does not have ADMIN role
- `404 Not Found`: Work order not found

---

### 4. Duplicate Work Order

**Endpoint:** `POST /work-orders/:id/duplicate`  
**Authentication:** Required (JWT - ADMIN or MANAGER role)  
**Description:** Create a duplicate of an existing work order with optional modifications.

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer {accessToken}
```

**Path Parameters:**
- `id` (string, required): Work order ID to duplicate

**Request Body:** (All fields optional - override defaults from original)
```json
{
  "scheduledAt": "2026-02-15T09:00:00.000Z",
  "technicianId": "clx1234567890",
  "status": "ACTIVE"
}
```

**Response (201 Created):**
```json
{
  "statusCode": 201,
  "data": {
    "id": "clx9999999999",
    "workOrderNumber": "WO-2026-002",
    "scheduledAt": "2026-02-15T09:00:00.000Z",
    ...
  }
}
```

---

## Work Order Templates

### 1. List Work Order Templates

**Endpoint:** `GET /work-order-templates`  
**Authentication:** Required (JWT - ADMIN or MANAGER role)  
**Description:** Get list of all work order templates.

**Request Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "clx1111111111",
      "name": "Standard Installation",
      "description": "Template for standard equipment installation",
      "estimatedHours": 4.0,
      "payRate": 25.0,
      "tasks": "Install equipment\nTest functionality\nDocument results",
      "notes": "Standard installation template",
      "createdAt": "2026-02-01T10:00:00.000Z",
      "updatedAt": "2026-02-01T10:00:00.000Z"
    }
  ]
}
```

---

### 2. Create Work Order Template

**Endpoint:** `POST /work-order-templates`  
**Authentication:** Required (JWT - ADMIN or MANAGER role)

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "name": "Standard Installation",
  "description": "Template for standard equipment installation",
  "estimatedHours": 4.0,
  "payRate": 25.0,
  "tasks": "Install equipment\nTest functionality\nDocument results",
  "notes": "Standard installation template"
}
```

**Response (201 Created):**
```json
{
  "statusCode": 201,
  "data": {
    "id": "clx1111111111",
    "name": "Standard Installation",
    "description": "Template for standard equipment installation",
    "estimatedHours": 4.0,
    "payRate": 25.0,
    "tasks": "Install equipment\nTest functionality\nDocument results",
    "notes": "Standard installation template",
    "createdAt": "2026-02-01T10:00:00.000Z",
    "updatedAt": "2026-02-01T10:00:00.000Z"
  }
}
```

---

### 3. Update Work Order Template

**Endpoint:** `PATCH /work-order-templates/:id`  
**Authentication:** Required (JWT - ADMIN or MANAGER role)

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer {accessToken}
```

**Path Parameters:**
- `id` (string, required): Template ID

**Request Body:** (All fields optional)

**Response (200 OK):** Same format as create

---

### 4. Delete Work Order Template

**Endpoint:** `DELETE /work-order-templates/:id`  
**Authentication:** Required (JWT - ADMIN or MANAGER role)

**Request Headers:**
```
Authorization: Bearer {accessToken}
```

**Path Parameters:**
- `id` (string, required): Template ID

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "message": "Template deleted successfully",
    "id": "clx1111111111"
  }
}
```

---

## Time Tracking

### 1. Check In

**Endpoint:** `POST /work-orders/:workOrderId/time-entries/check-in`  
**Authentication:** Required (JWT - TECHNICIAN role)  
**Description:** Record check-in time and location for a work order.

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer {accessToken}
```

**Path Parameters:**
- `workOrderId` (string, required): Work order ID

**Request Body:**
```json
{
  "checkInLat": 40.7128,
  "checkInLng": -74.0060
}
```

**Request Fields:**
- `checkInLat` (number, required): GPS latitude
- `checkInLng` (number, required): GPS longitude

**Response (201 Created):**
```json
{
  "statusCode": 201,
  "data": {
    "id": "clx3333333333",
    "workOrderId": "clx1234567890",
    "technicianId": "clx1234567890",
    "checkInAt": "2026-02-10T09:05:00.000Z",
    "checkInLat": 40.7128,
    "checkInLng": -74.0060,
    "checkOutAt": null,
    "checkOutLat": null,
    "checkOutLng": null,
    "createdAt": "2026-02-10T09:05:00.000Z",
    "updatedAt": "2026-02-10T09:05:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Already checked in or validation error
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: Work order not assigned to this technician
- `404 Not Found`: Work order not found

---

### 2. Check Out

**Endpoint:** `POST /work-orders/:workOrderId/time-entries/check-out`  
**Authentication:** Required (JWT - TECHNICIAN role)  
**Description:** Record check-out time and location for a work order.

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer {accessToken}
```

**Path Parameters:**
- `workOrderId` (string, required): Work order ID

**Request Body:**
```json
{
  "checkOutLat": 40.7128,
  "checkOutLng": -74.0060
}
```

**Request Fields:**
- `checkOutLat` (number, required): GPS latitude
- `checkOutLng` (number, required): GPS longitude

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "id": "clx3333333333",
    "workOrderId": "clx1234567890",
    "technicianId": "clx1234567890",
    "checkInAt": "2026-02-10T09:05:00.000Z",
    "checkInLat": 40.7128,
    "checkInLng": -74.0060,
    "checkOutAt": "2026-02-10T13:30:00.000Z",
    "checkOutLat": 40.7128,
    "checkOutLng": -74.0060,
    "totalHours": 4.42,
    "updatedAt": "2026-02-10T13:30:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Not checked in or already checked out
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: Work order not assigned to this technician
- `404 Not Found`: Work order or time entry not found

---

### 3. Get Time Entries

**Endpoint:** `GET /work-orders/:workOrderId/time-entries`  
**Authentication:** Required (JWT)  
**Description:** Get all time entries for a work order.

**Request Headers:**
```
Authorization: Bearer {accessToken}
```

**Path Parameters:**
- `workOrderId` (string, required): Work order ID

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "clx3333333333",
      "workOrderId": "clx1234567890",
      "technicianId": "clx1234567890",
      "checkInAt": "2026-02-10T09:05:00.000Z",
      "checkInLat": 40.7128,
      "checkInLng": -74.0060,
      "checkOutAt": "2026-02-10T13:30:00.000Z",
      "checkOutLat": 40.7128,
      "checkOutLng": -74.0060,
      "totalHours": 4.42,
      "technician": {
        "id": "clx1234567890",
        "firstName": "John",
        "lastName": "Doe"
      },
      "createdAt": "2026-02-10T09:05:00.000Z",
      "updatedAt": "2026-02-10T13:30:00.000Z"
    }
  ]
}
```

---

### 4. Edit Time Entry (Admin Only)

**Endpoint:** `PATCH /time-entries/:id`  
**Authentication:** Required (JWT - ADMIN role only)  
**Description:** Edit a time entry with audit trail.

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer {accessToken}
```

**Path Parameters:**
- `id` (string, required): Time entry ID

**Request Body:**
```json
{
  "checkInAt": "2026-02-10T09:00:00.000Z",
  "checkOutAt": "2026-02-10T13:00:00.000Z",
  "reason": "Corrected time due to system error"
}
```

**Request Fields:**
- `checkInAt` (string, optional): Updated check-in time (ISO 8601)
- `checkOutAt` (string, optional): Updated check-out time (ISO 8601)
- `reason` (string, required): Reason for edit (for audit trail)

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "id": "clx3333333333",
    "workOrderId": "clx1234567890",
    "technicianId": "clx1234567890",
    "checkInAt": "2026-02-10T09:00:00.000Z",
    "checkOutAt": "2026-02-10T13:00:00.000Z",
    "totalHours": 4.0,
    "editedBy": "clx9999999999",
    "editReason": "Corrected time due to system error",
    "editedAt": "2026-02-10T14:00:00.000Z",
    "updatedAt": "2026-02-10T14:00:00.000Z"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User does not have ADMIN role
- `404 Not Found`: Time entry not found

---

## Client Management

### 1. Create Client

**Endpoint:** `POST /clients`  
**Authentication:** Required (JWT - ADMIN or MANAGER role)  
**Description:** Create a new client.

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "name": "ABC Manufacturing",
  "email": "contact@abcmanufacturing.com",
  "phone": "+1234567890",
  "address": "123 Industrial Blvd, City, State 12345",
  "notes": "Preferred contact: Jane Smith"
}
```

**Request Fields:**
- `name` (string, required): Client name
- `email` (string, optional): Contact email
- `phone` (string, optional): Contact phone
- `address` (string, optional): Client address
- `notes` (string, optional): Additional notes

**Response (201 Created):**
```json
{
  "statusCode": 201,
  "data": {
    "id": "clx9876543210",
    "name": "ABC Manufacturing",
    "email": "contact@abcmanufacturing.com",
    "phone": "+1234567890",
    "address": "123 Industrial Blvd, City, State 12345",
    "notes": "Preferred contact: Jane Smith",
    "createdAt": "2026-02-01T10:00:00.000Z",
    "updatedAt": "2026-02-01T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User does not have ADMIN or MANAGER role
- `409 Conflict`: Client with this email already exists

---

### 2. Update Client

**Endpoint:** `PATCH /clients/:id`  
**Authentication:** Required (JWT - ADMIN or MANAGER role)

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer {accessToken}
```

**Path Parameters:**
- `id` (string, required): Client ID

**Request Body:** (All fields optional)

**Response (200 OK):** Same format as create

---

### 3. Delete Client

**Endpoint:** `DELETE /clients/:id`  
**Authentication:** Required (JWT - ADMIN role only)

**Request Headers:**
```
Authorization: Bearer {accessToken}
```

**Path Parameters:**
- `id` (string, required): Client ID

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "message": "Client deleted successfully",
    "id": "clx9876543210"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Client has associated work orders
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User does not have ADMIN role
- `404 Not Found`: Client not found

---

### 4. Get Client Details

**Endpoint:** `GET /clients/:id`  
**Authentication:** Required (JWT)

**Request Headers:**
```
Authorization: Bearer {accessToken}
```

**Path Parameters:**
- `id` (string, required): Client ID

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "id": "clx9876543210",
    "name": "ABC Manufacturing",
    "email": "contact@abcmanufacturing.com",
    "phone": "+1234567890",
    "address": "123 Industrial Blvd, City, State 12345",
    "notes": "Preferred contact: Jane Smith",
    "workOrdersCount": 5,
    "createdAt": "2026-02-01T10:00:00.000Z",
    "updatedAt": "2026-02-06T12:00:00.000Z"
  }
}
```

---

## User Management

### 1. List All Users

**Endpoint:** `GET /users`  
**Authentication:** Required (JWT - ADMIN role only)  
**Description:** Get list of all users with optional filters.

**Request Headers:**
```
Authorization: Bearer {accessToken}
```

**Query Parameters:**
- `role` (string, optional): Filter by role (`ADMIN`, `MANAGER`, `TECHNICIAN`)
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 20)
- `search` (string, optional): Search by name, email, or username

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "data": [
      {
        "id": "clx1234567890",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "username": "johndoe",
        "phone": "+1234567890",
        "address": "123 Main St",
        "profileImageUrl": "https://...",
        "role": "TECHNICIAN",
        "whitelisted": true,
        "createdAt": "2026-02-06T12:00:00.000Z",
        "updatedAt": "2026-02-06T12:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "totalPages": 3
    }
  }
}
```

---

### 2. Get User Details

**Endpoint:** `GET /users/:id`  
**Authentication:** Required (JWT - ADMIN role only)

**Request Headers:**
```
Authorization: Bearer {accessToken}
```

**Path Parameters:**
- `id` (string, required): User ID

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
    "phone": "+1234567890",
    "address": "123 Main St",
    "profileImageUrl": "https://...",
    "role": "TECHNICIAN",
    "whitelisted": true,
    "workOrdersCount": 15,
    "createdAt": "2026-02-06T12:00:00.000Z",
    "updatedAt": "2026-02-06T12:00:00.000Z"
  }
}
```

---

### 3. Update User

**Endpoint:** `PATCH /users/:id`  
**Authentication:** Required (JWT - ADMIN role only)

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer {accessToken}
```

**Path Parameters:**
- `id` (string, required): User ID

**Request Body:** (All fields optional)
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "address": "123 Main St",
  "role": "MANAGER"
}
```

**Response (200 OK):** Same format as get user details

**Error Responses:**
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User does not have ADMIN role
- `404 Not Found`: User not found
- `409 Conflict`: Email or username already exists

---

### 4. Delete User

**Endpoint:** `DELETE /users/:id`  
**Authentication:** Required (JWT - ADMIN role only)

**Request Headers:**
```
Authorization: Bearer {accessToken}
```

**Path Parameters:**
- `id` (string, required): User ID

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "message": "User deleted successfully",
    "id": "clx1234567890"
  }
}
```

**Error Responses:**
- `400 Bad Request`: User has associated work orders
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User does not have ADMIN role
- `404 Not Found`: User not found

---

## Notifications

### 1. Get User Notifications

**Endpoint:** `GET /notifications`  
**Authentication:** Required (JWT)  
**Description:** Get notifications for the authenticated user.

**Request Headers:**
```
Authorization: Bearer {accessToken}
```

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 20)
- `unreadOnly` (boolean, optional): Filter unread notifications only (default: false)

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "data": [
      {
        "id": "clx7777777777",
        "userId": "clx1234567890",
        "type": "WORK_ORDER_ASSIGNED",
        "title": "New Work Order Assigned",
        "message": "You have been assigned work order WO-2026-001",
        "read": false,
        "workOrderId": "clx1234567890",
        "createdAt": "2026-02-06T12:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 10,
      "totalPages": 1
    }
  }
}
```

**Notification Types:**
- `WORK_ORDER_ASSIGNED`: New work order assigned
- `WORK_ORDER_UPDATED`: Work order updated
- `WORK_ORDER_COMPLETED`: Work order completed
- `TIME_ENTRY_REQUIRES_APPROVAL`: Time entry needs admin approval
- `SYSTEM_NOTIFICATION`: General system notification

---

### 2. Mark Notification as Read

**Endpoint:** `PATCH /notifications/:id/read`  
**Authentication:** Required (JWT)

**Request Headers:**
```
Authorization: Bearer {accessToken}
```

**Path Parameters:**
- `id` (string, required): Notification ID

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "id": "clx7777777777",
    "read": true,
    "readAt": "2026-02-06T13:00:00.000Z"
  }
}
```

---

### 3. Get Unread Count

**Endpoint:** `GET /notifications/unread-count`  
**Authentication:** Required (JWT)

**Request Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "unreadCount": 5
  }
}
```

---

## Reporting

### 1. Work Order Reports

**Endpoint:** `GET /reports/work-orders`  
**Authentication:** Required (JWT - ADMIN or MANAGER role)  
**Description:** Generate work order reports with filters.

**Request Headers:**
```
Authorization: Bearer {accessToken}
```

**Query Parameters:**
- `startDate` (string, optional): Start date (ISO 8601)
- `endDate` (string, optional): End date (ISO 8601)
- `status` (string, optional): Filter by status (`ACTIVE`, `COMPLETED`, `PAID`)
- `technicianId` (string, optional): Filter by technician
- `clientId` (string, optional): Filter by client
- `groupBy` (string, optional): Group by (`technician`, `client`, `status`, `date`)

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "summary": {
      "totalWorkOrders": 100,
      "activeWorkOrders": 25,
      "completedWorkOrders": 60,
      "paidWorkOrders": 15,
      "totalRevenue": 15000.00,
      "totalHours": 400.5
    },
    "byTechnician": [
      {
        "technicianId": "clx1234567890",
        "technicianName": "John Doe",
        "workOrdersCount": 15,
        "totalHours": 60.5,
        "totalRevenue": 1512.50
      }
    ],
    "byClient": [
      {
        "clientId": "clx9876543210",
        "clientName": "ABC Manufacturing",
        "workOrdersCount": 10,
        "totalRevenue": 2500.00
      }
    ],
    "period": {
      "startDate": "2026-01-01T00:00:00.000Z",
      "endDate": "2026-02-01T00:00:00.000Z"
    }
  }
}
```

---

### 2. Technician Time Summary

**Endpoint:** `GET /reports/time-summary`  
**Authentication:** Required (JWT - ADMIN or MANAGER role)  
**Description:** Get time tracking summary for technicians.

**Request Headers:**
```
Authorization: Bearer {accessToken}
```

**Query Parameters:**
- `startDate` (string, optional): Start date (ISO 8601)
- `endDate` (string, optional): End date (ISO 8601)
- `technicianId` (string, optional): Filter by specific technician

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "summary": {
      "totalHours": 400.5,
      "totalWorkOrders": 50,
      "averageHoursPerWorkOrder": 8.01
    },
    "technicians": [
      {
        "technicianId": "clx1234567890",
        "technicianName": "John Doe",
        "totalHours": 120.5,
        "workOrdersCount": 15,
        "averageHoursPerWorkOrder": 8.03,
        "earnings": 3012.50
      }
    ],
    "period": {
      "startDate": "2026-01-01T00:00:00.000Z",
      "endDate": "2026-02-01T00:00:00.000Z"
    }
  }
}
```

---

### 3. Export Data (CSV)

**Endpoint:** `GET /reports/export`  
**Authentication:** Required (JWT - ADMIN or MANAGER role)  
**Description:** Export data as CSV file.

**Request Headers:**
```
Authorization: Bearer {accessToken}
```

**Query Parameters:**
- `type` (string, required): Export type (`work-orders`, `time-entries`, `clients`, `users`)
- `startDate` (string, optional): Start date (ISO 8601)
- `endDate` (string, optional): End date (ISO 8601)
- `format` (string, optional): Export format (`csv`, `xlsx`) (default: `csv`)

**Response (200 OK):**
```
Content-Type: text/csv; charset=utf-8
Content-Disposition: attachment; filename="work-orders-2026-02-06.csv"

workOrderNumber,scheduledAt,facilityName,technician,status,estimatedHours,payRate
WO-2026-001,2026-02-10T09:00:00.000Z,ABC Manufacturing,John Doe,ACTIVE,4.5,25.0
...
```

---

## Additional Features

### 1. Refresh Token Endpoint

**Endpoint:** `POST /auth/refresh`  
**Authentication:** Not required (Public)  
**Description:** Refresh access token using refresh token.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 2. Password Reset Request

**Endpoint:** `POST /auth/password-reset/request`  
**Authentication:** Not required (Public)  
**Description:** Request password reset email.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "message": "Password reset email sent"
  }
}
```

---

### 3. Password Reset Confirm

**Endpoint:** `POST /auth/password-reset/confirm`  
**Authentication:** Not required (Public)  
**Description:** Confirm password reset with token.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "token": "reset-token-from-email",
  "newPassword": "NewSecurePass123"
}
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "message": "Password reset successfully"
  }
}
```

---

### 4. Update User Profile

**Endpoint:** `PATCH /auth/profile`  
**Authentication:** Required (JWT)  
**Description:** Update authenticated user's profile.

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer {accessToken}
```

**Request Body:** (All fields optional)
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": "123 Main St"
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
    "phone": "+1234567890",
    "address": "123 Main St",
    "profileImageUrl": "https://...",
    "role": "TECHNICIAN",
    "updatedAt": "2026-02-06T15:00:00.000Z"
  }
}
```

---

### 5. Change Password

**Endpoint:** `POST /auth/change-password`  
**Authentication:** Required (JWT)  
**Description:** Change user's password.

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "currentPassword": "OldPassword123",
  "newPassword": "NewPassword123"
}
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "message": "Password changed successfully"
  }
}
```

---

## Implementation Priority

### High Priority (Core Features)
1. ✅ **GET /work-orders** - List all work orders with filters (Already implemented)
2. **POST /work-orders** - Create work order
3. **PATCH /work-orders/:id** - Update work order
4. **POST /work-orders/:workOrderId/time-entries/check-in** - Check in
5. **POST /work-orders/:workOrderId/time-entries/check-out** - Check out
6. **POST /clients** - Create client
7. **PATCH /clients/:id** - Update client
8. **GET /clients/:id** - Get client details

### Medium Priority (Important Features)
1. **DELETE /work-orders/:id** - Delete work order
2. **POST /work-orders/:id/duplicate** - Duplicate work order
3. **GET /work-orders/:workOrderId/time-entries** - Get time entries
4. **PATCH /time-entries/:id** - Edit time entry
5. **GET /users** - List all users
6. **GET /users/:id** - Get user details
7. **PATCH /users/:id** - Update user
8. **GET /notifications** - Get notifications
9. **PATCH /notifications/:id/read** - Mark as read

### Low Priority (Nice to Have)
1. **GET /work-order-templates** - List templates
2. **POST /work-order-templates** - Create template
3. **PATCH /work-order-templates/:id** - Update template
4. **DELETE /work-order-templates/:id** - Delete template
5. **DELETE /clients/:id** - Delete client
6. **DELETE /users/:id** - Delete user
7. **GET /reports/work-orders** - Work order reports
8. **GET /reports/time-summary** - Time summary
9. **GET /reports/export** - Export data
10. **POST /auth/refresh** - Refresh token
11. **POST /auth/password-reset/request** - Password reset request
12. **POST /auth/password-reset/confirm** - Password reset confirm
13. **PATCH /auth/profile** - Update profile
14. **POST /auth/change-password** - Change password

---

## Notes for Backend Developers

1. **Consistency**: Follow the existing API patterns and response formats
2. **Error Handling**: Use standard error response format with appropriate HTTP status codes
3. **Validation**: Validate all input data and return detailed error messages
4. **Authentication**: All protected endpoints require JWT token in Authorization header
5. **Authorization**: Check user roles (ADMIN, MANAGER, TECHNICIAN) for endpoint access
6. **Pagination**: Use consistent pagination format for list endpoints
7. **Date Format**: Use ISO 8601 format (UTC) for all dates
8. **Soft Deletes**: Consider soft deletes for important entities (work orders, clients, users)
9. **Audit Trail**: Log important actions (edits, deletes) with user ID and timestamp
10. **GPS Validation**: Validate GPS coordinates for time tracking (reasonable ranges)
11. **File Uploads**: Continue using S3 presigned URLs for file uploads
12. **Notifications**: Implement real-time notifications (WebSocket or polling)
13. **Caching**: Consider caching for frequently accessed data (technicians list, clients list)

---

## Flutter App Architecture Notes

The Flutter app follows Clean Architecture with:
- **Domain Layer**: Entities, Use Cases, Repository Interfaces
- **Data Layer**: Remote Data Sources, Repository Implementations, Models
- **Presentation Layer**: BLoC (State Management), Pages, Widgets

**Current Implementation Pattern:**
1. Create Remote Data Source interface and implementation
2. Create Repository interface and implementation
3. Create Use Cases
4. Register dependencies in DI container
5. Create BLoC events and states
6. Implement UI pages

**Example Structure:**
```
lib/features/{feature}/
  ├── data/
  │   ├── datasources/
  │   │   └── {feature}_remote_datasource.dart
  │   └── repositories/
  │       └── {feature}_repository_impl.dart
  ├── domain/
  │   ├── entities/
  │   ├── repositories/
  │   └── usecases/
  └── presentation/
      ├── bloc/
      └── pages/
```

---

**Last Updated:** 2026-02-08  
**Version:** 1.0.0
