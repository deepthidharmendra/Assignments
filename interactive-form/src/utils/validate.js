export function validateForm(data) {
  const errors = {}

  // Full Name
  if (!data.fullName.trim()) {
    errors.fullName = 'Full name is required.'
  } else if (data.fullName.trim().length < 3) {
    errors.fullName = 'Name must be at least 3 characters.'
  } else if (!/^[a-zA-Z\s]+$/.test(data.fullName)) {
    errors.fullName = 'Name can only contain letters and spaces.'
  }

  // Email
  if (!data.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  // Phone Number
  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required.'
  } else if (!/^[6-9]\d{9}$/.test(data.phone)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number.'
  }

  // Password
  if (!data.password) {
    errors.password = 'Password is required.'
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  } else if (!/[A-Z]/.test(data.password)) {
    errors.password = 'Password must include at least one uppercase letter.'
  } else if (!/[0-9]/.test(data.password)) {
    errors.password = 'Password must include at least one number.'
  } else if (!/[^A-Za-z0-9]/.test(data.password)) {
    errors.password = 'Password must include at least one special character.'
  }

  // Date of Birth
  if (!data.dob) {
    errors.dob = 'Date of birth is required.'
  } else {
    const today = new Date()
    const birthDate = new Date(data.dob)
    const age = today.getFullYear() - birthDate.getFullYear()
    if (age < 13) errors.dob = 'You must be at least 13 years old.'
    if (age > 120) errors.dob = 'Please enter a valid date of birth.'
  }

  // Message/Bio
  if (!data.message.trim()) {
    errors.message = 'Message/Bio is required.'
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  } else if (data.message.trim().length > 300) {
    errors.message = 'Message cannot exceed 300 characters.'
  }

  return errors
}