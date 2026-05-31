import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="page-container">
      <div className="hero">
        <h1 className="hero-title">Welcome to MyApp 👋</h1>
        <p className="hero-subtitle">
          A simple multi-page React app built with React Router.
        </p>
        <div className="hero-buttons">
          <Link to="/signup" className="btn-primary">Get Started →</Link>
          <Link to="/about" className="btn-secondary">Learn More</Link>
        </div>
      </div>

      <div className="cards-row">
        <div className="card">
          <span className="card-icon">⚡</span>
          <h3>Fast</h3>
          <p>Built with Vite for lightning-fast performance.</p>
        </div>
        <div className="card">
          <span className="card-icon">🧭</span>
          <h3>Navigable</h3>
          <p>Multiple pages using React Router DOM.</p>
        </div>
        <div className="card">
          <span className="card-icon">🎨</span>
          <h3>Stylish</h3>
          <p>Clean and modern UI out of the box.</p>
        </div>
      </div>
    </div>
  )
}

export default Home