const suggestions = [
  { id: 1, user: 'react_dev', avatar: '⚛️', info: 'Suggested for you' },
  { id: 2, user: 'design_hub', avatar: '🎨', info: 'Follows you' },
  { id: 3, user: 'travel_daily', avatar: '✈️', info: 'Popular creator' },
  { id: 4, user: 'foodie_gram', avatar: '🍜', info: 'Suggested for you' },
  { id: 5, user: 'code_master', avatar: '💻', info: 'New to Instagram' },
]

function Sidebar() {
  return (
    <div className="sidebar">

      {/* Profile */}
      <div className="sidebar-profile">
        <div className="sidebar-avatar">😊</div>
        <div>
          <p className="sidebar-username">your_username</p>
          <p className="sidebar-name">Your Name</p>
        </div>
        <button className="switch-btn">Switch</button>
      </div>

      {/* Suggestions */}
      <div className="suggestions">
        <div className="suggestions-header">
          <p className="suggestions-title">Suggestions For You</p>
          <button className="see-all-btn">See All</button>
        </div>

        {suggestions.map((s) => (
          <div className="suggestion-item" key={s.id}>
            <div className="suggestion-avatar">{s.avatar}</div>
            <div className="suggestion-info">
              <p className="suggestion-user">{s.user}</p>
              <p className="suggestion-meta">{s.info}</p>
            </div>
            <button className="follow-btn">Follow</button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="sidebar-footer">
        © 2026 Instagram Clone · Built with React ⚛️
      </p>

    </div>
  )
}

export default Sidebar