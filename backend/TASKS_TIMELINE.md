# Brickly Real Estate — Project Tasks Timeline

## Gantt Chart

```
Task                              | Wk1 | Wk2 | Wk3 | Wk4 | Wk5 | Wk6 | Wk7 | Wk8 | Wk9 | Wk10 |
----------------------------------|-----|-----|-----|-----|-----|-----|-----|-----|-----|------|
── BACKEND ──────────────────────────────────────────────────────────────────────────────────────
1.  Project Setup (BE)            | ███ |     |     |     |     |     |     |     |     |      |
2.  Database & Entity Design      | ███ |     |     |     |     |     |     |     |     |      |
3.  Auth Module (JWT)             | ███ | ██  |     |     |     |     |     |     |     |      |
4.  Users Module                  |     | ███ |     |     |     |     |     |     |     |      |
5.  Properties Module             |     | ███ | ██  |     |     |     |     |     |     |      |
6.  Wishlists Module              |     |     | ███ |     |     |     |     |     |     |      |
7.  Bookings Module               |     |     | ███ |     |     |     |     |     |     |      |
8.  Chats & Messages Module       |     |     |     | ███ |     |     |     |     |     |      |
9.  WebSocket Gateway             |     |     |     | ███ | ██  |     |     |     |     |      |
10. Cloudinary Integration        |     |     |     |     | ███ |     |     |     |     |      |
11. AI Price Suggestion           |     |     |     |     | ███ |     |     |     |     |      |
12. BE Testing & Bug Fixes        |     |     |     |     | ██  | ███ |     |     |     |      |
13. Documentation & Postman       |     |     |     |     |     | ███ |     |     |     |      |
── FRONTEND ─────────────────────────────────────────────────────────────────────────────────────
14. FE Project Setup (Vite+React) |     |     |     |     |     | ███ |     |     |     |      |
15. Routing & Layout              |     |     |     |     |     | ███ | ██  |     |     |      |
16. Auth Pages (Login/Register)   |     |     |     |     |     |     | ███ |     |     |      |
17. Property Search & Listing     |     |     |     |     |     |     | ███ | ██  |     |      |
18. Property Details + Map        |     |     |     |     |     |     | ███ | ██  |     |      |
19. Wishlist & Bookings Pages     |     |     |     |     |     |     |     | ███ |     |      |
20. Seller Dashboard & Forms      |     |     |     |     |     |     |     | ███ | ██  |      |
21. Admin Dashboard & Analytics   |     |     |     |     |     |     |     | ███ | ██  |      |
22. Real-time Chat UI             |     |     |     |     |     |     |     |     | ███ |      |
23. Dark/Light Mode + Polish      |     |     |     |     |     |     |     |     | ███ |      |
24. FE Testing & Bug Fixes        |     |     |     |     |     |     |     |     | ██  | ███  |
25. Vercel Deployment             |     |     |     |     |     |     |     |     |     | ███  |
```

---

## Task Details

### Backend (Weeks 1–6)

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
| 12 | **BE Testing & Bug Fixes** | Week 5–6 | API testing, edge cases, error handling, validation |
| 13 | **Documentation & Postman** | Week 6 | README, FILE_STRUCTURE, Postman collection (25 endpoints) |

### Frontend (Weeks 6–10)

| # | Task | Duration | Key Deliverables |
|---|------|----------|-----------------|
| 14 | **FE Project Setup** | Week 6 | Vite + React 18, Tailwind CSS, shadcn/ui, TanStack Query, React Router DOM v6 |
| 15 | **Routing & Layout** | Week 6–7 | App shell, protected routes (BUYER/SELLER/ADMIN guards), shared navbar/footer |
| 16 | **Auth Pages** | Week 7 | Login + Register forms, Zod validation, React Hook Form, JWT token storage |
| 17 | **Property Search & Listing** | Week 7–8 | Search filters (type, price, city, bedrooms), paginated grid, TanStack Query caching |
| 18 | **Property Details + Map** | Week 7–8 | Full property detail page, Leaflet map pin, AI price badge, image gallery |
| 19 | **Wishlist & Bookings Pages** | Week 8 | Save/remove wishlist, booking form (date + time), booking status tracking |
| 20 | **Seller Dashboard & Forms** | Week 8–9 | Add/edit property forms, manage listings, view booking requests, Cloudinary image upload |
| 21 | **Admin Dashboard & Analytics** | Week 8–9 | User management table, property approval workflow, Recharts analytics |
| 22 | **Real-time Chat UI** | Week 9 | Socket.io client, chat room list, message thread, typing indicator |
| 23 | **Dark/Light Mode + Polish** | Week 9 | next-themes toggle, responsive layout, toast notifications (Sonner), accessibility |
| 24 | **FE Testing & Bug Fixes** | Week 9–10 | Cross-browser testing, API error states, loading skeletons, mobile responsiveness |
| 25 | **Vercel Deployment** | Week 10 | `vercel.json` SPA config, env vars, build → `dist`, custom domain (optional) |

