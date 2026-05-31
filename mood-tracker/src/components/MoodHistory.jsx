function MoodHistory({ history, onClear }) {
  return (
    <div className="history-box">
      <div className="history-header">
        <h3 className="section-title">🕒 Mood History</h3>
        <button className="clear-btn" onClick={onClear}>Clear All</button>
      </div>
      <div className="history-list">
        {history.map((entry, index) => (
          <div className="history-item" key={index} style={{ borderLeftColor: entry.color }}>
            <span className="history-emoji">{entry.emoji}</span>
            <div className="history-info">
              <span className="history-mood">{entry.label}</span>
              <span className="history-quote">"{entry.quote}"</span>
            </div>
            <span className="history-time">{entry.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MoodHistory