import Navbar from './components/Navbar'
import Stories from './components/Stories'
import PostFeed from './components/PostFeed'
import Sidebar from './components/Sidebar'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main-layout">
        <div className="feed-section">
          <Stories />
          <PostFeed />
        </div>
        <div className="sidebar-section">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default App