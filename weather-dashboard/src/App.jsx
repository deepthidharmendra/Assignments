import { useState } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import ErrorMessage from './components/ErrorMessage'
import './App.css'

// 🔑 Paste your API key here
const API_KEY = 'de3619f70af5479d83d110252262203'

function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeather = async (city) => {
    if (!city.trim()) return

    setLoading(true)
    setError('')
    setWeather(null)

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      )
      setWeather(response.data)
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('City not found. Please check the spelling and try again.')
      } else {
        setError('Something went wrong. Please try again later.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <h1 className="app-title">🌤️ Weather Dashboard</h1>
        <p className="app-subtitle">Search for any city to get live weather</p>

        <SearchBar onSearch={fetchWeather} />

        {/* Loading State */}
        {loading && (
          <div className="loading-box">
            <div className="spinner" />
            <p>Fetching weather data...</p>
          </div>
        )}

        {/* Error State */}
        {error && <ErrorMessage message={error} />}

        {/* Weather Data */}
        {weather && !loading && <WeatherCard data={weather} />}

        {/* Initial empty state */}
        {!weather && !loading && !error && (
          <div className="empty-state">
            <span>🌍</span>
            <p>Enter a city name above to see the weather</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App