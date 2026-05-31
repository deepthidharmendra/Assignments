function MoodDisplay({ mood }) {
  return (
    <div className="mood-display" style={{ background: mood.bg, borderColor: mood.color }}>
      <div className="mood-display-emoji">{mood.emoji}</div>
      <h2 className="mood-display-label" style={{ color: mood.color }}>
        You're feeling {mood.label}!
      </h2>
      <p className="mood-display-quote">"{mood.quote}"</p>
    </div>
  )
}

export default MoodDisplay