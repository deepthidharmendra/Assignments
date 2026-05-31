function WeatherCard({ data }) {
  const { location, current } = data

  const details = [
    { label: 'Feels Like', value: `${current.feelslike_c}°C` },
    { label: 'Humidity', value: `${current.humidity}%` },
    { label: 'Wind Speed', value: `${current.wind_kph} km/h` },
    { label: 'Visibility', value: `${current.vis_km} km` },
    { label: 'UV Index', value: current.uv },
    { label: 'Pressure', value: `${current.pressure_mb} mb` },
  ]

  return (
    <div className="weather-card">
      {/* Location */}
      <div className="weather-location">
        <h2>📍 {location.name}</h2>
        <p>{location.region}, {location.country}</p>
        <p className="weather-time">🕒 {location.localtime}</p>
      </div>

      {/* Main Temp */}
      <div className="weather-main">
        <img
          src={`https:${current.condition.icon}`}
          alt={current.condition.text}
          className="weather-icon"
        />
        <div>
          <h1 className="weather-temp">{current.temp_c}°C</h1>
          <p className="weather-condition">{current.condition.text}</p>
        </div>
      </div>

      {/* Detail Grid */}
      <div className="weather-grid">
        {details.map((item) => (
          <div className="weather-detail" key={item.label}>
            <span className="detail-label">{item.label}</span>
            <span className="detail-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeatherCard