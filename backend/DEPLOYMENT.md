# Deployment

In this section, we outline the deployment process for our real estate management application. The deployment strategy ensures that our application is accessible, scalable, and performs efficiently in a production environment.

---

## 1. Backend — Railway (NestJS)

For deploying our application, we utilised Railway, a modern cloud platform renowned for its simplicity, developer experience, and automatic deployments. Railway offers seamless integration with Git repositories, automatic SSL certificates, and built-in monitoring capabilities. Railway's platform automatically detects our NestJS application and configures the build process accordingly, providing sufficient resources for our initial deployment while allowing for easy scaling as the application's user base grows.

### Database — Neon (PostgreSQL)

To host our PostgreSQL database, we employed Neon, a serverless PostgreSQL platform designed for modern cloud applications. Neon provides a fully managed PostgreSQL database with features including automatic backups, point-in-time recovery, and connection pooling. Its serverless architecture scales automatically based on demand, with instant database creation and branching for development and testing, ensuring the database remains responsive and reliable under varying loads.

### Environment Variables

The deployment process requires proper configuration of environment variables. Railway provides a secure environment variable management system where we configure `DATABASE_URL`, `JWT_SECRET`, `PORT`, and `NODE_ENV`. The `DATABASE_URL` is provided by Neon and includes all connection parameters including SSL configuration. The `JWT_SECRET` is set to a strong, randomly generated key for production security. Railway automatically assigns the `PORT` variable, and `NODE_ENV` is set to `production` to enable production optimisations.

### Build and Deploy Pipeline

The deployment process begins with connecting our Git repository to Railway, which automatically detects the NestJS application and reads the `package.json` file to understand dependencies and build scripts. During the build phase, Railway installs all dependencies and compiles TypeScript to JavaScript, generating the production-ready code in the `dist` directory. After a successful build, Railway starts the application and continuously monitors its health, automatically restarting the service if it becomes unresponsive.

Railway implements continuous deployment by automatically triggering a new build whenever code is pushed to the main branch, with no manual intervention required. If a deployment fails, Railway automatically reverts to the previous working version, ensuring zero downtime. Railway also provides a public URL with automatically provisioned SSL certificates, and custom domains can be configured by adding DNS records.

### Scaling

Railway supports both vertical and horizontal scaling. Vertical scaling is achieved by upgrading the service plan, while horizontal scaling runs multiple instances behind a load balancer. The Neon database scales automatically based on demand, with connection pooling managed transparently even under high traffic. Neon additionally provides automatic daily backups and point-in-time recovery, while Railway maintains deployment history for quick rollbacks.

### Security

Security in production is ensured through multiple layers: all communication uses HTTPS with automatically managed SSL certificates, environment variables are encrypted and securely stored by Railway, the Neon database requires SSL connections, and Railway provides DDoS protection and automatic security updates. To ensure optimal performance, TypeScript compilation removes development code, the NestJS framework runs in production mode with caching enabled, and database queries are optimised using TypeORM's query builder with proper indexing on frequently queried columns.

---

## 2. AI Service — Railway (Python / Flask)

The AI price prediction service is a separate Python microservice deployed independently on Railway as its own service, allowing it to scale and be maintained independently of the main backend.

### Service Overview

The AI service is a lightweight Flask application (`app.py`) that exposes a REST endpoint for property price prediction. It loads a pre-trained machine learning model along with its associated artefacts at startup:

| Artefact | File | Purpose |
|----------|------|---------|
| Trained model | `model.pkl` | Random Forest / gradient boosted model serialised with `joblib` |
| Feature scaler | `scaler.pkl` | `StandardScaler` instance for input normalisation |
| Label encoders | `label_encoder.json` | Categorical-to-integer mappings for Type, City, Furnished, etc. |
| Feature names | `feature_names.json` | Ordered list of features expected by the model |

### Prediction Endpoint

The service exposes a single prediction endpoint:

```
POST /predict
Content-Type: application/json
```

**Request body** (single object or array):
```json
{
  "Type": "Apartment",
  "Bedrooms": 3,
  "Bathrooms": 2,
  "Area": 165,
  "Furnished": "No",
  "Level": "1",
  "Payment_Option": "Cash",
  "Delivery_Term": "Finished",
  "City": "Nasr City"
}
```

**Response:**
```json
{
  "success": true,
  "predictions": [2350000.00],
  "count": 1
}
```

The preprocessing pipeline inside the service mirrors the exact transformations applied during model training: numeric cleaning, level normalisation (mapping string values such as `Ground` → 0 and `10+` → 11), categorical map-encoding, column reordering to match the training feature order, and finally `StandardScaler` transformation before the prediction is made.

### Railway Deployment Configuration

Deploying the Flask service on Railway requires the following files in the AI project directory:

**`requirements.txt`**
```
flask
joblib
pandas
numpy
scikit-learn
gunicorn
```

**`Procfile`** (tells Railway how to start the service in production)
```
web: gunicorn app:app --bind 0.0.0.0:$PORT
```

Railway detects the Python runtime from `requirements.txt`, installs all dependencies, and starts the service using Gunicorn as the production WSGI server. The `PORT` environment variable is automatically injected by Railway and bound at startup.

### Environment Variables (AI Service)

