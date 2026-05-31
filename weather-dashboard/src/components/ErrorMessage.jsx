function ErrorMessage({ message }) {
  return (
    <div className="error-box">
      <span>⚠️</span>
      <p>{message}</p>
    </div>
  )
}

export default ErrorMessage