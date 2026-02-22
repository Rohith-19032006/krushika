# Farmer Government Schemes & AI Prediction

Full-stack app with **Login-first authentication**, **Government Schemes** management, and **Smart AI Prediction** (soil, weather, crop). Role-based access: **User** and **Admin**.

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT, bcrypt

## Features

- **Auth:** Login (User/Admin), JWT, bcrypt, protected routes
- **UI:** Responsive, theme toggle (Dark: orange glow / Light: green + new bright green option), persisted in localStorage
- **User:** Government Schemes (search, filter, pagination), Smart AI Prediction (Soil, Weather, Crop)
- **Admin:** Manage users, schemes (CRUD), view prediction logs and analytics

## Project Structure

```
project krushika/
├── backend/
│   ├── config/db.js
│   ├── controllers/   (auth, scheme, prediction, admin)
│   ├── middleware/auth.js
│   ├── models/        (User, Scheme, PredictionLog)
│   ├── routes/        (auth, schemes, predictions, admin)
│   ├── scripts/seedSchemes.js
│   ├── utils/aiLogic.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  (Layout, ProtectedRoute)
│   │   ├── contexts/    (ThemeContext, AuthContext)
│   │   ├── pages/       (Login, UserDashboard, Schemes, SmartPrediction, Admin*)
│   │   ├── services/api.js
│   │   ├── App.jsx, main.jsx, index.css
│   │   └── ...
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## Setup

**Important:** There is no `package.json` or `.env.example` in the project root. You must run backend commands from the **backend** folder and frontend commands from the **frontend** folder.

### 1. MongoDB

Have MongoDB running locally (or use Atlas). Note the connection URI.

### 2. Backend

Open a terminal and run these commands **one by one** from the project root:

```bash
cd backend
```

Then copy the example env file and install dependencies:

- **Linux / macOS / Git Bash:**
  ```bash
  cp .env.example .env
  ```
- **Windows (PowerShell):**
  ```powershell
  Copy-Item .env.example .env
  ```

Edit `backend\.env` and set `MONGODB_URI`, `JWT_SECRET`, and optionally `WEATHER_API_KEY`. Then:

```bash
npm install
npm run seed
npm run dev
```

(`npm run seed` is optional but creates default admin/user and sample schemes. The server also creates default users and schemes on first start if the DB is empty.)

Backend runs at **http://localhost:5000**.

### 3. Frontend

Open a **second** terminal, go to the frontend folder, then install and run:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at **http://localhost:3000** and proxies `/api` to the backend.

### 4. Environment variables (backend .env)

| Variable         | Description                    |
|------------------|--------------------------------|
| PORT             | Server port (default 5000)      |
| MONGODB_URI      | MongoDB connection string      |
| JWT_SECRET       | Secret for JWT signing         |
| WEATHER_API_KEY  | Optional; OpenWeatherMap API   |

## Default accounts (after seed)

- **Admin:** `admin@farmer.com` / `admin123`
- **User:** `user@farmer.com` / `user123`

## API overview

- `POST /api/auth/login` — Login (body: email, password, role)
- `GET /api/auth/me` — Current user (Bearer token)
- `GET /api/schemes` — List schemes (query: page, limit, search, filter)
- `POST /api/schemes` — Create scheme (admin)
- `PUT /api/schemes/:id` — Update scheme (admin)
- `DELETE /api/schemes/:id` — Delete scheme (admin)
- `POST /api/predictions/soil` — Soil analysis
- `POST /api/predictions/weather` — Weather (uses API if key set)
- `POST /api/predictions/crop` — Crop recommendation
- `GET /api/admin/users` — List users (admin)
- `GET /api/admin/stats` — Analytics (admin)
- `GET /api/admin/prediction-logs` — Logs (admin)

## Security

- All non-auth routes require JWT (`Authorization: Bearer <token>`).
- Scheme create/update/delete and admin routes require `role: admin`.
- Passwords hashed with bcrypt; JWT used for session.

## Responsiveness

- Mobile: collapsible sidebar, touch-friendly buttons, single-column layouts.
- Desktop: sidebar always visible, max-width content area.
