import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { useState } from "react";
function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    // Extract latitude and longitude from the selected city (splitting by the comma and trimming any extra spaces)
    const [latitude, longitude] = searchData.value
      .split(",")
      .map((coord) => coord.trim());

    // Ensure the latitude and longitude are valid numbers
    if (!isNaN(latitude) && !isNaN(longitude)) {
      const currentWeatherFetch = fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c8e9c117a04ee89379b6d3352ee513fd&units=metric`
      );

      const forecastFetch = fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=c8e9c117a04ee89379b6d3352ee513fd&units=metric`
      );

      Promise.all([currentWeatherFetch, forecastFetch])
        .then(async (response) => {
          const weatherResponse = await response[0].json();
          const forecastResponse = await response[1].json();

          // Store weather and forecast data in state
          setCurrentWeather({ city: searchData.label, ...weatherResponse });
          setForecast({ city: searchData.label, ...forecastResponse });
        })
        .catch((err) => console.log(err));
    } else {
      console.error("Invalid latitude or longitude values.");
    }
  };

  return (
    <div className="app">
      <div className="orb orb-left" aria-hidden="true"></div>
      <div className="orb orb-right" aria-hidden="true"></div>
      <div className="content">
        <header className="hero">
          <span className="hero-kicker">Geraldinho presents</span>
          <h1 className="hero-title">Atmospheric Brilliance</h1>
          <p className="hero-subtitle">
            Bask in luminous blues and midnight blacks while Geraldinho deciphers the skies.
          </p>
          <div className="search-wrapper">
            <Search onSearchChange={handleOnSearchChange} />
          </div>
        </header>
        <main className="panel-grid">
          {currentWeather ? (
            <CurrentWeather data={currentWeather} />
          ) : (
            <div className="placeholder-card">
              <h2>Summon the skies</h2>
              <p>Enter a city above to unveil Geraldinho&rsquo;s most dazzling forecasts.</p>
            </div>
          )}
          {forecast && <Forecast data={forecast} />}
        </main>
        <p className="copyright">2024 Gerald Obuseh</p>
      </div>
    </div>
  );
}

export default App;
