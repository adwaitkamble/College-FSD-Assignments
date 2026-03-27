# Assignment 6 – DriveDeals: Used Vehicle Marketplace

> A full-stack E-Commerce portal for buying and selling used vehicles (cars, bikes, scooters, etc.)
> Built with **Node.js**, **Express.js**, and **MongoDB**.

---

## 📋 Requirements

Make sure you have the following installed before running the project:

| Requirement | Version | Download |
|---|---|---|
| **Node.js** | v18 or higher | [nodejs.org](https://nodejs.org) |
| **npm** | v9 or higher | Comes with Node.js |
| **Docker Desktop** | Latest | [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop) |

> **No need to install MongoDB separately** — Docker will run it as a container.

---

## 🚀 How to Run the Project

### Step 1 – Clone or Download the Project

```bash
cd "Assignment 6"
```

### Step 2 – Install Node.js Dependencies

```bash
npm install
```

### Step 3 – Start MongoDB using Docker

Make sure **Docker Desktop is open and running**, then run:

```bash
docker run -d --name mongodb -p 27017:27017 mongo:latest
```

> This downloads and starts a MongoDB server on port `27017`.
> If the container already exists from a previous run, just start it:
> ```bash
> docker start mongodb
> ```

To verify MongoDB is running:
```bash
docker ps
```

### Step 4 – Configure Environment Variables

The `.env` file is already set up for local development:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/used_items_marketplace
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_2024
NODE_ENV=development
```

No changes needed for local setup.

### Step 5 – Seed the Database (Add Sample Data)

Run this once to populate the database with 10 sample vehicle listings:

```bash
node seed.js
```

Expected output:
```
✅ Connected to MongoDB
🗑️  Cleared old seed data
👤 Created demo user: demo@drivedeals.com (password: demo123)
🚗 Inserted 10 sample listings
🎉 Seeding complete!
```

### Step 6 – Start the Development Server

```bash
npm run dev
```

Expected output:
```
✅ Connected to MongoDB
🚀 Server running at http://localhost:3000
```

### Step 7 – Open in Browser

Visit: **[http://localhost:3000](http://localhost:3000)**

---

## 🔐 Demo Login Credentials

After seeding, you can log in with the demo account:

- **Email:** `demo@drivedeals.com`
- **Password:** `demo123`

---

## 📁 Project Structure

```
Assignment 6/
├── server.js               # Main Express server entry point
├── seed.js                 # Script to populate DB with sample data
├── .env                    # Environment variables
├── Dockerfile              # Docker image config for Node.js app
├── docker-compose.yml      # Run app + MongoDB together with Docker
│
├── models/
│   ├── User.js             # User schema (bcrypt password hashing)
│   └── Listing.js          # Vehicle listing schema
│
├── routes/
│   ├── auth.js             # Auth API: register, login, get user
│   └── listings.js         # Listings API: CRUD + image upload
│
├── middleware/
│   └── auth.js             # JWT authentication middleware
│
├── uploads/                # Uploaded vehicle images (auto-created)
│
└── public/                 # Frontend (served statically by Express)
    ├── index.html          # Home – browse listings, search, filter
    ├── login.html          # Login page
    ├── register.html       # Registration page
    ├── sell.html           # Post a new vehicle listing
    ├── dashboard.html      # Manage your own listings
    ├── listing.html        # Single listing detail with seller info
    ├── css/style.css       # Premium dark-mode stylesheet
    └── js/
        ├── app.js          # Shared API utility functions
        └── index.js        # Home page logic (search, filters, pagination)
```

---

## ✨ Features

- 🔐 **User Authentication** — Register & Login with JWT tokens, bcrypt password hashing
- 🔍 **Search & Filter** — Search by keyword (brand, model, title), filter by category, fuel type, transmission, price range
- 📋 **Browse Listings** — Paginated grid of all available vehicles
- ➕ **Post a Listing** — Sell your vehicle with up to 5 image uploads
- 🖼️ **Listing Detail** — Full specs, image gallery, seller phone & email
- 📊 **My Dashboard** — View, delete, mark-as-sold your own listings
- 🐳 **Docker Support** — MongoDB via Docker, full Docker Compose deployment

---

## 🐳 Deploy with Docker Compose (Optional)

To run both the Node.js app AND MongoDB together in Docker:

```bash
# Stop any existing standalone MongoDB container
docker stop mongodb
docker rm mongodb

# Build and start everything
docker-compose up -d
```

Open: **[http://localhost:3000](http://localhost:3000)**

Other Docker Compose commands:
```bash
docker-compose down          # Stop all containers
docker-compose logs -f       # View live logs
docker-compose ps            # Check container status
```

---

## 📡 API Reference

### Auth Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and get JWT token |
| `GET` | `/api/auth/me` | Get current logged-in user |

### Listing Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/listings` | No | Get all listings (with filters) |
| `GET` | `/api/listings/:id` | No | Get single listing |
| `POST` | `/api/listings` | ✅ Yes | Create a new listing |
| `PUT` | `/api/listings/:id` | ✅ Owner | Update a listing |
| `DELETE` | `/api/listings/:id` | ✅ Owner | Delete a listing |
| `GET` | `/api/listings/my/listings` | ✅ Yes | Get your own listings |

### Filter Query Params for `GET /api/listings`

| Param | Example | Description |
|---|---|---|
| `search` | `Honda` | Search in title, brand, model, location |
| `category` | `Car` | Car, Bike, Scooter, Truck, Bus, Other |
| `fuel_type` | `Petrol` | Petrol, Diesel, Electric, CNG, Hybrid |
| `transmission` | `Manual` | Manual or Automatic |
| `minPrice` | `100000` | Minimum price in ₹ |
| `maxPrice` | `500000` | Maximum price in ₹ |
| `page` | `1` | Page number (default: 1) |
| `limit` | `12` | Results per page (default: 12) |

---

## 🛠️ Technologies Used

| Layer | Technology |
|---|---|
| Runtime | Node.js v18 |
| Framework | Express.js |
| Database | MongoDB (via Docker) |
| ODM | Mongoose |
| Authentication | JWT (jsonwebtoken) + bcryptjs |
| File Upload | Multer |
| Frontend | Vanilla HTML, CSS, JavaScript |
| Containerization | Docker, Docker Compose |
