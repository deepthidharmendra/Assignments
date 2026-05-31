function MoodSelector({ moods, currentMood, onSelect }) {
  return (
    <div className="mood-selector">
      {moods.map((mood) => (
        <button
          key={mood.id}
          className={`mood-btn ${currentMood?.id === mood.id ? 'selected' : ''}`}
          style={currentMood?.id === mood.id ? { background: mood.color, borderColor: mood.color } : {}}
          onClick={() => onSelect(mood)}
        >
          <span className="mood-emoji">{mood.emoji}</span>
          <span className="mood-label">{mood.label}</span>
        </button>
      ))}
    </div>
  )
}

export default MoodSelector