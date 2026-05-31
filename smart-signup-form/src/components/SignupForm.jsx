import { useState } from 'react'

// Check password strength
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

function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const passwordStrength = getPasswordStrength(formData.password)

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' }) // clear error on type
  }

  // Validate all fields
  const validate = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.'
    } else if (passwordStrength.score < 2) {
      newErrors.password = 'Password is too weak. Add uppercase, numbers, or symbols.'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.'
    }

    return newErrors
  }

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div style={styles.card}>
        <div style={styles.successBox}>
          <div style={styles.successIcon}>✅</div>
          <h2 style={styles.successTitle}>Account Created!</h2>
          <p style={styles.successMsg}>Welcome, {formData.fullName}! Your signup was successful.</p>
          <button style={styles.resetBtn} onClick={() => { setSubmitted(false); setFormData({ fullName: '', email: '', password: '', confirmPassword: '' }) }}>
            Sign Up Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.card}>
      <h1 style={styles.title}>Create Account</h1>
      <p style={styles.subtitle}>Fill in the details below to get started</p>

      <form onSubmit={handleSubmit} noValidate>

        {/* Full Name */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Full Name</label>
          <input
            style={{ ...styles.input, ...(errors.fullName ? styles.inputError : {}) }}
            type="text"
            name="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p style={styles.error}>{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Email Address</label>
          <input
            style={{ ...styles.input, ...(errors.email ? styles.inputError : {}) }}
            type="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}
        </div>

        {/* Password */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Password</label>
          <input
            style={{ ...styles.input, ...(errors.password ? styles.inputError : {}) }}
            type="password"
            name="password"
            placeholder="Min. 8 characters"
            value={formData.password}
            onChange={handleChange}
          />
          {/* Password Strength Bar */}
          {formData.password.length > 0 && (
            <div style={styles.strengthWrapper}>
              <div style={styles.strengthBarBg}>
                <div style={{
                  ...styles.strengthBarFill,
                  width: `${(passwordStrength.score / 4) * 100}%`,
                  backgroundColor: passwordStrength.color,
                }} />
              </div>
              <span style={{ ...styles.strengthLabel, color: passwordStrength.color }}>
                {passwordStrength.label}
              </span>
            </div>
          )}
          {errors.password && <p style={styles.error}>{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Confirm Password</label>
          <input
            style={{ ...styles.input, ...(errors.confirmPassword ? styles.inputError : {}) }}
            type="password"
            name="confirmPassword"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p style={styles.error}>{errors.confirmPassword}</p>}
        </div>

        <button type="submit" style={styles.submitBtn}>
          Create Account →
        </button>

      </form>
    </div>
  )
}

// Inline styles
const styles = {
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '460px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '6px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '28px',
  },
  fieldGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#444',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    fontSize: '14px',
    border: '1.5px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border 0.2s',
  },
  inputError: {
    border: '1.5px solid #e74c3c',
  },
  error: {
    color: '#e74c3c',
    fontSize: '12px',
    marginTop: '5px',
  },
  strengthWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '8px',
  },
  strengthBarBg: {
    flex: 1,
    height: '6px',
    backgroundColor: '#eee',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  strengthBarFill: {
    height: '100%',
    borderRadius: '10px',
    transition: 'width 0.3s, background-color 0.3s',
  },
  strengthLabel: {
    fontSize: '12px',
    fontWeight: '600',
    minWidth: '45px',
  },
  submitBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
  },
  successBox: {
    textAlign: 'center',
    padding: '20px 0',
  },
  successIcon: {
    fontSize: '50px',
    marginBottom: '16px',
  },
  successTitle: {
    fontSize: '24px',
    color: '#1a1a2e',
    marginBottom: '8px',
  },
  successMsg: {
    color: '#666',
    marginBottom: '24px',
  },
  resetBtn: {
    padding: '10px 24px',
    backgroundColor: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
}

export default SignupForm