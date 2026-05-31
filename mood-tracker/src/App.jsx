import { useState } from 'react'
import moods from './data/moods'
import MoodSelector from './components/MoodSelector'
import MoodDisplay from './components/MoodDisplay'
import MoodStreak from './components/MoodStreak'
import MoodHistory from './components/MoodHistory'
import MoodChart from './components/MoodChart'
import './App.css'

function App() {
  const [currentMood, setCurrentMood] = useState(null)
  const [history, setHistory] = useState([])

  const handleMoodSelect = (mood) => {
    const entry = {
      ...mood,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('en-IN'),
      quote: mood.quotes[Math.floor(Math.random() * mood.quotes.length)],
    }
    setCurrentMood(entry)
    setHistory((prev) => [entry, ...prev].slice(0, 20)) // keep last 20
  }

  const clearHistory = () => {
    setHistory([])
    setCurrentMood(null)
  }

  return (
    <div className="app-wrapper" style={currentMood ? { background: `linear-gradient(135deg, ${currentMood.color}33, ${currentMood.color}11)` } : {}}>
      <div className="app-container">

        {/* Header */}
        <div className="app-header">
          <h1 className="app-title">🌈 Mood Tracker</h1>
          <p className="app-subtitle">How are you feeling right now?</p>
        </div>

        {/* Mood Selector */}
        <MoodSelector moods={moods} currentMood={currentMood} onSelect={handleMoodSelect} />

        {/* Current Mood Display */}
        {currentMood && <MoodDisplay mood={currentMood} />}

        {/* Streak + Chart + History — only show if there's history */}
        {history.length > 0 && (
          <>
            <MoodStreak history={history} />
            <MoodChart history={history} moods={moods} />
            <MoodHistory history={history} onClear={clearHistory} />
          </>
        )}

      </div>
    </div>
  )
}

export default App