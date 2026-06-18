# Brickly 🏠

> Find Your Perfect Home with AI-Powered Insights

Brickly is a modern real estate web application built with React 18 and Vite. It features property search with interactive maps, AI-powered pricing insights, booking management, seller dashboards, and an admin panel — all wrapped in a clean, responsive UI.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 7 |
| Styling | Tailwind CSS + shadcn/ui (Radix UI) |
| Routing | React Router DOM v6 |
| State / Data | TanStack React Query v5 |
| Maps | Leaflet + React Leaflet |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Notifications | Sonner |
| Theme | next-themes (Dark / Light mode) |

---

## Prerequisites

Make sure you have the following installed before getting started:

- **Node.js** v18 or v20 — [Download](https://nodejs.org)
- **npm** v9+ (comes with Node.js) or **bun** — [Install bun](https://bun.sh)
- **Git** — [Download](https://git-scm.com)

Verify your versions:

```bash
node -v
npm -v
git --version
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/brickly.git
cd brickly
```

> Replace `your-username/brickly` with the actual repository URL.

### 2. Install dependencies

Using **npm**:

```bash
npm install
```

Or using **bun**:

```bash
bun install
```

### 3. Start the development server

Using **npm**:

```bash
npm run dev
```

Using **bun**:

```bash
bun run dev
```

The app will be available at **http://localhost:5173** by default.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## Project Structure

```
brickly/
├── public/               # Static assets (favicon, robots.txt)
├── src/
│   ├── assets/           # Images and media files
│   ├── components/       # Reusable UI components
│   │   └── ui/           # shadcn/ui base components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # Route-level page components
│   │   ├── admin/        # Admin panel pages
│   │   └── seller/       # Seller dashboard pages
│   ├── App.jsx           # Root component with routing
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── index.html            # HTML entry point
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── vite.config.js        # Vite configuration
```

---

## Application Routes

### Public

| Route | Page |
|---|---|
| `/` | Home |
| `/auth` | Login / Register |
| `/search` | Property Search |
| `/property/:id` | Property Details |
| `/about` | About |
| `/contact` | Contact |
| `/privacy` | Privacy Policy |
| `/reviews` | Reviews |

### Authenticated Users

| Route | Page |
|---|---|
| `/wishlist` | Saved Properties |
| `/chat` | Messaging |
| `/booking` | New Booking |
| `/bookings` | My Bookings |
| `/profile` | User Profile |

### Seller

| Route | Page |
|---|---|
| `/SELLER/dashboard` | Seller Dashboard |
| `/SELLER/add-property` | Add New Property |
| `/SELLER/properties` | Manage Properties |
| `/SELLER/bookings` | Seller Bookings |

### Admin

| Route | Page |
|---|---|
| `/ADMIN/dashboard` | Admin Dashboard |
| `/ADMIN/properties` | All Properties |
| `/ADMIN/users` | Manage Users |
| `/ADMIN/reports` | Reports & Analytics |

---

## Production Build

To generate a production-ready build:

```bash
npm run build
```

The output will be in the `dist/` directory. You can preview it locally with:

```bash
npm run preview
```

---

## Deployment (Vercel)

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your repository.
3. Vercel auto-detects Vite. Confirm these settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Node Version:** 18.x or 20.x
4. Add a `vercel.json` file in the project root to handle client-side routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

5. Click **Deploy**. Vercel will assign a `.vercel.app` URL automatically.
6. Optionally, configure a custom domain under **Project → Settings → Domains**.

---

## Troubleshooting

**Port already in use**
Vite will automatically try the next available port. You can also specify one:
```bash
npm run dev -- --port 3000
```

**Dependency issues**
Delete `node_modules` and the lock file, then reinstall:
```bash
# Windows
rmdir /s /q node_modules
del package-lock.json
npm install
```

**Map tiles not loading**
Leaflet requires an internet connection to fetch map tiles from OpenStreetMap. Make sure you're connected.

---

## License

This project is private. All rights reserved.
