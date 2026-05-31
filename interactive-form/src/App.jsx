import { useState } from 'react'
import FormField from './components/FormField'
import SuccessMessage from './components/SuccessMessage'
import FormSummary from './components/FormSummary'
import { validateForm } from './utils/validate'
import './App.css'

const initialState = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  dob: '',
  message: '',
}

function App() {
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      // Scroll to top to show errors
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setErrors({})
      setSubmittedData(formData)
      setSubmitted(true)
    }
  }

  const handleReset = () => {
    setFormData(initialState)
    setErrors({})
    setSubmitted(false)
    setSubmittedData(null)
  }

  if (submitted) {
    return (
      <div className="app-wrapper">
        <div className="app-container">
          <SuccessMessage onReset={handleReset} />
          <FormSummary data={submittedData} />
        </div>
      </div>
    )
  }

  // Count how many fields are filled
  const filledCount = Object.values(formData).filter((v) => v.trim()).length
  const totalFields = Object.keys(formData).length
  const progress = Math.round((filledCount / totalFields) * 100)

  return (
    <div className="app-wrapper">
      <div className="app-container">

        {/* Header */}
        <div className="form-header">
          <h1 className="form-title">📋 Interactive Form</h1>
          <p className="form-subtitle">Fill in all fields and click Submit</p>
        </div>

        {/* Error Banner */}
        {Object.keys(errors).length > 0 && (
          <div className="error-banner">
            ⚠️ Please fix <strong>{Object.keys(errors).length}</strong> error(s) before submitting.
          </div>
        )}

        {/* Progress Bar */}
        <div className="progress-wrapper">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-label">{progress}% filled</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>

          <FormField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            placeholder="e.g. Rahul Sharma"
          />

          <FormField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="e.g. rahul@example.com"
          />

          <FormField
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder="e.g. 9876543210"
            maxLength={10}
          />

          {/* Password with show/hide toggle */}
          <div className="field-group">
            <label className="field-label">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className={`field-input ${errors.password ? 'input-error' : ''}`}
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 8 chars, 1 uppercase, 1 number, 1 symbol"
              />
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password
              ? <p className="error-msg">⚠️ {errors.password}</p>
              : formData.password.trim() && <p className="success-msg">✅ Looks good!</p>
            }
          </div>

          <FormField
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            error={errors.dob}
          />

          <FormField
            label="Message / Bio"
            name="message"
            value={formData.message}
            onChange={handleChange}
            error={errors.message}
            placeholder="Tell us something about yourself... (10–300 characters)"
            maxLength={300}
            rows={4}
          />

          <button type="submit" className="submit-btn">
            Submit Form 🚀
          </button>

        </form>
      </div>
    </div>
  )
}

export default App