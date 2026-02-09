# API Quick Reference Guide

**Base URL:** `http://localhost:3000/api/v1`

---

## Quick Endpoint Reference

### Authentication
| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | `/auth/signup` | ❌ | - | Register new user (email must be whitelisted) |
| POST | `/auth/signin` | ❌ | - | Sign in and get JWT tokens |
| POST | `/auth/presigned-url` | ❌ | - | Get profile image presigned URL (public) |
| POST | `/auth/profile/presigned-url` | ✅ | Any | Get profile image presigned URL (authenticated) |
| PATCH | `/auth/profile/image` | ✅ | Any | Update profile image URL |

### Technician Mobile App
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/work-orders/technician` | ✅ | Get my work orders (uses authenticated user) |
| GET | `/work-orders/:id` | ✅ | Get work order details |
| POST | `/work-orders/:workOrderId/attachments/presigned-url` | ✅ | Get presigned URL for photo/receipt |
| POST | `/work-orders/:workOrderId/attachments` | ✅ | Create attachment record |
| POST | `/work-orders/:workOrderId/time-entries/check-in` | ✅ | Check in (with GPS) |
| POST | `/work-orders/:workOrderId/time-entries/check-out` | ✅ | Check out (with GPS) |
| GET | `/work-orders/:workOrderId/time-entries` | ✅ | Get time entries |
| GET | `/notifications` | ✅ | Get notifications |
| GET | `/notifications/unread-count` | ✅ | Get unread count |
| PATCH | `/notifications/:id/read` | ✅ | Mark notification as read |
| PATCH | `/auth/profile` | ✅ | Update profile |
| POST | `/auth/change-password` | ✅ | Change password |

### Admin/Manager (Mobile & Web)
| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/work-orders` | ✅ | ADMIN/MANAGER | List all work orders (with filters & pagination) |
| POST | `/work-orders` | ✅ | ADMIN/MANAGER | Create work order |
| PATCH | `/work-orders/:id` | ✅ | ADMIN/MANAGER | Update work order |
| POST | `/work-orders/:id/duplicate` | ✅ | ADMIN/MANAGER | Duplicate work order |
| GET | `/work-order-templates` | ✅ | ADMIN/MANAGER | List templates |
| POST | `/work-order-templates` | ✅ | ADMIN/MANAGER | Create template |
| PATCH | `/work-order-templates/:id` | ✅ | ADMIN/MANAGER | Update template |
| DELETE | `/work-order-templates/:id` | ✅ | ADMIN/MANAGER | Delete template |
| GET | `/clients` | ✅ | Any | Get all clients |
| GET | `/clients/:id` | ✅ | Any | Get client details |
| POST | `/clients` | ✅ | ADMIN/MANAGER | Create client |
| PATCH | `/clients/:id` | ✅ | ADMIN/MANAGER | Update client |
| GET | `/reports/work-orders` | ✅ | ADMIN/MANAGER | Work order reports |
| GET | `/reports/time-summary` | ✅ | ADMIN/MANAGER | Time summary |
| GET | `/reports/export` | ✅ | ADMIN/MANAGER | Export data (CSV) |
| GET | `/admin/employees/whitelist` | ✅ | ADMIN | List whitelisted emails |
| POST | `/admin/employees/whitelist` | ✅ | ADMIN | Whitelist single email |
| POST | `/admin/employees/whitelist/bulk` | ✅ | ADMIN | Whitelist multiple emails |
| POST | `/admin/employees` | ✅ | ADMIN | Create employee account |
| DELETE | `/admin/employees/whitelist/:email` | ✅ | ADMIN | Remove from whitelist |
| GET | `/users/technicians` | ✅ | Any | Get all technicians |

### Admin Only
| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| DELETE | `/work-orders/:id` | ✅ | ADMIN | Delete work order |
| DELETE | `/clients/:id` | ✅ | ADMIN | Delete client |
| GET | `/users` | ✅ | ADMIN | List all users |
| GET | `/users/managers-and-technicians` | ✅ | ADMIN | Get all managers and technicians with details |
| GET | `/users/:id` | ✅ | ADMIN | Get user details |
| PATCH | `/users/:id` | ✅ | ADMIN | Update user |
| POST | `/users/:id/reset-password` | ✅ | ADMIN | Reset user password (technicians/managers only) |
| DELETE | `/users/:id` | ✅ | ADMIN | Delete user |
| PATCH | `/time-entries/:id` | ✅ | ADMIN | Edit time entry (with audit) |

---

## Request/Response Examples

### Sign Up
```http
POST /api/v1/auth/signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "statusCode": 201,
  "data": {
    "user": { ... },
    "accessToken": "eyJhbGci...",
    "refreshToken": "eyJhbGci..."
  }
}
```

### Sign In
```http
POST /api/v1/auth/signin
Content-Type: application/json

{
  "username": "johndoe",
  "password": "SecurePass123"
}
```

### Get My Work Orders
```http
GET /api/v1/work-orders/technician/{technicianId}
Authorization: Bearer {token}
```

### Upload Photo to Work Order

**Step 1: Get Presigned URL**
```http
POST /api/v1/work-orders/{workOrderId}/attachments/presigned-url
Authorization: Bearer {token}
Content-Type: application/json

{
  "fileName": "photo.jpg",
  "contentType": "image/jpeg",
  "attachmentType": "photo"
}
```

**Step 2: Upload to S3**
```http
PUT {presignedUrl}
Content-Type: image/jpeg

[binary data]
```

