import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

function MoodChart({ history, moods }) {
  // Count how many times each mood was selected
  const data = moods.map((mood) => ({
    name: mood.emoji + ' ' + mood.label,
    count: history.filter((h) => h.id === mood.id).length,
    color: mood.color,
  })).filter((d) => d.count > 0)

  return (
    <div className="chart-box">
      <h3 className="section-title">📊 Mood Chart</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MoodChart