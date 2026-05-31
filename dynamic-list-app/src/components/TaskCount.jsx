function TaskCount({ total, active, done }) {
  const counts = [
    { label: 'Total', value: total, color: '#667eea' },
    { label: 'Active', value: active, color: '#f39c12' },
    { label: 'Done', value: done, color: '#2ecc71' },
  ]

  return (
    <div className="count-row">
      {counts.map((item) => (
        <div className="count-card" key={item.label}>
          <span className="count-value" style={{ color: item.color }}>
            {item.value}
          </span>
          <span className="count-label">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

export default TaskCount