import { useState } from 'react'

function getPasswordStrength(password) {
  if (password.length === 0) return { label: '', color: '', score: 0 }
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { label: 'Weak', color: '#e74c3c', score }
  if (score === 2) return { label: 'Fair', color: '#f39c12', score }
  if (score === 3) return { label: 'Good', color: '#3498db', score }
  return { label: 'Strong', color: '#2ecc71', score }
}

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const passwordStrength = getPasswordStrength(formData.password)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.'
    if (!formData.email.trim()) newErrors.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email.'
    if (!formData.password) newErrors.password = 'Password is required.'
    else if (formData.password.length < 8) newErrors.password = 'Min. 8 characters required.'
    else if (passwordStrength.score < 2) newErrors.password = 'Password too weak.'
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password.'
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) setErrors(validationErrors)
    else setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="page-container">
        <div className="form-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '50px', marginBottom: '16px' }}>✅</div>
          <h2>Account Created!</h2>
          <p style={{ color: '#666', margin: '10px 0 24px' }}>Welcome, {formData.fullName}!</p>
          <button className="btn-submit" onClick={() => { setSubmitted(false); setFormData({ fullName: '', email: '', password: '', confirmPassword: '' }) }}>
            Sign Up Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="form-card">
        <h1 className="page-title">Create Account</h1>
        <p style={{ color: '#888', fontSize: '14px', marginBottom: '24px' }}>Fill in the details below</p>

        <form onSubmit={handleSubmit} noValidate>
          {[
            { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
            { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
          ].map(({ name, label, type, placeholder }) => (
            <div className="field-group" key={name}>
              <label className="field-label">{label}</label>
              <input className={`field-input ${errors[name] ? 'input-error' : ''}`} type={type} name={name} placeholder={placeholder} value={formData[name]} onChange={handleChange} />
              {errors[name] && <p className="error-msg">{errors[name]}</p>}
            </div>
          ))}

          <div className="field-group">
            <label className="field-label">Password</label>
            <input className={`field-input ${errors.password ? 'input-error' : ''}`} type="password" name="password" placeholder="Min. 8 characters" value={formData.password} onChange={handleChange} />
            {formData.password.length > 0 && (
              <div className="strength-wrapper">
                <div className="strength-bar-bg">
                  <div className="strength-bar-fill" style={{ width: `${(passwordStrength.score / 4) * 100}%`, backgroundColor: passwordStrength.color }} />
                </div>
                <span className="strength-label" style={{ color: passwordStrength.color }}>{passwordStrength.label}</span>
              </div>
            )}
            {errors.password && <p className="error-msg">{errors.password}</p>}
          </div>

          <div className="field-group">
            <label className="field-label">Confirm Password</label>
            <input className={`field-input ${errors.confirmPassword ? 'input-error' : ''}`} type="password" name="confirmPassword" placeholder="Re-enter your password" value={formData.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <p className="error-msg">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" className="btn-submit">Create Account →</button>
        </form>
      </div>
    </div>
  )
}

export default Signup