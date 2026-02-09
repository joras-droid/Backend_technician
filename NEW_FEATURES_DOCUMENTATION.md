# New Features Documentation

This document covers all recently implemented features including equipment management, user management enhancements, and default pay rate functionality.

---

## Table of Contents

1. [Equipment Management](#equipment-management)
   - [Admin: Create Equipment](#admin-create-equipment)
   - [Admin: List Equipment](#admin-list-equipment)
   - [Admin: Get Equipment Details](#admin-get-equipment-details)
   - [Admin: Update Equipment](#admin-update-equipment)
   - [Admin: Delete Equipment](#admin-delete-equipment)
2. [Equipment Search (Technician)](#equipment-search-technician)
3. [Custom Equipment (Technician)](#custom-equipment-technician)
4. [Equipment Approval Workflow](#equipment-approval-workflow)
   - [Get Pending Approvals](#get-pending-approvals)
   - [Approve Equipment](#approve-equipment)
   - [Reject Equipment](#reject-equipment)
5. [User Management Enhancements](#user-management-enhancements)
   - [List Managers and Technicians](#list-managers-and-technicians)
   - [Reset User Password](#reset-user-password)
6. [Default Pay Rate for Technicians](#default-pay-rate-for-technicians)

---

## Equipment Management

### Admin: Create Equipment

**Endpoint:** `POST /equipment`  
**Authentication:** Required (JWT - ADMIN role only)  
**Description:** Add new equipment to the catalog. Price is mandatory, while price range (min-max) is optional.

**Request:**
```json
{
  "name": "Wrench Set",
  "description": "Professional grade wrench set with multiple sizes",
  "price": 45.99,
  "minRange": 40.0,
  "maxRange": 50.0,
  "vendor": "Home Depot"
}
```

**Request Fields:**
- `name` (string, **required**): Equipment name (must be unique)
- `description` (string, optional): Equipment description
- `price` (number, **required**): Price (mandatory, minimum: 0)
- `minRange` (number, optional): Minimum price range (minimum: 0)
- `maxRange` (number, optional): Maximum price range (minimum: 0)
- `vendor` (string, optional): Vendor name

**Validation Rules:**
- If both `minRange` and `maxRange` are provided, `minRange` must be ≤ `maxRange`
- Equipment name must be unique across the catalog

**Response (201 Created):**
```json
{
  "statusCode": 201,
  "data": {
    "id": "clx1111111111",
    "name": "Wrench Set",
    "description": "Professional grade wrench set with multiple sizes",
    "price": 45.99,
    "minRange": 40.0,
    "maxRange": 50.0,
    "vendor": "Home Depot",
    "isActive": true,
    "createdAt": "2026-02-09T10:00:00.000Z",
    "updatedAt": "2026-02-09T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation error (e.g., minRange > maxRange)
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User does not have ADMIN role
- `409 Conflict`: Equipment with this name already exists

---

### List Equipment (Admin, Manager, Technician)

**Endpoint:** `GET /equipment`  
**Authentication:** Required (JWT - ADMIN, MANAGER, or TECHNICIAN role)  
**Description:** Get list of all active equipment in the catalog, sorted alphabetically by name. Available to all authenticated users.

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "clx1111111111",
      "name": "Wrench Set",
      "description": "Professional grade wrench set",
      "price": 45.99,
      "minRange": 40.0,
      "maxRange": 50.0,
      "vendor": "Home Depot",
      "isActive": true,
      "createdAt": "2026-02-09T10:00:00.000Z",
      "updatedAt": "2026-02-09T10:00:00.000Z"
    },
    {
      "id": "clx2222222222",
      "name": "Drill Bits Set",
      "description": "Titanium drill bits",
      "price": 29.99,
      "minRange": null,
      "maxRange": null,
      "vendor": "Lowes",
      "isActive": true,
      "createdAt": "2026-02-09T11:00:00.000Z",
      "updatedAt": "2026-02-09T11:00:00.000Z"
    }
  ]
}
```

**Note:** Only returns equipment where `isActive: true`.

---

### Admin: Get Equipment Details

**Endpoint:** `GET /equipment/:id`  
**Authentication:** Required (JWT - ADMIN role only)  
**Description:** Get detailed information about a specific equipment item.

**Path Parameters:**
- `id` (string, required): Equipment ID

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "id": "clx1111111111",
    "name": "Wrench Set",
    "description": "Professional grade wrench set",
    "price": 45.99,
    "minRange": 40.0,
    "maxRange": 50.0,
    "vendor": "Home Depot",
    "isActive": true,
    "createdAt": "2026-02-09T10:00:00.000Z",
    "updatedAt": "2026-02-09T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User does not have ADMIN role
- `404 Not Found`: Equipment not found

---

### Admin: Update Equipment

**Endpoint:** `PATCH /equipment/:id`  
**Authentication:** Required (JWT - ADMIN role only)  
**Description:** Update equipment information. All fields are optional.

**Path Parameters:**
- `id` (string, required): Equipment ID

**Request:**
```json
{
  "name": "Premium Wrench Set",
  "price": 49.99,
  "minRange": 45.0,
  "maxRange": 55.0,
  "isActive": true
}
```

**Request Fields:** (All optional)
- `name` (string): Equipment name (must be unique if changed)
- `description` (string): Equipment description
- `price` (number): Price (minimum: 0)
- `minRange` (number): Minimum price range (minimum: 0)
- `maxRange` (number): Maximum price range (minimum: 0)
- `vendor` (string): Vendor name
- `isActive` (boolean): Whether equipment is active

**Response (200 OK):** Same format as create endpoint

**Error Responses:**
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User does not have ADMIN role
- `404 Not Found`: Equipment not found
- `409 Conflict`: Equipment name already exists (if name changed)

---

### Admin: Delete Equipment

**Endpoint:** `DELETE /equipment/:id`  
**Authentication:** Required (JWT - ADMIN role only)  
**Description:** Delete equipment from catalog. This permanently removes the equipment.

**Path Parameters:**
- `id` (string, required): Equipment ID

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "message": "Equipment deleted successfully",
    "id": "clx1111111111"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User does not have ADMIN role
- `404 Not Found`: Equipment not found

---

## Equipment Search (Technician)

**Endpoint:** `GET /equipment/search`  
**Authentication:** Required (JWT - TECHNICIAN role only)  
**Description:** Search equipment using fuzzy logic. Searches across equipment name, description, and vendor fields. Results are sorted by relevance (exact match > starts with > contains).

**Query Parameters:**
- `search` (string, **required**): Search term
- `limit` (number, optional): Maximum number of results (default: 20, maximum: 100)

**Example Request:**
```
GET /equipment/search?search=wrench&limit=10
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "clx1111111111",
      "name": "Wrench Set",
      "description": "Professional grade wrench set",
      "price": 45.99,
      "minRange": 40.0,
      "maxRange": 50.0,
      "vendor": "Home Depot",
      "isActive": true
    },
    {
      "id": "clx3333333333",
      "name": "Adjustable Wrench",
      "description": "Single adjustable wrench",
      "price": 15.99,
      "minRange": null,
      "maxRange": null,
      "vendor": "Hardware Store",
      "isActive": true
    }
  ]
}
```

**Search Behavior:**
- Case-insensitive search
- Searches in: name, description, vendor
- Results sorted by relevance:
  1. Exact match (highest priority)
  2. Starts with search term
  3. Contains search term

**Error Responses:**
- `400 Bad Request`: Missing search parameter or invalid limit
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User does not have TECHNICIAN role

---

## Add Catalog Equipment to Work Order (Technician)

**Endpoint:** `POST /work-orders/:workOrderId/equipment`  
**Authentication:** Required (JWT - TECHNICIAN role only)  
**Description:** Add equipment from the catalog to a work order. Catalog equipment is pre-approved and cost is immediately included in totals.

**Path Parameters:**
- `workOrderId` (string, required): Work order ID (provided in URL path, **do not include in request body**)

**Request:**
```json
{
  "equipmentId": "clx1111111111",
  "quantity": 2
}
```

**Request Fields:**
- `equipmentId` (string, **required**): Equipment ID from catalog (obtained via search or list endpoints)
- `quantity` (number, **required**): Quantity (minimum: 1)

**Important:** 
- **Do NOT include `cost` in the request body** - the cost is automatically taken from the catalog equipment's price
- **Do NOT include `workOrderId` in the request body** - it's provided in the URL path
- Only `equipmentId` and `quantity` are required

**Response (201 Created):**
```json
{
  "statusCode": 201,
  "data": {
    "id": "clx3333333333",
    "workOrderId": "clx1234567890",
    "equipmentId": "clx1111111111",
    "name": "Wrench Set",
    "quantity": 2,
    "cost": 45.99,
    "vendor": "Home Depot",
    "isCustom": false,
    "approvalStatus": "APPROVED",
    "createdAt": "2026-02-09T10:00:00.000Z"
  }
}
```

**Important Notes:**
- Equipment must exist in catalog and be active
- Equipment is automatically approved (no approval workflow)
- Cost is immediately included in work order totals
- Work order must be assigned to the technician

---

## Custom Equipment (Technician)

**Endpoint:** `POST /work-orders/:workOrderId/equipment/custom`  
**Authentication:** Required (JWT - TECHNICIAN role only)  
**Description:** Add custom equipment to a work order. Custom equipment requires approval from admin or manager before the cost is included in total calculations. This automatically creates notifications for all admins and managers.

**Path Parameters:**
- `workOrderId` (string, required): Work order ID (provided in URL path, **do not include in request body**)

**Request:**
```json
{
  "name": "Custom Tool XYZ",
  "quantity": 2,
  "cost": 75.50,
  "vendor": "Local Hardware Store",
  "receiptUrl": "https://bucket.s3.region.amazonaws.com/receipts/receipt123.jpg"
}
```

**Important:** The `workOrderId` is provided in the URL path (`/work-orders/:workOrderId/equipment/custom`). **Do NOT include `workOrderId` in the request body** - it will cause a validation error (400 Bad Request: "property workOrderId should not exist").

**Request Fields:**
- `name` (string, **required**): Equipment name
- `quantity` (number, **required**): Quantity (minimum: 1)
- `cost` (number, **required**): Cost per unit (mandatory, minimum: 0)
- `vendor` (string, optional): Vendor name
- `receiptUrl` (string, optional): Receipt URL (upload via presigned URL first)

**Response (201 Created):**
```json
{
  "statusCode": 201,
  "data": {
    "id": "clx2222222222",
    "workOrderId": "clx1234567890",
    "name": "Custom Tool XYZ",
    "quantity": 2,
    "cost": 75.50,
    "vendor": "Local Hardware Store",
    "receiptUrl": "https://bucket.s3.region.amazonaws.com/receipts/receipt123.jpg",
    "isCustom": true,
    "approvalStatus": "PENDING",
    "addedByTechnicianId": "clx9999999999",
    "addedByTechnician": {
      "id": "clx9999999999",
      "firstName": "John",
      "lastName": "Doe"
    },
    "workOrder": {
      "workOrderNumber": "WO-2026-001"
    },
    "createdAt": "2026-02-09T10:00:00.000Z",
    "updatedAt": "2026-02-09T10:00:00.000Z"
  }
}
```

**Important Notes:**
- Equipment is created with `approvalStatus: "PENDING"`
- All admins and managers receive push notifications
- Cost is **NOT** included in total calculations until approved
- Technician can upload receipt via presigned URL before or after creating equipment

**Error Responses:**
- `400 Bad Request`: Work order not assigned to you, or validation error
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User does not have TECHNICIAN role
- `404 Not Found`: Work order not found

---

## Equipment Approval Workflow

### Get Pending Approvals

**Endpoint:** `GET /equipment/pending-approvals`  
**Authentication:** Required (JWT - ADMIN or MANAGER role)  
**Description:** Get all custom equipment waiting for approval. Shows equipment details, technician information, and work order context.

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "clx2222222222",
      "workOrderId": "clx1234567890",
      "name": "Custom Tool XYZ",
      "quantity": 2,
      "cost": 75.50,
      "vendor": "Local Hardware Store",
      "receiptUrl": "https://bucket.s3.region.amazonaws.com/receipts/receipt123.jpg",
      "isCustom": true,
      "approvalStatus": "PENDING",
      "addedByTechnician": {
        "id": "clx9999999999",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com"
      },
      "workOrder": {
        "id": "clx1234567890",
        "workOrderNumber": "WO-2026-001",
        "facilityName": "ABC Manufacturing"
      },
      "createdAt": "2026-02-09T10:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User does not have ADMIN or MANAGER role

---

### Approve Equipment

**Endpoint:** `POST /equipment/:id/approve`  
**Authentication:** Required (JWT - ADMIN or MANAGER role)  
**Description:** Approve custom equipment. Once approved, the equipment cost will be included in total cost calculations. Technician receives a notification.

**Path Parameters:**
- `id` (string, required): Equipment ID (WorkOrderEquipment ID)

**Request:**
```json
{
  "note": "Approved for reimbursement"
}
```

**Request Fields:**
- `note` (string, optional): Approval note

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "id": "clx2222222222",
    "workOrderId": "clx1234567890",
    "name": "Custom Tool XYZ",
    "quantity": 2,
    "cost": 75.50,
    "approvalStatus": "APPROVED",
    "approvedAt": "2026-02-09T11:00:00.000Z",
    "approvedBy": {
      "id": "clx8888888888",
      "firstName": "Admin",
      "lastName": "User"
    },
    "addedByTechnician": {
      "id": "clx9999999999",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

**Important Notes:**
- Only custom equipment (`isCustom: true`) can be approved
- Equipment must be in `PENDING` status
- Approved equipment cost is included in total calculations
- Technician receives a push notification

**Error Responses:**
- `400 Bad Request`: Equipment already processed, not custom, or not in PENDING status
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User does not have ADMIN or MANAGER role
- `404 Not Found`: Equipment not found

---

### Reject Equipment

**Endpoint:** `POST /equipment/:id/reject`  
**Authentication:** Required (JWT - ADMIN or MANAGER role)  
**Description:** Reject custom equipment. Rejected equipment cost will **NOT** be included in total cost calculations. Technician receives a notification with the rejection reason.

**Path Parameters:**
- `id` (string, required): Equipment ID (WorkOrderEquipment ID)

**Request:**
```json
{
  "reason": "Receipt not provided or unclear"
}
```

**Request Fields:**
- `reason` (string, **required**): Reason for rejection

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "id": "clx2222222222",
    "workOrderId": "clx1234567890",
    "name": "Custom Tool XYZ",
    "quantity": 2,
    "cost": 75.50,
    "approvalStatus": "REJECTED",
    "rejectionReason": "Receipt not provided or unclear",
    "approvedAt": "2026-02-09T11:00:00.000Z",
    "approvedBy": {
      "id": "clx8888888888",
      "firstName": "Admin",
      "lastName": "User"
    },
    "addedByTechnician": {
      "id": "clx9999999999",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

**Important Notes:**
- Only custom equipment (`isCustom: true`) can be rejected
- Equipment must be in `PENDING` status
- Rejected equipment cost is **NOT** included in total calculations
- Technician receives a push notification with the rejection reason
- Rejection reason is required and stored for audit purposes

**Error Responses:**
- `400 Bad Request`: Equipment already processed, not custom, not in PENDING status, or missing reason
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User does not have ADMIN or MANAGER role
- `404 Not Found`: Equipment not found

---

## User Management Enhancements

### List Managers and Technicians

**Endpoint:** `GET /users/managers-and-technicians`  
**Authentication:** Required (JWT - ADMIN role only)  
**Description:** Get all managers and technicians with additional statistics including work orders count and time entries count.

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "clx1111111111",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "address": "123 Main St",
      "username": "johndoe",
      "role": "TECHNICIAN",
      "profileImageUrl": "https://bucket.s3.region.amazonaws.com/profiles/profile123.jpg",
      "defaultPayRate": 25.0,
      "whitelisted": true,
      "createdAt": "2026-02-06T10:00:00.000Z",
      "updatedAt": "2026-02-06T10:00:00.000Z",
      "stats": {
        "workOrdersCount": 5,
        "timeEntriesCount": 12
      }
    },
    {
      "id": "clx2222222222",
      "firstName": "Jane",
      "lastName": "Manager",
      "email": "jane.manager@example.com",
      "phone": "+1234567891",
      "username": "janemanager",
      "role": "MANAGER",
      "defaultPayRate": null,
      "whitelisted": true,
      "createdAt": "2026-02-05T10:00:00.000Z",
      "updatedAt": "2026-02-05T10:00:00.000Z",
      "stats": {
        "workOrdersCount": 0,
        "timeEntriesCount": 0
      }
    }
  ]
}
```

**Response Fields:**
- All standard user fields
- `stats.workOrdersCount` (number): Number of work orders assigned to this user
- `stats.timeEntriesCount` (number): Number of time entries created by this user

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User does not have ADMIN role

---

### Reset User Password

**Endpoint:** `POST /users/:id/reset-password`  
**Authentication:** Required (JWT - ADMIN role only)  
**Description:** Reset password for a technician or manager. Cannot reset password for admin users.

**Path Parameters:**
- `id` (string, required): User ID

**Request:**
```json
{
  "newPassword": "NewSecurePass123"
}
```

**Request Fields:**
- `newPassword` (string, **required**): New password (minimum 8 characters, must contain uppercase, lowercase, and number)

**Password Validation:**
- Minimum 8 characters
- Must contain at least one uppercase letter
- Must contain at least one lowercase letter
- Must contain at least one number

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "message": "Password reset successfully",
    "id": "clx1111111111"
  }
}
```

**Important Notes:**
- Password is hashed using bcrypt before storage
- Cannot reset password for ADMIN role users
- Only technicians and managers can have their passwords reset by admin

**Error Responses:**
- `400 Bad Request`: Cannot reset password for admin users, or password validation failed
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User does not have ADMIN role
- `404 Not Found`: User not found

---

## Default Pay Rate for Technicians

**Feature:** When creating technicians, admin or manager can set a default pay rate that will be used as the default value for work orders.

### Creating Employee with Default Pay Rate

**Endpoint:** `POST /admin/employees`  
**Authentication:** Required (JWT - ADMIN role only)

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123",
  "phone": "+1234567890",
  "address": "123 Main St",
  "role": "TECHNICIAN",
  "defaultPayRate": 25.0
}
```

**Request Fields:**
- `defaultPayRate` (number, optional): Default hourly pay rate for technician (minimum: 0)

**Response (201 Created):**
```json
{
  "statusCode": 201,
  "data": {
    "id": "clx1111111111",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "username": "johndoe_123456",
    "phone": "+1234567890",
    "address": "123 Main St",
    "role": "TECHNICIAN",
    "whitelisted": true,
    "defaultPayRate": 25.0,
    "createdAt": "2026-02-09T10:00:00.000Z",
    "updatedAt": "2026-02-09T10:00:00.000Z"
  }
}
```

**Usage:**
- When creating a work order for a technician with a `defaultPayRate`, the system can use this value as the default `payRate` for the work order
- The `defaultPayRate` can be overridden per work order
- This field is stored in the `User` model and can be updated via user management endpoints

---

## Database Schema Changes

### New Models

#### Equipment
```prisma
model Equipment {
  id          String   @id @default(cuid())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  name        String   @unique
  description String?
  price       Float    // Mandatory
  minRange    Float?   // Optional
  maxRange    Float?   // Optional
  vendor      String?
  isActive    Boolean  @default(true)
  workOrderEquipments WorkOrderEquipment[]
}
```

#### Updated WorkOrderEquipment
```prisma
model WorkOrderEquipment {
  id          String   @id @default(cuid())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  workOrderId String
  workOrder   WorkOrder @relation(...)
  
  name        String
  quantity    Int       @default(1)
  cost        Float     // Now mandatory
  vendor      String?
  receiptUrl  String?   // New: For receipts
  
  // Custom equipment fields
  isCustom            Boolean @default(false)
  addedByTechnicianId String?
  addedByTechnician   User?   @relation(...)
  
  // Approval workflow
  approvalStatus  EquipmentApprovalStatus @default(PENDING)
  approvedById    String?
  approvedBy      User?   @relation(...)
  approvedAt      DateTime?
  rejectionReason String?
  
  equipmentId String?   // Link to Equipment catalog
  equipment   Equipment? @relation(...)
}

enum EquipmentApprovalStatus {
  PENDING
  APPROVED
  REJECTED
}
```

#### Updated User Model
```prisma
model User {
  // ... existing fields ...
  defaultPayRate Float? // New: Default pay rate for technicians
  customEquipmentAdded WorkOrderEquipment[] @relation("CustomEquipmentAddedBy")
  equipmentApproved    WorkOrderEquipment[] @relation("EquipmentApprovedBy")
}
```

#### Updated Notification Model
```prisma
model Notification {
  // ... existing fields ...
  entityId   String?  // New: Reference to related entity
  entityType String?  // New: e.g., 'workOrder', 'equipment'
}

enum NotificationType {
  // ... existing types ...
  EQUIPMENT_APPROVAL_REQUIRED
  EQUIPMENT_APPROVED
  EQUIPMENT_REJECTED
}
```

---

## Workflow Summary

### Equipment Approval Flow

1. **Technician adds custom equipment** → `POST /work-orders/:workOrderId/equipment/custom`
   - Equipment created with `approvalStatus: PENDING`
   - Notifications sent to all admins and managers

2. **Admin/Manager reviews** → `GET /equipment/pending-approvals`
   - View all pending equipment approvals

3. **Admin/Manager approves** → `POST /equipment/:id/approve`
   - Equipment status changed to `APPROVED`
   - Cost included in total calculations
   - Technician notified

4. **OR Admin/Manager rejects** → `POST /equipment/:id/reject`
   - Equipment status changed to `REJECTED`
   - Cost **NOT** included in total calculations
   - Technician notified with reason

### Cost Calculation

- **Approved equipment**: Cost is included in total cost calculations
- **Rejected equipment**: Cost is **NOT** included in total cost calculations
- **Pending equipment**: Cost is **NOT** included until approved

---

## API Quick Reference

### Equipment Endpoints

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| `POST` | `/equipment` | ADMIN | Create equipment |
| `GET` | `/equipment` | ADMIN | List all equipment |
| `GET` | `/equipment/:id` | ADMIN | Get equipment details |
| `PATCH` | `/equipment/:id` | ADMIN | Update equipment |
| `DELETE` | `/equipment/:id` | ADMIN | Delete equipment |
| `GET` | `/equipment/search` | TECHNICIAN | Search equipment (fuzzy) |
| `GET` | `/equipment/pending-approvals` | ADMIN, MANAGER | Get pending approvals |
| `POST` | `/equipment/:id/approve` | ADMIN, MANAGER | Approve equipment |
| `POST` | `/equipment/:id/reject` | ADMIN, MANAGER | Reject equipment |
| `POST` | `/work-orders/:workOrderId/equipment` | TECHNICIAN | Add catalog equipment to work order |
| `POST` | `/work-orders/:workOrderId/equipment/custom` | TECHNICIAN | Add custom equipment |

### User Management Endpoints

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| `GET` | `/users/managers-and-technicians` | ADMIN | List managers and technicians |
| `POST` | `/users/:id/reset-password` | ADMIN | Reset user password |

---

## Migration Instructions

To apply these changes to your database:

```bash
cd backend
npx prisma migrate dev --name add_equipment_and_payrate
```

This will:
1. Create the `Equipment` table
2. Add new fields to `WorkOrderEquipment` table
3. Add `defaultPayRate` to `User` table
4. Add new notification types
5. Update `Notification` table with `entityId` and `entityType`

---

## Testing Checklist

### Equipment Management
- [ ] Create equipment with price only
- [ ] Create equipment with price and range
- [ ] List all equipment
- [ ] Update equipment
- [ ] Delete equipment
- [ ] Verify unique name constraint

### Equipment Search
- [ ] Search by name (exact match)
- [ ] Search by name (partial match)
- [ ] Search by description
- [ ] Search by vendor
- [ ] Verify relevance sorting

### Custom Equipment
- [ ] Add custom equipment to work order
- [ ] Verify notification creation
- [ ] Verify PENDING status
- [ ] Add equipment with receipt
- [ ] Verify work order assignment check

### Equipment Approval
- [ ] List pending approvals
- [ ] Approve equipment
- [ ] Verify technician notification
- [ ] Reject equipment with reason
- [ ] Verify cost inclusion/exclusion
- [ ] Verify cannot approve non-custom equipment
- [ ] Verify cannot approve already processed equipment

### User Management
- [ ] List managers and technicians
- [ ] Verify stats calculation
- [ ] Reset technician password
- [ ] Reset manager password
- [ ] Verify cannot reset admin password
- [ ] Verify password validation

### Default Pay Rate
- [ ] Create technician with default pay rate
- [ ] Create technician without default pay rate
- [ ] Update user with default pay rate
- [ ] Verify default pay rate in user details

---

## Notes

- All equipment prices and costs are stored as `Float` (decimal numbers)
- Equipment approval workflow ensures cost accountability
- Notifications are automatically created for equipment approval requests
- Default pay rate can be set during user creation or updated later
- Password reset requires strong password validation
- All endpoints include proper role-based access control
