import styles from '../style/button.module.css';

export function Button({ onClick, className = '', children, type = 'button', disabled = false }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`${styles.button} ${styles[className] || ''}`}
    >
      {children}
    </button>
  );
}