---

## Milestones

| Milestone | Week | Description |
|-----------|------|-------------|
| 🏁 Backend Core Ready | End of Week 2 | Auth + Users fully functional |
| 🏁 CRUD Features Complete | End of Week 3 | Properties, Wishlists, Bookings done |
| 🏁 Real-time Chat Live | End of Week 4 | WebSocket + Chat module working |
| 🏁 AI & Media Ready | End of Week 5 | Cloudinary + AI price suggestion integrated |
| 🏁 Backend Complete | End of Week 6 | Fully tested, documented, Postman collection ready |
| 🏁 Frontend Core Ready | End of Week 7 | Auth + Property browsing working end-to-end |
| 🏁 All Features Integrated | End of Week 9 | Wishlist, Bookings, Seller/Admin dashboards, Chat UI live |
| 🚀 Project Complete | End of Week 10 | Frontend deployed to Vercel, full-stack app live |

---

## Tech Stack Summary

### Backend

| Layer | Technology |
|-------|-----------|
| Framework | NestJS v11 |
| Language | TypeScript v5 |
| Database | PostgreSQL v12+ |
| ORM | TypeORM v0.3 |
| Auth | JWT + Passport |
| Real-time | Socket.io v4 |
| File Storage | Cloudinary v2 |
| AI Integration | Python ML Model (Axios) |
| Validation | class-validator |

### Frontend

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 7 |
| Styling | Tailwind CSS v3 + shadcn/ui (Radix UI) |
| Routing | React Router DOM v6 (Client-Side) |
| State / Data | TanStack React Query v5 |
| Forms | React Hook Form v7 + Zod v3 |
| Maps | Leaflet + React Leaflet |
| Charts | Recharts v2 |
| Real-time | Socket.io Client v4 |
| Notifications | Sonner v1 |
| Theme | next-themes v0.3 |
| Deployment | Vercel (Vite preset, output: `dist`) |

---

## App Routes

### Public
| Route | Page |
|-------|------|
| `/` | Home |
| `/auth` | Login / Register |
| `/search` | Property Search |
| `/property/:id` | Property Details |
| `/about` | About |
| `/contact` | Contact |
| `/privacy` | Privacy Policy |
| `/reviews` | Reviews |

### Authenticated (All Roles)
| Route | Page |
|-------|------|
| `/wishlist` | Saved Properties |
| `/chat` | Messaging |
| `/booking` | New Booking |
| `/bookings` | My Bookings |
| `/profile` | User Profile |

### Seller
| Route | Page |
|-------|------|
| `/SELLER/dashboard` | Seller Dashboard |
| `/SELLER/add-property` | Add New Property |
| `/SELLER/properties` | Manage Properties |
| `/SELLER/bookings` | Seller Bookings |

### Admin
| Route | Page |
|-------|------|
| `/ADMIN/dashboard` | Admin Dashboard |
| `/ADMIN/properties` | All Properties |
| `/ADMIN/users` | Manage Users |
| `/ADMIN/reports` | Reports & Analytics |

---

## Module Breakdown

### Backend
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

### Frontend
```
25 Routes across 4 access levels
├── Public       → 8 pages (no auth required)
├── Authenticated→ 5 pages (any logged-in user)
├── Seller       → 4 pages (SELLER role)
└── Admin        → 4 pages (ADMIN role)
                   ──────────────────
Total: 21 pages + Vercel deployment
```

---

## Vercel Deployment Config

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

| Setting | Value |
|---------|-------|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Node Version | 18.x / 20.x |