**Step 3: Create Record**
```http
POST /api/v1/work-orders/{workOrderId}/attachments
Authorization: Bearer {token}
Content-Type: application/json

{
  "url": "{publicUrl}",
  "type": "image/jpeg",
  "description": "Work site photo"
}
```

---

## Flutter Code Examples

### HTTP Client Setup
```dart
class ApiClient {
  static const String baseUrl = 'http://localhost:3000/api/v1';
  static String? token;
  
  static Map<String, String> get headers => {
    'Content-Type': 'application/json',
    if (token != null) 'Authorization': 'Bearer $token',
  };
  
  static Future<Map<String, dynamic>> post(String endpoint, Map data) async {
    final response = await http.post(
      Uri.parse('$baseUrl$endpoint'),
      headers: headers,
      body: jsonEncode(data),
    );
    return jsonDecode(response.body);
  }
  
  static Future<Map<String, dynamic>> get(String endpoint) async {
    final response = await http.get(
      Uri.parse('$baseUrl$endpoint'),
      headers: headers,
    );
    return jsonDecode(response.body);
  }
}
```

### Sign In Example
```dart
Future<void> signIn(String username, String password) async {
  final response = await ApiClient.post('/auth/signin', {
    'username': username,
    'password': password,
  });
  
  if (response['statusCode'] == 200) {
    ApiClient.token = response['data']['accessToken'];
    // Store token securely
    // Navigate to home screen
  } else {
    // Show error: response['message']
  }
}
```

### Get Work Orders Example
```dart
Future<List<WorkOrder>> getMyWorkOrders(String technicianId) async {
  final response = await ApiClient.get('/work-orders/technician/$technicianId');
  
  if (response['statusCode'] == 200) {
    final List<dynamic> data = response['data'];
    return data.map((json) => WorkOrder.fromJson(json)).toList();
  }
  throw Exception(response['message']);
}
```

### Upload Photo Example
```dart
Future<void> uploadWorkOrderPhoto(String workOrderId, File photo) async {
  // Step 1: Get presigned URL
  final presignedResponse = await ApiClient.post(
    '/work-orders/$workOrderId/attachments/presigned-url',
    {
      'fileName': 'photo.jpg',
      'contentType': 'image/jpeg',
      'attachmentType': 'photo',
    },
  );
  
  final presignedUrl = presignedResponse['data']['presignedUrl'];
  final publicUrl = presignedResponse['data']['publicUrl'];
  
  // Step 2: Upload to S3
  final request = http.Request('PUT', Uri.parse(presignedUrl));
  request.headers['Content-Type'] = 'image/jpeg';
  request.bodyBytes = await photo.readAsBytes();
  final uploadResponse = await request.send();
  
  if (uploadResponse.statusCode == 200) {
    // Step 3: Create attachment record
    await ApiClient.post(
      '/work-orders/$workOrderId/attachments',
      {
        'url': publicUrl,
        'type': 'image/jpeg',
        'description': 'Work site photo',
      },
    );
  }
}
```

---

## Data Models (TypeScript/Dart)

### User
```dart
class User {
  final String id;
  final String firstName;
  final String lastName;
  final String email;
  final String? phone;
  final String? address;
  final String username;
  final String? profileImageUrl;
  final String role; // "ADMIN" | "MANAGER" | "TECHNICIAN"
  final DateTime createdAt;
  final DateTime updatedAt;
}
```

### Work Order
```dart
class WorkOrder {
  final String id;
  final String workOrderNumber;
  final DateTime scheduledAt;
  final double? estimatedHours;
  final double? payRate;
  final String facilityName;
  final String facilityAddress;
  final String? pointOfContact;
  final String? tasks;
  final String? notes;
  final String status; // "ACTIVE" | "COMPLETED" | "PAID"
  final String? invoiceNumber;
  final String? clientId;
  final String? technicianId;
  final Client? client;
  final User? technician;
  final List<Attachment>? attachments;
  final List<WorkOrderEquipment>? equipment;
  final List<TimeEntry>? timeEntries;
}
```

### Attachment
```dart
class Attachment {
  final String id;
  final String workOrderId;
  final String url;
  final String? type;
  final String? description;
  final DateTime createdAt;
}
```

---

## Error Codes Reference

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | Process data |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Check validation errors |
| 401 | Unauthorized | Check token or email whitelist |
| 403 | Forbidden | User lacks required role |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource already exists |
| 500 | Server Error | Retry or contact support |

---

## File Upload Checklist

### Profile Image (Signup)
- [ ] Request presigned URL: `POST /auth/presigned-url`
- [ ] Upload file to S3: `PUT {presignedUrl}`
- [ ] Sign up with `profileImageUrl`: `POST /auth/signup`

### Profile Image (Update)
- [ ] Request presigned URL: `POST /auth/profile/presigned-url`
- [ ] Upload file to S3: `PUT {presignedUrl}`
- [ ] Update profile: `PATCH /auth/profile/image`

### Work Order Photo/Receipt
- [ ] Request presigned URL: `POST /work-orders/{id}/attachments/presigned-url`
- [ ] Upload file to S3: `PUT {presignedUrl}`
- [ ] Create attachment: `POST /work-orders/{id}/attachments`

---

## Common Headers

```http
Content-Type: application/json
Authorization: Bearer {jwt_token}
```

---

## Base URL Configuration

**Development:**
```
http://localhost:3000/api/v1
```

**Production:**
```
https://your-domain.com/api/v1
```

Configure in your Flutter app's environment settings.

---

For detailed documentation, see `BACKEND_API_DOCUMENTATION.md`
