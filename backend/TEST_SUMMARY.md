# Test Summary — Brickly Real Estate (Full Stack)

> **Backend:** NestJS · TypeORM · PostgreSQL · JWT · Socket.io
> **Frontend:** React 18 · Vite · TanStack Query · React Router DOM v6
> **Backend Test Framework:** Jest + `@nestjs/testing` + Supertest
> **Frontend Test Framework:** Vitest + React Testing Library + MSW (Mock Service Worker)

---

## Table of Contents

1. [Backend — Unit Tests](#backend--unit-tests)
   - [AuthService](#1-authservice)
   - [UsersService](#2-usersservice)
   - [PropertiesService](#3-propertiesservice)
   - [BookingsService](#4-bookingsservice)
   - [WishlistsService](#5-wishlistsservice)
   - [ChatsService](#6-chatsservice)
   - [MessagesService](#7-messagesservice)
2. [Backend — Integration Tests](#backend--integration-tests)
   - [Auth Endpoints](#1-auth-endpoints)
   - [Users Endpoints](#2-users-endpoints)
   - [Properties Endpoints](#3-properties-endpoints)
   - [Bookings Endpoints](#4-bookings-endpoints)
   - [Wishlists Endpoints](#5-wishlists-endpoints)
   - [Chats & Messages Endpoints](#6-chats--messages-endpoints)
   - [WebSocket Gateway](#7-websocket-gateway)
3. [Test Coverage Summary](#test-coverage-summary)

---

## Backend — Unit Tests

Unit tests isolate each **Service** using mocked repositories. No real DB connection is used.

---

### 1. AuthService

**File:** `src/auth/auth.service.spec.ts`

1. **`register` — success**
   - Input: Valid email + password
   - Returns `{ user, access_token }`, password excluded from user object

2. **`register` — duplicate email**
   - Input: Email already in DB
   - Throws `ConflictException('Email already exists')`

3. **`register` — hashes password**
   - Input: Any valid dto
   - Saved password !== plain text (bcrypt hash)

4. **`login` — success**
   - Input: Valid email + correct password
   - Returns `{ user, access_token }`, password excluded

5. **`login` — user not found**
   - Input: Non-existent email
   - Throws `UnauthorizedException('Invalid credentials')`

6. **`login` — wrong password**
   - Input: Valid email + wrong password
   - Throws `UnauthorizedException('Invalid credentials')`

7. **`refresh` — success**
   - Input: Valid userId in DB
   - Returns `{ access_token }`

8. **`refresh` — user not found**
   - Input: Non-existent userId
   - Throws `UnauthorizedException('User not found')`

9. **`generateToken` (private)**
   - Input: User with id, email, role
   - JWT payload contains `sub`, `email`, `role`

---

### 2. UsersService

**File:** `src/users/users.service.spec.ts`

1. **`findAll` — returns users**
   - Input: DB has 2 users
   - Returns array of 2 users, password stripped from each

2. **`findAll` — empty DB**
   - Input: DB is empty
   - Returns empty array `[]`

3. **`findOne` — found**
   - Input: Valid userId
   - Returns user object without password field

4. **`findOne` — not found**
   - Input: Non-existent id
   - Throws `NotFoundException('User not found')`

5. **`update` — success**
   - Input: Valid id + update fields
   - Returns updated user without password

6. **`update` — user not found**
   - Input: Non-existent id
   - Throws `NotFoundException('User not found')`

7. **`remove` — success**
   - Input: Valid userId
   - Returns `{ message: 'User deleted successfully' }`

8. **`remove` — not found**
   - Input: Non-existent id
   - Throws `NotFoundException('User not found')`

---

### 3. PropertiesService

**File:** `src/properties/properties.service.spec.ts`

1. **`create` — success with AI price**
   - Input: Valid dto + sellerId + images
   - Returns property with `aiPriceSuggested`, `aiPriceDifference`, `aiPriceDifferencePercentage`

2. **`create` — AI service fails**
   - Input: AI service throws error
   - Property is still created, `aiPriceSuggested` is `undefined`

3. **`create` — with images**
   - Input: imageUrls array
   - Saved property has `images` field set

4. **`findAll` — no filters**
   - Input: Empty FilterDto
   - Returns `{ data, total, page, limit, totalPages }`

5. **`findAll` — filter by city**
   - Input: `{ city: 'Cairo' }`
   - Query builder filters by city

6. **`findAll` — filter by price range**
   - Input: `{ minPrice: 500000, maxPrice: 2000000 }`
   - Returns only properties in price range

7. **`findAll` — pagination**
   - Input: `{ page: 2, limit: 5 }`
   - Returns correct page slice

8. **`findOne` — success**
   - Input: Valid propertyId
   - Returns property + increments `views` by 1

9. **`findOne` — not found**
   - Input: Non-existent id
   - Throws `NotFoundException('Property not found')`

10. **`update` — owner updates**
    - Input: sellerId matches userId
    - Returns updated property

11. **`update` — admin updates any**
    - Input: ADMIN role + different userId
    - Returns updated property (admin bypass)

12. **`update` — forbidden**
    - Input: Different userId + non-admin
    - Throws `ForbiddenException`

13. **`update` — not found**
    - Input: Non-existent id
    - Throws `NotFoundException('Property not found')`

14. **`updateStatus` — success**
    - Input: Valid id + new status
    - Returns property with updated status

15. **`updateStatus` — not found**
    - Input: Non-existent id
    - Throws `NotFoundException('Property not found')`

16. **`remove` — owner deletes**
    - Input: sellerId matches userId
    - Returns `{ message: 'Property deleted successfully' }`

17. **`remove` — admin deletes**
    - Input: ADMIN role
    - Successfully removes property

18. **`remove` — forbidden**
    - Input: Different userId + non-admin
    - Throws `ForbiddenException`

19. **`remove` — not found**
    - Input: Non-existent id
    - Throws `NotFoundException('Property not found')`

---

### 4. BookingsService

**File:** `src/bookings/bookings.service.spec.ts`

1. **`create` — success**
   - Input: Valid dto + buyerId
   - Returns booking with `buyerId` set

2. **`findAll` — BUYER role**
   - Input: userId = buyer
   - Query filters by `buyerId` only

3. **`findAll` — SELLER role**
   - Input: userId = seller
   - Query filters by `property.sellerId`

4. **`findAll` — ADMIN role**
   - Input: admin userId
   - Returns all bookings (no user filter)

5. **`findOne` — buyer can view own**
   - Input: buyerId matches userId
   - Returns booking with relations

6. **`findOne` — seller can view own**
   - Input: property.sellerId matches
   - Returns booking with relations

7. **`findOne` — admin can view any**
   - Input: ADMIN role
   - Returns booking

8. **`findOne` — forbidden**
   - Input: Unrelated user
   - Throws `ForbiddenException`

9. **`findOne` — not found**
   - Input: Non-existent id
   - Throws `NotFoundException('Booking not found')`

10. **`updateStatus` — buyer updates**
    - Input: buyerId matches
    - Returns booking with updated status

11. **`updateStatus` — seller updates**
    - Input: sellerId matches
    - Returns booking with updated status

12. **`updateStatus` — forbidden**
    - Input: Unrelated user
    - Throws `ForbiddenException`

13. **`updateStatus` — not found**
    - Input: Non-existent id
    - Throws `NotFoundException('Booking not found')`

---

### 5. WishlistsService

**File:** `src/wishlists/wishlists.service.spec.ts`

1. **`findAll` — returns items**
   - Input: userId with 2 items
   - Returns wishlist array with `property` and `property.seller`

2. **`findAll` — empty**
   - Input: User has no wishlist
   - Returns empty array `[]`

3. **`addToWishlist` — success**
   - Input: New userId + propertyId combo
   - Returns saved wishlist entry

4. **`addToWishlist` — duplicate**
   - Input: Already-wishlisted property
   - Throws `ConflictException('Property already in wishlist')`

5. **`removeFromWishlist` — success**
   - Input: Valid userId + propertyId
   - Returns `{ message: 'Removed from wishlist successfully' }`

6. **`removeFromWishlist` — not found**
   - Input: Non-existent entry
   - Throws `NotFoundException('Wishlist item not found')`

---

### 6. ChatsService

**File:** `src/chats/chats.service.spec.ts`

1. **`create` — new chat**
   - Input: New buyer + seller + property combo
   - Creates and returns new chat

2. **`create` — existing chat**
   - Input: Same buyer + seller + property
   - Returns existing chat (no duplicate)

3. **`findAll` — buyer's chats**
   - Input: buyerId
   - Returns chats where user is buyer OR seller

4. **`findAll` — seller's chats**
   - Input: sellerId
   - Returns chats involving that seller

5. **`findOne` — found**
   - Input: Valid chatId
   - Returns chat with `buyer`, `seller`, `property`

6. **`findOne` — not found**
   - Input: Non-existent id
   - Throws `NotFoundException('Chat not found')`

---

### 7. MessagesService

**File:** `src/messages/messages.service.spec.ts`

1. **`create` — success**
   - Input: Valid dto + senderId
   - Returns message with `senderId` set

2. **`create` — persists content**
   - Input: dto with content
   - Saved message has correct `content` and `chatId`

3. **`findByChatId` — found**
   - Input: Valid chatId
   - Returns messages array ordered by `createdAt ASC`

4. **`findByChatId` — empty**
   - Input: chatId with no messages
   - Returns empty array `[]`

5. **`findByChatId` — includes sender**
   - Input: chatId with messages
   - Each message has `sender` relation populated

---

## Backend — Integration Tests

Integration tests spin up a real NestJS app with an **in-memory/test DB** and hit actual HTTP endpoints using `supertest`.

---

### 1. Auth Endpoints

**File:** `test/auth.e2e-spec.ts`

1. **POST `/auth/register` — valid registration**
   - Payload: `{ name, email, password, role: 'BUYER' }`
   - `201` → `{ user: {...}, access_token: string }`

2. **POST `/auth/register` — duplicate email**
   - Payload: Same email sent twice
   - `409` → `{ message: 'Email already exists' }`

3. **POST `/auth/register` — missing required fields**
   - Payload: `{}`
   - `400` → Validation error messages

4. **POST `/auth/register` — invalid email format**
   - Payload: `email: 'notanemail'`
   - `400` → Validation error

5. **POST `/auth/login` — valid credentials**
   - Payload: Correct email + password
   - `200` → `{ user: {...}, access_token: string }`

6. **POST `/auth/login` — wrong password**
   - Payload: Correct email + wrong password
   - `401` → `{ message: 'Invalid credentials' }`

7. **POST `/auth/login` — unknown email**
   - Payload: Non-existent email
   - `401` → `{ message: 'Invalid credentials' }`

8. **GET `/auth/refresh` — valid JWT token**
   - Auth: Bearer token in header
   - `200` → `{ access_token: string }`

9. **GET `/auth/refresh` — no token**
   - Auth: No Authorization header
   - `401` → Unauthorized error

---

### 2. Users Endpoints

**File:** `test/users.e2e-spec.ts`

1. **GET `/users/profile` — get own profile**
   - Auth: Any role JWT
   - `200` → returns user without password

2. **GET `/users/profile` — no token**
   - Auth: None
   - `401`

3. **PUT `/users/profile` — update own profile**
   - Auth: Any role JWT
   - `200` → returns updated user

4. **PUT `/users/profile` — update with invalid data**
   - Auth: Any role JWT
   - `400`

5. **GET `/users` — admin lists all users**
   - Auth: ADMIN JWT
   - `200` → array of users

6. **GET `/users` — non-admin access**
   - Auth: BUYER JWT
   - `403`

7. **DELETE `/users/:id` — admin deletes user**
   - Auth: ADMIN JWT
   - `200` → `{ message: 'User deleted successfully' }`

8. **DELETE `/users/:id` — non-admin tries delete**
   - Auth: BUYER JWT
   - `403`

9. **DELETE `/users/:id` — delete non-existent**
   - Auth: ADMIN JWT
   - `404`

---

### 3. Properties Endpoints

**File:** `test/properties.e2e-spec.ts`

1. **GET `/properties` — list with no filter**
   - Auth: None
   - `200` → paginated result

2. **GET `/properties` — filter by city**
   - Auth: None
   - `200` → filtered results

3. **GET `/properties` — filter by price range**
   - Auth: None
   - `200` → filtered results

4. **GET `/properties` — pagination params**
   - Auth: None
   - `200` → correct page/limit

5. **GET `/properties/:id` — get existing**
   - Auth: None
   - `200` → property detail, views += 1

6. **GET `/properties/:id` — non-existent**
   - Auth: None
   - `404`

7. **POST `/properties` — seller creates**
   - Auth: SELLER JWT
   - `201` → property with `aiPriceSuggested`

8. **POST `/properties` — buyer tries create**
   - Auth: BUYER JWT
   - `403`

9. **POST `/properties` — missing required fields**
   - Auth: SELLER JWT
   - `400`

10. **PUT `/properties/:id` — owner updates**
    - Auth: SELLER JWT (owner)
    - `200`

11. **PUT `/properties/:id` — non-owner updates**
    - Auth: SELLER JWT (other)
    - `403`

12. **PUT `/properties/:id/status` — admin approves**
    - Auth: ADMIN JWT
    - `200` → status = APPROVED

13. **PUT `/properties/:id/status` — non-admin tries**
    - Auth: SELLER JWT
    - `403`

14. **DELETE `/properties/:id` — owner deletes**
    - Auth: SELLER JWT (owner)
    - `200`

15. **DELETE `/properties/:id` — admin deletes any**
    - Auth: ADMIN JWT
    - `200`

16. **DELETE `/properties/:id` — unauthorized**
    - Auth: BUYER JWT
    - `403`

---

### 4. Bookings Endpoints

**File:** `test/bookings.e2e-spec.ts`

1. **POST `/bookings` — buyer creates booking**
   - Auth: BUYER JWT
   - `201` → booking with status PENDING

2. **POST `/bookings` — missing fields**
   - Auth: BUYER JWT
   - `400`

3. **GET `/bookings` — buyer sees own bookings**
   - Auth: BUYER JWT
   - `200` → only buyer's bookings

4. **GET `/bookings` — seller sees their property bookings**
   - Auth: SELLER JWT
   - `200` → only seller-related

5. **GET `/bookings` — admin sees all**
   - Auth: ADMIN JWT
   - `200` → all bookings

6. **GET `/bookings/:id` — owner views own**
   - Auth: BUYER JWT (owner)
   - `200`

7. **GET `/bookings/:id` — unrelated user**
   - Auth: BUYER JWT (other)
   - `403`

8. **GET `/bookings/:id` — non-existent**
   - Auth: BUYER JWT
   - `404`

9. **PUT `/bookings/:id/status` — seller confirms**
   - Auth: SELLER JWT
   - `200` → status CONFIRMED

10. **PUT `/bookings/:id/status` — buyer cancels**
    - Auth: BUYER JWT
    - `200` → status CANCELLED

11. **PUT `/bookings/:id/status` — unrelated user**
    - Auth: BUYER JWT (other)
    - `403`

---

### 5. Wishlists Endpoints

**File:** `test/wishlists.e2e-spec.ts`

1. **GET `/wishlists` — get user wishlist**
   - Auth: BUYER JWT
   - `200` → array with property details

2. **GET `/wishlists` — no token**
   - Auth: None
   - `401`

3. **POST `/wishlists/:propertyId` — add to wishlist**
   - Auth: BUYER JWT
   - `201` → wishlist entry

4. **POST `/wishlists/:propertyId` — add duplicate**
   - Auth: BUYER JWT
   - `409` → already in wishlist

5. **DELETE `/wishlists/:propertyId` — remove from wishlist**
   - Auth: BUYER JWT
   - `200` → success message

6. **DELETE `/wishlists/:propertyId` — remove non-existent**
   - Auth: BUYER JWT
   - `404`

---

### 6. Chats & Messages Endpoints

**File:** `test/chats.e2e-spec.ts`

1. **POST `/chats` — create new chat**
   - Auth: BUYER JWT
   - `201` → new chat with buyer + seller + property

2. **POST `/chats` — create duplicate chat**
   - Auth: BUYER JWT
   - `200` → returns existing chat

3. **GET `/chats` — get user's chats**
   - Auth: BUYER JWT
   - `200` → chats where user is buyer or seller

4. **GET `/chats/:id` — get chat by id**
   - Auth: JWT (participant)
   - `200` → chat with relations

5. **GET `/chats/:id` — non-existent chat**
   - Auth: JWT
   - `404`

6. **GET `/chats/:chatId/messages` — get messages**
   - Auth: JWT (participant)
   - `200` → messages ordered by `createdAt ASC`

7. **GET `/chats/:chatId/messages` — empty chat**
   - Auth: JWT
   - `200` → empty array

---

### 7. WebSocket Gateway

**File:** `test/websocket.e2e-spec.ts`

1. **`join_chat`** — Valid chatId + userId
   - Server emits `joined_chat` → `{ chatId }`

2. **`leave_chat`** — Valid chatId + userId
   - Server emits `left_chat` → `{ chatId }`

3. **`send_message`** — Valid content + chatId + senderId
   - Server emits `receive_message` to room → Full message object

4. **`send_message`** — Same sender also receives
   - Server emits `message_sent` → Sent message object

5. **`typing`** — isTyping: true
   - Server emits `user_typing` to others in room → `{ userId, isTyping: true }`

6. **`typing`** — isTyping: false
   - Server emits `user_typing` → `{ userId, isTyping: false }`

7. **`send_message`** — Message persists after disconnect
   - `findByChatId` confirms message exists in DB

---

## Test Coverage Summary

- **Auth** — 9 unit + 9 integration = **18 cases**
- **Users** — 8 unit + 9 integration = **17 cases**
- **Properties** — 19 unit + 16 integration = **35 cases**
- **Bookings** — 13 unit + 11 integration = **24 cases**
- **Wishlists** — 6 unit + 6 integration = **12 cases**
- **Chats** — 6 unit + 7 integration = **13 cases**
- **Messages** — 5 unit + — (via chats) = **5 cases**
- **WebSocket** — — unit + 7 integration = **7 cases**

**Total: 66 unit · 65 integration · 131 cases**
