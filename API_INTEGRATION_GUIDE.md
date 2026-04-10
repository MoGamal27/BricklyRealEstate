# Real Estate API Integration Guide

## Base Configuration

**Base URL:** `https://bricklyrealestate-production.up.railway.app`

**Authentication:** Bearer Token (JWT)

All authenticated endpoints require the `Authorization` header:
```
Authorization: Bearer {access_token}
```

---

## 1. Authentication Endpoints

### 1.1 Register User
**POST** `/auth/register`

Creates a new user account. Available roles: `BUYER`, `SELLER`, `ADMIN`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "BUYER",
  "phone": "+1234567890"
}
```

**Response (201):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "BUYER",
    "phone": "+1234567890"
  }
}
```

**Frontend Action:** Store `access_token` in localStorage/sessionStorage and `user.id` for future requests.

---

### 1.2 Login
**POST** `/auth/login`

Authenticates existing user and returns access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "BUYER"
  }
}
```

**Frontend Action:** Store `access_token` and user data. Redirect to dashboard.

---

### 1.3 Refresh Token
**GET** `/auth/refresh`

**Headers:** `Authorization: Bearer {access_token}`

Refreshes the authentication token.

**Response (200):**
```json
{
  "access_token": "new_token_here"
}
```

---

## 2. User Management Endpoints

### 2.1 Get Current User Profile
**GET** `/users/profile`

**Headers:** `Authorization: Bearer {access_token}`

Retrieves the authenticated user's profile.

**Response (200):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "BUYER",
  "phone": "+1234567890",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

### 2.2 Update Profile
**PUT** `/users/profile`

**Headers:** `Authorization: Bearer {access_token}`

**Request Body:**
```json
{
  "name": "John Updated",
  "phone": "+1234567899"
}
```

**Response (200):** Updated user object

---

### 2.3 Get All Users (Admin Only)
**GET** `/users`

**Headers:** `Authorization: Bearer {access_token}`

**Role Required:** `ADMIN`

Returns list of all users in the system.

---

### 2.4 Delete User (Admin Only)
**DELETE** `/users/{userId}`

**Headers:** `Authorization: Bearer {access_token}`

**Role Required:** `ADMIN`

---

## 3. Property Endpoints

### 3.1 Create Property (Seller Only)
**POST** `/properties`

**Headers:** `Authorization: Bearer {access_token}`

**Role Required:** `SELLER`

**Request Body:**
```json
{
  "title": "Luxury Villa in Dubai Marina",
  "description": "Beautiful 4-bedroom villa with sea view",
  "type": "VILLA",
  "price": 2500000,
  "bedrooms": 4,
  "bathrooms": 3,
  "area": 3500,
  "furnished": true,
  "level": 2,
  "compound": "Marina Residences",
  "paymentOption": "Cash/Mortgage",
  "deliveryDate": "2024-12-31",
  "city": "Dubai",
  "neighborhood": "Dubai Marina",
  "address": "123 Marina Walk",
  "latitude": 25.0806,
  "longitude": 55.1394,
  "aiPriceSuggested": 2450000
}
```

**Property Types:** `VILLA`, `APARTMENT`, `TOWNHOUSE`, `PENTHOUSE`, `STUDIO`

**Response (201):**
```json
{
  "id": "property-uuid",
  "title": "Luxury Villa in Dubai Marina",
  "status": "PENDING",
  ...
}
```

**Frontend Action:** Store `property.id` for future operations. Property starts with `PENDING` status.

---

### 3.2 Get All Properties (Public)
**GET** `/properties?page=1&limit=10`

**No Authentication Required**

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `type` (optional): Property type filter
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price
- `bedrooms` (optional): Number of bedrooms
- `bathrooms` (optional): Number of bathrooms
- `city` (optional): City filter
- `neighborhood` (optional): Neighborhood filter
- `status` (optional): Property status (PENDING, APPROVED, REJECTED)
- `furnished` (optional): true/false

**Example with Filters:**
```
GET /properties?type=VILLA&minPrice=1000000&maxPrice=3000000&bedrooms=4&city=Dubai&status=APPROVED
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Luxury Villa",
      "price": 2500000,
      "type": "VILLA",
      "bedrooms": 4,
      "bathrooms": 3,
      "area": 3500,
      "city": "Dubai",
      "status": "APPROVED",
      ...
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 10
}
```

**Frontend Action:** Use for property listing pages with pagination and filters.

---

### 3.3 Get Property by ID (Public)
**GET** `/properties/{propertyId}`

**No Authentication Required**

Returns detailed information about a specific property.

---

### 3.4 Update Property (Seller Only)
**PUT** `/properties/{propertyId}`

**Headers:** `Authorization: Bearer {access_token}`

**Role Required:** `SELLER` (must be property owner)

**Request Body:** (partial update supported)
```json
{
  "title": "Updated Luxury Villa",
  "price": 2600000,
  "description": "Updated description"
}
```

---

### 3.5 Update Property Status (Admin Only)
**PUT** `/properties/{propertyId}/status`

**Headers:** `Authorization: Bearer {access_token}`

**Role Required:** `ADMIN`

**Request Body:**
```json
{
  "status": "APPROVED"
}
```

**Status Values:** `PENDING`, `APPROVED`, `REJECTED`

---

### 3.6 Delete Property
**DELETE** `/properties/{propertyId}`

**Headers:** `Authorization: Bearer {access_token}`

**Role Required:** `SELLER` (owner) or `ADMIN`

---

## 4. Wishlist Endpoints

### 4.1 Get My Wishlist
**GET** `/wishlists`

**Headers:** `Authorization: Bearer {access_token}`

**Role Required:** `BUYER`

**Response (200):**
```json
[
  {
    "id": "wishlist-uuid",
    "property": {
      "id": "property-uuid",
      "title": "Luxury Villa",
      "price": 2500000,
      ...
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### 4.2 Add to Wishlist
**POST** `/wishlists/{propertyId}`

**Headers:** `Authorization: Bearer {access_token}`

**Role Required:** `BUYER`

Adds a property to the user's wishlist.

**Response (201):** Wishlist item object

---

### 4.3 Remove from Wishlist
**DELETE** `/wishlists/{propertyId}`

**Headers:** `Authorization: Bearer {access_token}`

**Role Required:** `BUYER`

---

## 5. Booking Endpoints

### 5.1 Create Booking
**POST** `/bookings`

**Headers:** `Authorization: Bearer {access_token}`

**Role Required:** `BUYER`

**Request Body:**
```json
{
  "date": "2024-12-15",
  "time": "14:00",
  "notes": "Looking forward to viewing this property",
  "propertyId": "property-uuid"
}
```

**Response (201):**
```json
{
  "id": "booking-uuid",
  "date": "2024-12-15",
  "time": "14:00",
  "status": "PENDING",
  "notes": "Looking forward to viewing this property",
  "property": { ... },
  "buyer": { ... }
}
```

**Booking Status:** `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`

**Frontend Action:** Store `booking.id` for status updates.

---

### 5.2 Get My Bookings
**GET** `/bookings`

**Headers:** `Authorization: Bearer {access_token}`

Returns all bookings for the authenticated user (buyer sees their bookings, seller sees bookings for their properties).

---

### 5.3 Get Booking by ID
**GET** `/bookings/{bookingId}`

**Headers:** `Authorization: Bearer {access_token}`

---

### 5.4 Update Booking Status
**PUT** `/bookings/{bookingId}/status`

**Headers:** `Authorization: Bearer {access_token}`

**Role Required:** `SELLER` (property owner) or `BUYER` (booking owner)

**Request Body:**
```json
{
  "status": "CONFIRMED"
}
```

**Status Values:** `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`

---

## 6. Chat Endpoints

### 6.1 Create Chat
**POST** `/chats`

**Headers:** `Authorization: Bearer {access_token}`

**Request Body:**
```json
{
  "sellerId": "seller-user-id",
  "propertyId": "property-uuid"
}
```

**Response (201):**
```json
{
  "id": "chat-uuid",
  "buyer": { ... },
  "seller": { ... },
  "property": { ... },
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Frontend Action:** Store `chat.id` for messaging. Check if chat already exists before creating.

---

### 6.2 Get My Chats
**GET** `/chats`

**Headers:** `Authorization: Bearer {access_token}`

Returns all chats for the authenticated user.

---

### 6.3 Get Chat by ID
**GET** `/chats/{chatId}`

**Headers:** `Authorization: Bearer {access_token}`

---

### 6.4 Get Chat Messages
**GET** `/chats/{chatId}/messages`

**Headers:** `Authorization: Bearer {access_token}`

Returns all messages in a specific chat.

**Response (200):**
```json
[
  {
    "id": "message-uuid",
    "content": "Hello, I'm interested in this property",
    "sender": {
      "id": "user-uuid",
      "name": "John Doe"
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---


## Error Handling

All endpoints return standard HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (missing/invalid token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `500`: Internal Server Error

**Error Response Format:**
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

---
