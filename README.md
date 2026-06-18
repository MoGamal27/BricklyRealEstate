# Brickly — Real Estate Platform

Brickly is a full-stack real estate platform that lets users browse, list, and book properties in Egypt. It includes an AI-powered price prediction engine trained on Egyptian housing market data, a RESTful backend with real-time chat, and a modern React frontend.

---

## Project Structure

```
project/
├── Frontend/   # React + Vite + Tailwind UI
├── backend/    # NestJS REST API + WebSocket server
└── AI/         # Flask price prediction microservice
```

### Frontend
Built with **React 18**, **Vite**, **Tailwind CSS**, and **shadcn/ui**. Handles property listings, user authentication, bookings, and real-time chat via WebSockets.

### Backend
Built with **NestJS** and **PostgreSQL** (TypeORM). Provides JWT authentication, role-based access control, property management, booking workflows, real-time messaging via Socket.io, and image uploads through Cloudinary.

### AI
A **Flask** microservice that exposes a `/predict` endpoint. It uses a pre-trained machine learning model (`model.pkl`) to estimate property prices based on features like type, area, bedrooms, city, and furnishing status.

---

## Prerequisites

- Node.js >= 18
- Python >= 3.9
- PostgreSQL database
- A Cloudinary account (for image uploads)

---

## Running the Project

### 1. AI Service

```bash
cd AI
pip install flask joblib pandas numpy scikit-learn
python app.py
```

Runs on `http://localhost:5000`

---

### 2. Backend

```bash
cd backend
npm install
```

Copy the example env file and fill in your values:

```bash
copy .env.example .env
```

Key variables to set in `.env`:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=brickly
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
AI_SERVICE_URL=http://localhost:5000
```

Then start the server:

```bash
npm run start:dev
```

Runs on `http://localhost:3000`

---

### 3. Frontend

```bash
cd Frontend
npm install
npm run dev
```

Runs on `http://localhost:8080`

---

## Tech Stack Summary

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 18, Vite, Tailwind, shadcn/ui |
| Backend  | NestJS, TypeORM, PostgreSQL, JWT    |
| AI       | Flask, scikit-learn, pandas         |
| Realtime | Socket.io                           |
| Storage  | Cloudinary                          |
