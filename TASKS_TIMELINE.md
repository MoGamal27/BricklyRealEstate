# Brickly Real Estate — Project Tasks Timeline

## Gantt Chart

```
Task                          | Week 1 | Week 2 | Week 3 | Week 4 | Week 5 | Week 6 |
------------------------------|--------|--------|--------|--------|--------|--------|
1. Project Setup              | ████   |        |        |        |        |        |
2. Database & Entity Design   | ████   |        |        |        |        |        |
3. Auth Module (JWT)          | ████   | ██     |        |        |        |        |
4. Users Module               |        | ████   |        |        |        |        |
5. Properties Module          |        | ████   | ██     |        |        |        |
6. Wishlists Module           |        |        | ████   |        |        |        |
7. Bookings Module            |        |        | ████   |        |        |        |
8. Chats & Messages Module    |        |        |        | ████   |        |        |
9. WebSocket Gateway          |        |        |        | ████   | ██     |        |
10. Cloudinary Integration    |        |        |        |        | ████   |        |
11. AI Price Suggestion       |        |        |        |        | ████   |        |
12. Testing & Bug Fixes       |        |        |        |        | ██     | ████   |
13. Documentation & Postman   |        |        |        |        |        | ████   |
```

---

## Task Details

| # | Task | Duration | Key Deliverables |
|---|------|----------|-----------------|
| 1 | **Project Setup** | Week 1 | NestJS init, TypeScript config, PostgreSQL connection, `.env` setup |
| 2 | **Database & Entity Design** | Week 1 | 6 entities: User, Property, Wishlist, Booking, Chat, Message |
| 3 | **Auth Module** | Week 1–2 | Register, Login, JWT strategy, bcrypt hashing, role guards |
| 4 | **Users Module** | Week 2 | Profile CRUD, admin user management, role-based access |
| 5 | **Properties Module** | Week 2–3 | Full CRUD, advanced filters, status flow (PENDING→APPROVED→SOLD), view counter |
| 6 | **Wishlists Module** | Week 3 | Add/remove properties, list wishlist with full details |
| 7 | **Bookings Module** | Week 3 | Schedule viewings, status management (PENDING→CONFIRMED→COMPLETED) |
| 8 | **Chats & Messages Module** | Week 4 | Chat room creation, message history, REST endpoints |
| 9 | **WebSocket Gateway** | Week 4–5 | Real-time messaging, join/leave rooms, typing indicators |
| 10 | **Cloudinary Integration** | Week 5 | Image upload service for property photos |
| 11 | **AI Price Suggestion** | Week 5 | Integration with Egypt House Price ML model via Axios |
| 12 | **Testing & Bug Fixes** | Week 5–6 | API testing, edge cases, error handling, validation |
| 13 | **Documentation & Postman** | Week 6 | README, FILE_STRUCTURE, Postman collection (25 endpoints) |

---

## Milestones

| Milestone | Week | Description |
|-----------|------|-------------|
| 🏁 Backend Core Ready | End of Week 2 | Auth + Users fully functional |
| 🏁 CRUD Features Complete | End of Week 3 | Properties, Wishlists, Bookings done |
| 🏁 Real-time Chat Live | End of Week 4 | WebSocket + Chat module working |
| 🏁 AI & Media Ready | End of Week 5 | Cloudinary + AI price suggestion integrated |
| 🚀 Project Complete | End of Week 6 | Fully tested, documented, and deployed |

---

## Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Framework | NestJS v11 |
| Language | TypeScript v5 |
| Database | PostgreSQL v12+ |
| ORM | TypeORM v0.3 |
| Auth | JWT + Passport |
| Real-time | Socket.io v4 |
| File Storage | Cloudinary v2 |
| AI Integration | Python ML Model (axios) |
| Validation | class-validator |

---

## Module Breakdown

```
8 Feature Modules
├── auth         → 3 endpoints
├── users        → 4 endpoints
├── properties   → 7 endpoints
├── wishlists    → 3 endpoints
├── bookings     → 4 endpoints
├── chats        → 3 endpoints
├── messages     → 1 endpoint
└── websocket    → 4 real-time events
                   ──────────────────
Total: 25 REST endpoints + 4 WebSocket events
```
