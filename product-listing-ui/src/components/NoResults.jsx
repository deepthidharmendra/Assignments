function NoResults({ onReset }) {
  return (
    <div className="no-results">
      <span>😕</span>
      <h3>No products found</h3>
      <p>Try adjusting your search or price filter</p>
      <button className="reset-btn" onClick={onReset}>Reset Filters</button>
    </div>
  )
}

export default NoResults