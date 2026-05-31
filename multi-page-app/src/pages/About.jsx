function About() {
  return (
    <div className="page-container">
      <div className="about-box">
        <h1 className="page-title">About This App</h1>
        <p className="page-text">
          This is a multi-page Single Page Application (SPA) built using
          <strong> React</strong> and <strong>React Router DOM</strong>.
          It was created as part of a frontend development assignment.
        </p>

        <div className="about-grid">
          <div className="about-item">
            <h3>🛠️ Tech Stack</h3>
            <ul>
              <li>React (Vite)</li>
              <li>React Router DOM</li>
              <li>Plain CSS</li>
            </ul>
          </div>
          <div className="about-item">
            <h3>📄 Pages</h3>
            <ul>
              <li>Home — landing page</li>
              <li>About — this page</li>
              <li>Signup — form with validation</li>
            </ul>
          </div>
          <div className="about-item">
            <h3>✅ Features</h3>
            <ul>
              <li>Client-side routing</li>
              <li>Active link highlighting</li>
              <li>Form validation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About