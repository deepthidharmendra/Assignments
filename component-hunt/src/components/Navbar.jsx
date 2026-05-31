function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">📸 Instagram</div>
      <div className="nav-search">
        <input type="text" placeholder="🔍 Search" className="search-input" />
      </div>
      <div className="nav-icons">
        <button className="nav-icon-btn" title="Home">🏠</button>
        <button className="nav-icon-btn" title="Reels">🎬</button>
        <button className="nav-icon-btn" title="Messages">💬</button>
        <button className="nav-icon-btn" title="Notifications">❤️</button>
        <button className="nav-icon-btn" title="Profile">👤</button>
      </div>
    </nav>
  )
}

export default Navbar