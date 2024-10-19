import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import { useState } from 'react';


function App() {

  const [currentWeather, setCurrentWeather] = useState(null);

  const [forecast, setForecast] = useState(null);



  const handleOnSearchChange = (searchData) => {
    // Extract latitude and longitude from the selected city (splitting by the comma and trimming any extra spaces)
    const [latitude, longitude] = searchData.value.split(",").map(coord => coord.trim());
  
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


  console.log(currentWeather);
  console.log(forecast);


  return (
    <div className="container">
      <Search onSearchChange = {handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      <p class="copyright">
             2024 Gerald Obuseh
    </p>
    </div>
    
  );
}

export default App;
