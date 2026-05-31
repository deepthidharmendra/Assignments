import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [city, setCity] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(city)
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Enter city name... e.g. London"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit" className="search-btn">Search 🔍</button>
    </form>
  )
}

export default SearchBar