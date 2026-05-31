function SuccessMessage({ onReset }) {
  return (
    <div className="success-screen">
      <div className="success-icon">🎉</div>
      <h2 className="success-title">Form Submitted!</h2>
      <p className="success-subtitle">
        Your information has been received successfully.
      </p>
      <button className="reset-btn" onClick={onReset}>
        Submit Another Response
      </button>
    </div>
  )
}

export default SuccessMessage