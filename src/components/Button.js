import styles from "../components/Button.module.css";

export function Button({ onClick, className, children }) {
  console.log(className);

  return (
    <button
      onClick={onClick}
      className={`${styles?.button} ${styles[className] || ""}`}
    >
      {children}
    </button>
  );
}

export default Button;
