# AeroDash

AeroDash is a full-stack weather dashboard built with React, Vite, Express, and MongoDB. Users can search for real-time weather, view forecasts, and save favorite cities.

## Tech Stack

- Frontend: React, Vite, Axios, Chart.js
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- External API: OpenWeatherMap

## Project Structure

```text
Assignment 4/
|-- client/
|-- server/
|-- readme.md
```

## Prerequisites

Make sure these are installed before running the project:

- Node.js 18 or later
- npm
- MongoDB Community Server
- Git

## Clone The Repository

```bash
git clone <your-repository-url>
cd "Assignment 4"
```

## Install Dependencies

Install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies:

```bash
cd ../client
npm install
```

## Environment Setup

### 1. Server environment

Create `server/.env` with the following values:

```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/aerodash
OPENWEATHER_API_KEY=your_openweathermap_api_key
```

Notes:

- `PORT=5001` matches the Vite proxy already configured in the client.
- `MONGO_URI` points to local MongoDB.
- `OPENWEATHER_API_KEY` must be a valid API key from OpenWeatherMap.

### 2. Client environment

Create `client/.env` with:

```env
VITE_API_BASE_URL=/api
```

This works with the local Vite proxy and forwards API requests to `http://localhost:5001`.

## Start MongoDB

Make sure your local MongoDB server is running before starting the backend.

On Windows, MongoDB often runs as a service automatically. You can check it in `services.msc` or with:

```powershell
Get-Service MongoDB
```

If MongoDB is not running, start it from the Services app or from an Administrator PowerShell.

## Run The Project

You need two terminals.

### Terminal 1: Start the backend

```bash
cd server
npm run dev
```

Expected backend output:

```text
MongoDB Connected: 127.0.0.1
AeroDash Server running on port 5001
```

### Terminal 2: Start the frontend

```bash
cd client
npm run dev
```

The Vite development server runs on:

```text
http://localhost:5175
```

## Open The App

After both servers are running:

- Frontend: `http://localhost:5175`
- Backend health check: `http://localhost:5001/`

## Production Build

To build the frontend:

```bash
cd client
npm run build
```

To run the backend without nodemon:

```bash
cd server
npm start
```

## Troubleshooting

### Port 5001 already in use

If you see `EADDRINUSE: address already in use :::5001`, another backend process is already running.

Find and stop it, then restart the server:

```powershell
netstat -ano | findstr :5001
taskkill /PID <pid> /F
```

### MongoDB not configured

If the backend prints `MongoDB not configured`, check that `server/.env` contains:

```env
MONGO_URI=mongodb://127.0.0.1:27017/aerodash
```

Make sure the line is written exactly once.

### MongoDB connection error

If MongoDB is installed locally but connection still fails:

- confirm the MongoDB service is running
- confirm `MONGO_URI` points to `127.0.0.1:27017`
- confirm no firewall or custom MongoDB port is blocking access

### Weather API requests fail

If weather search does not work:

- verify `OPENWEATHER_API_KEY` is valid
- restart the backend after changing `.env`

## Notes

- The frontend Vite server proxies `/api` requests to the backend on port `5001`.
- Favorite cities are designed to use MongoDB. If MongoDB is unavailable, the backend also includes a file-based fallback store in `server/data/favorites.json`.
- Do not commit real `.env` secrets to GitHub.
