// import React from "react";
// import Weather from "./Weather";
// import "./Weather.css";

// function App() {
//   return (
//     <div className="app">
//       <h1>Weather App</h1>
//       <Weather />
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import Weather from "./Weather";
import "./Weather.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <h1>Weather App</h1>
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <Weather />
    </div>
  );
}

export default App;

