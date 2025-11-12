import Styles from '../style/labelField.module.css';

export default function LabelField({
  value,
  label,
  editValue,
  setEditValue,
  placeholder = '',
  editMode = false,
  inputType = 'text',
  options = [],
  className = 'ViewLabel',
  disabled = false,
}) {
  const displayText = value == null || String(value).trim() === '' ? placeholder : String(value);

  function handleChange(e) {
    if (!setEditValue) return;
    setEditValue(e.target.value);
  }

  return (
    <label className={Styles[className] || ''}>
      {label && <strong>{label}</strong>}

      {editMode ? (
        inputType === 'select' ? (
          <select
            className={Styles.viewInput}
            value={editValue ?? ''}
            onChange={handleChange}
            disabled={disabled}
          >
            <option value="" disabled>
              {placeholder || 'Choose a role..'}
            </option>
            {options.map((op) => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className={Styles.viewInput}
            type={inputType}
            placeholder={placeholder}
            value={editValue ?? ''}
            onChange={handleChange}
            disabled={disabled}
          />
        )
      ) : (
        <div className={Styles.viewInput}>{displayText}</div>
      )}
    </label>
  );
}
