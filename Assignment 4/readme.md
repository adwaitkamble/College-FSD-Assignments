# 🌤️ AeroDash - Real-Time Weather Dashboard

## 📝 Project Overview
AeroDash is a full-stack web application designed to visualize real-time weather data and 5-day forecasts for cities worldwide. This project serves as a comprehensive demonstration of full-stack development principles, integrating a robust backend API, a responsive frontend, and interactive data visualizations. 

**Objective:** To provide users with an intuitive dashboard to search for global cities, view real-time weather metrics, save favorite locations, and visualize temperature and humidity trends.

---

## 🚀 Technologies & Software Requirements

### Development Tools
* **IDE:** Visual Studio Code (VS Code)
* **Environment:** Node.js (v18+)
* **Version Control:** Git & GitHub
* **API Testing:** Postman / Thunder Client

### Tech Stack (MERN)
* **Frontend:** React.js (Vite), Tailwind CSS
* **Data Visualization:** Chart.js, react-chartjs-2
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas, Mongoose (ODM)
* **HTTP Client:** Axios
* **External API:** OpenWeatherMap API

---

## 🧩 Website Components (Frontend UI)

1. **`Navbar`**: Top navigation containing the app logo and links (Home, Saved Cities).
2. **`SearchBar`**: Input field for users to query city weather data.
3. **`Dashboard`**: The main view container holding all weather widgets and charts.
4. **`CurrentWeatherWidget`**: Displays immediate metrics (current temperature, weather icon, humidity, wind speed).
5. **`ForecastLineChart`**: A Chart.js line graph visualizing temperature fluctuations over the next 5 days.
6. **`MetricsBarChart`**: A Chart.js bar chart comparing daily humidity or precipitation probabilities.
7. **`FavoritesSidebar`**: A quick-access list of cities saved by the user to the MongoDB database.

---

## 📂 Folder Structure

```text
weather-dashboard/
├── server/                     # Backend (Node.js/Express)
│   ├── config/
│   │   └── db.js               # MongoDB connection setup
│   ├── controllers/
│   │   ├── weatherController.js# Handles OpenWeather API calls
│   │   └── favoriteController.js# Handles saving/fetching favorite cities
│   ├── models/
│   │   └── FavoriteCity.js     # Mongoose schema for saved cities
│   ├── routes/
│   │   ├── weatherRoutes.js    # Routes for weather data endpoints
│   │   └── favoriteRoutes.js   # Routes for database CRUD operations
│   ├── .env                    # Environment variables (API keys, DB URI)
│   ├── server.js               # Entry point for backend
│   └── package.json            
│
└── client/                     # Frontend (React.js)
    ├── public/
    ├── src/
    │   ├── assets/             # Images, icons
    │   ├── components/         # Reusable UI components
    │   │   ├── Navbar.jsx
    │   │   ├── SearchBar.jsx
    │   │   ├── CurrentWeatherWidget.jsx
    │   │   └── FavoritesList.jsx
    │   ├── charts/             # Visualization components
    │   │   ├── ForecastLineChart.jsx
    │   │   └── MetricsBarChart.jsx
    │   ├── pages/              # Main page views
    │   │   ├── Home.jsx
    │   │   └── SavedDashboards.jsx
    │   ├── services/           # Axios API call logic
    │   │   └── api.js          # Functions connecting to Node backend
    │   ├── App.jsx             # Main React application component
    │   └── main.jsx            # React DOM rendering
    ├── .env                    # Frontend environment variables
    ├── tailwind.config.js      # Tailwind styling configuration
    └── package.json
    