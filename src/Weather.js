// import React, { useState } from "react";
// import axios from "axios";

// const API_KEY = "c37e8f114500b7bc29e9ef219c43cbab"; // Replace with your OpenWeather API key
// const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// function Weather() {
//     const [city, setCity] = useState("");
//     const [weather, setWeather] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     const fetchWeather = async () => {
//         if (!city) {
//             setError("Please enter a city name.");
//             return;
//         }

//         setLoading(true);
//         setError("");

//         try {
//             const response = await axios.get(`${API_URL}`, {
//                 params: {
//                     q: city,
//                     appid: API_KEY,
//                     units: "metric",
//                 },
//             });
//             setWeather(response.data);
//         } catch (err) {
//             setError("City not found. Please try again.");
//             setWeather(null);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="weather-container">
//             <input
//                 type="text"
//                 placeholder="Enter city name"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//             />
//             <button onClick={fetchWeather}>Get Weather</button>

//             {loading && <p>Loading...</p>}
//             {error && <p className="error">{error}</p>}

//             {weather && (
//                 <div className="weather-info">
//                     <h2>{weather.name}</h2>
//                     <p>Temperature: {weather.main.temp}°C</p>
//                     <p>Condition: {weather.weather[0].description}</p>
//                     <img
//                         src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
//                         alt={weather.weather[0].description}
//                     />
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Weather;


import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "c37e8f114500b7bc29e9ef219c43cbab"; // Replace with your OpenWeather API key
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [favorites, setFavorites] = useState([]);

    // Load favorites from local storage on mount
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);
    }, []);

    const fetchWeather = async (cityName) => {
        if (!cityName) {
            setError("Please enter a city name.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.get(API_URL, {
                params: { q: cityName, appid: API_KEY, units: "metric" },
            });
            setWeather(response.data);
        } catch (err) {
            setError("City not found. Please try again.");
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    const addToFavorites = () => {
        if (weather && !favorites.includes(weather.name)) {
            const newFavorites = [...favorites, weather.name];
            setFavorites(newFavorites);
            localStorage.setItem("favorites", JSON.stringify(newFavorites));
        }
    };

    const removeFavorite = (cityName) => {
        const updatedFavorites = favorites.filter((fav) => fav !== cityName);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div className="weather-container">
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={() => fetchWeather(city)}>Get Weather</button>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            {weather && (
                <div className="weather-info">
                    <h2>{weather.name}</h2>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Condition: {weather.weather[0].description}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                        alt={weather.weather[0].description}
                    />
                    <button className="fav-btn" onClick={addToFavorites}>⭐ Add to Favorites</button>
                </div>
            )}

            {favorites.length > 0 && (
                <div className="favorites">
                    <h3>⭐ Favorite Cities</h3>
                    <ul>
                        {favorites.map((favCity) => (
                            <li key={favCity}>
                                <span onClick={() => fetchWeather(favCity)}>{favCity}</span>
                                <button onClick={() => removeFavorite(favCity)}>❌</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Weather;

