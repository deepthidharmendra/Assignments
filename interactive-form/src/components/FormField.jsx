function FormField({ label, name, type = 'text', value, onChange, error, placeholder, maxLength, rows }) {
  return (
    <div className="field-group">
      <label className="field-label">{label}</label>

      {rows ? (
        <textarea
          name={name}
          className={`field-input field-textarea ${error ? 'input-error' : ''}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows}
        />
      ) : (
        <input
          type={type}
          name={name}
          className={`field-input ${error ? 'input-error' : ''}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      )}

      {/* Character count for textarea */}
      {rows && (
        <p className="char-count">{value.length} / {maxLength || 300}</p>
      )}

      {/* Error or success indicator */}
      {error
        ? <p className="error-msg">⚠️ {error}</p>
        : value.trim() && <p className="success-msg">✅ Looks good!</p>
      }
    </div>
  )
}

export default FormField