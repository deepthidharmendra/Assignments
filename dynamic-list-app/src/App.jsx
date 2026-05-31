import { useState, useMemo } from 'react'
import TaskInput from './components/TaskInput'
import TaskItem from './components/TaskItem'
import TaskFilter from './components/TaskFilter'
import TaskCount from './components/TaskCount'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React Hooks', completed: true },
    { id: 2, text: 'Build a Dynamic List App', completed: false },
    { id: 3, text: 'Submit the assignment', completed: false },
  ])
  const [filter, setFilter] = useState('all') // all | active | done

  // Add a new task
  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    }
    setTasks([...tasks, newTask])
  }

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle complete/incomplete
  const toggleTask = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  // Filter tasks based on active tab
  const filteredTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter((t) => !t.completed)
    if (filter === 'done') return tasks.filter((t) => t.completed)
    return tasks
  }, [tasks, filter])

  // Counts
  const totalCount = tasks.length
  const activeCount = tasks.filter((t) => !t.completed).length
  const doneCount = tasks.filter((t) => t.completed).length

  return (
    <div className="app-wrapper">
      <div className="app-container">

        {/* Header */}
        <div className="app-header">
          <h1 className="app-title">📝 Task List</h1>
          <p className="app-subtitle">Stay organised, get things done!</p>
        </div>

        {/* Task Count */}
        <TaskCount total={totalCount} active={activeCount} done={doneCount} />

        {/* Add Task */}
        <TaskInput onAdd={addTask} />

        {/* Filter Tabs */}
        <TaskFilter filter={filter} setFilter={setFilter} />

        {/* Task List */}
        <div className="task-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onToggle={toggleTask}
              />
            ))
          ) : (
            <div className="empty-state">
              <span>🎉</span>
              <p>No tasks here!</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default App