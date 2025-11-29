# TheMealDB Explorer

This repository contains a lightweight proxy backend and a React frontend that explores TheMealDB (https://www.themealdb.com/api.php).

Structure
- `backend/` - Node.js + Express server that proxies and caches TheMealDB API.
- `frontend/` - Vite + React single-page app UI.

Quick start (Windows PowerShell):

1. Start backend
```powershell
cd backend
npm install
# optional: create .env from .env.example and adjust values
npm start
```

2. Start frontend (in a separate terminal)
```powershell
cd frontend
npm install
npm run dev
```

Open the frontend dev URL (usually http://localhost:5173) and the backend runs by default on `http://localhost:5000`.

Notes
- Backend caches API responses in-memory using an LRU cache. Configure with the `.env` values.
- The app uses TheMealDB test key `1` by default.

If you'd like, I can also add a root `package.json` with a `concurrently` script to start both servers together.