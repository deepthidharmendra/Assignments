function FormSummary({ data }) {
  const fields = [
    { label: '👤 Full Name', value: data.fullName },
    { label: '📧 Email', value: data.email },
    { label: '📱 Phone', value: data.phone },
    { label: '🔒 Password', value: '••••••••' },
    { label: '🎂 Date of Birth', value: data.dob },
    { label: '💬 Message', value: data.message },
  ]

  return (
    <div className="summary-box">
      <h3 className="summary-title">📋 Submitted Details</h3>
      {fields.map((field) => (
        <div className="summary-item" key={field.label}>
          <span className="summary-label">{field.label}</span>
          <span className="summary-value">{field.value}</span>
        </div>
      ))}
    </div>
  )
}

export default FormSummary