| Variable | Description |
|----------|-------------|
| `PORT` | Automatically assigned by Railway |
| `PYTHON_VERSION` | Optionally pin e.g. `3.11` |

### Integration with NestJS Backend

The NestJS backend communicates with the AI service via HTTP using `@nestjs/axios`. When a seller creates a new property listing, the `PropertiesService` sends the property attributes to the AI service's `/predict` endpoint and stores the returned price suggestion in the `aiPriceSuggested` column. The response also returns `aiPriceDifference` and `aiPriceDifferencePercentage` so the seller can compare their listed price against the model's estimate.

```
Seller creates property
        │
        ▼
  PropertiesService
        │  POST /predict
        ▼
  AI Flask Service (Railway)
        │  { predictions: [N] }
        ▼
  Property saved with aiPriceSuggested
```

If the AI service is unavailable or returns an error, the backend catches the exception and continues to save the property without the AI suggestion, ensuring resilience and no disruption to the listing flow.

---

## 3. Frontend — Vercel (React)

The frontend of the application is deployed on Vercel, the platform built specifically for modern frontend frameworks. Vercel provides an optimised global edge network, automatic preview deployments for every pull request, and zero-configuration deployments for Next.js and React applications.

### Why Vercel

Vercel is the natural choice for frontend deployment due to its deep integration with Next.js and React, offering features such as:

- **Edge Network (CDN):** Static assets and pages are served from the closest edge location globally, minimising latency.
- **Automatic Preview Deployments:** Every branch and pull request receives its own preview URL, enabling easy review and testing before merging.
- **Serverless Functions:** API routes (if any) are automatically deployed as serverless functions without additional configuration.
- **Instant Rollbacks:** Any previous deployment can be instantly promoted, providing a safe rollback mechanism.
- **Automatic HTTPS:** SSL certificates are provisioned and renewed automatically for all deployments, including preview URLs.

### Build and Deploy Pipeline

Vercel connects directly to the Git repository and triggers a new deployment on every push. The build process:

1. Vercel detects the frontend framework from `package.json`.
2. Runs the build command (e.g., `npm run build` / `next build`).
3. Outputs the static and server-rendered pages to the build directory.
4. Distributes the output across the global edge network.
5. Swaps the production URL to the new deployment with zero downtime.

| Field | Details |
|---|---|
| **App Name** | Brickly |
| **Tagline** | Find Your Perfect Home with AI-Powered Insights |
| **Framework** | React 18 + Vite 7 |
| **Styling** | Tailwind CSS + shadcn/ui (Radix UI) |
| **Routing** | React Router DOM v6 (Client-Side) |
| **State / Data** | TanStack React Query v5 |
| **Maps** | Leaflet + React Leaflet |
| **Build Tool** | Vite (ESM) |
| **Package Manager** | npm / bun |

---

## Vercel Configuration

### Build & Output Settings

| Setting | Value |
|---|---|
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |
| **Node Version** | 18.x or 20.x (recommended) |


## App Routes (All Pages)

### Public Routes
| Route | Page |
|---|---|
| `/` | Home (Index) |
| `/auth` | Login / Register |
| `/search` | Property Search |
| `/property/:id` | Property Details |
| `/about` | About |
| `/contact` | Contact |
| `/privacy` | Privacy Policy |
| `/reviews` | Reviews |

### Authenticated User Routes
| Route | Page |
|---|---|
| `/wishlist` | Saved Properties |
| `/chat` | Messaging |
| `/booking` | New Booking |
| `/bookings` | My Bookings |
| `/profile` | User Profile |

### Seller Routes
| Route | Page |
|---|---|
| `/SELLER/dashboard` | Seller Dashboard |
| `/SELLER/add-property` | Add New Property |
| `/SELLER/properties` | Manage Properties |
| `/SELLER/bookings` | Seller Bookings |

### Admin Routes
| Route | Page |
|---|---|
| `/ADMIN/dashboard` | Admin Dashboard |
| `/ADMIN/properties` | All Properties |
| `/ADMIN/users` | Manage Users |
| `/ADMIN/reports` | Reports & Analytics |

---

## Key Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^18.3.1 | UI Framework |
| `react-router-dom` | ^6.30.3 | Client-side routing |
| `@tanstack/react-query` | ^5.99.2 | Server state management |
| `tailwindcss` | ^3.4.17 | Utility-first CSS |
| `leaflet` + `react-leaflet` | ^1.9.4 / ^4.2.1 | Interactive maps |
| `react-hook-form` + `zod` | ^7.72.1 / ^3.25.76 | Form validation |
| `recharts` | ^2.15.4 | Charts & analytics |
| `sonner` | ^1.7.4 | Toast notifications |
| `next-themes` | ^0.3.0 | Dark/Light mode |

---

## Step-by-Step Vercel Deployment

1. **Push code to GitHub**

2. **Import project on Vercel**
   - Go to [vercel.com](https://vercel.com) → **Add New Project**
   - Select your repository

3. **Configure build settings** (Vercel usually auto-detects Vite)
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add the `vercel.json`** file

5. **Deploy** — Vercel builds and assigns a `.vercel.app` URL automatically

7. **Custom Domain** (optional)
   - Dashboard → Project → Settings → **Domains** 
---

