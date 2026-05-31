function TaskFilter({ filter, setFilter }) {
  const tabs = ['all', 'active', 'done']

  return (
    <div className="filter-tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`filter-tab ${filter === tab ? 'active' : ''}`}
          onClick={() => setFilter(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default TaskFilter