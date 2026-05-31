function MoodStreak({ history }) {
  // Count streak of same mood in a row from latest
  const latestMood = history[0]?.id
  const streak = history.filter((h, i) => {
    if (i === 0) return true
    return history.slice(0, i + 1).every((h2) => h2.id === latestMood)
  }).length

  const total = history.length

  return (
    <div className="streak-row">
      <div className="streak-card">
        <span className="streak-value">🔥 {streak}</span>
        <span className="streak-label">Current Streak</span>
      </div>
      <div className="streak-card">
        <span className="streak-value">📋 {total}</span>
        <span className="streak-label">Total Entries</span>
      </div>
      <div className="streak-card">
        <span className="streak-value">{history[0]?.emoji}</span>
        <span className="streak-label">Latest Mood</span>
      </div>
    </div>
  )
}

export default MoodStreak