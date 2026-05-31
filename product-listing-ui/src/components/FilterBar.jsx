function FilterBar({ search, setSearch, maxPrice, setMaxPrice, absoluteMax }) {
  return (
    <div className="filter-box">
      <h2 className="filter-title">🔧 Filters</h2>

      {/* Search */}
      <div className="filter-group">
        <label className="filter-label">Search by Name</label>
        <input
          type="text"
          className="filter-input"
          placeholder="e.g. headphones..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Price Range */}
      <div className="filter-group">
        <label className="filter-label">
          Max Price: <span className="price-value">₹{maxPrice.toLocaleString()}</span>
        </label>
        <input
          type="range"
          className="filter-range"
          min={0}
          max={absoluteMax}
          step={100}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
        <div className="range-labels">
          <span>₹0</span>
          <span>₹{absoluteMax.toLocaleString()}</span>
        </div>
      </div>

      {/* Reset */}
      <button
        className="reset-btn"
        onClick={() => { setSearch(''); setMaxPrice(absoluteMax) }}
      >
        Reset Filters
      </button>
    </div>
  )
}

export default FilterBar