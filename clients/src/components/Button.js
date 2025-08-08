import styles from "../components/Button.module.css";

export function Button({ onClick, className, children, type = "button" }) {
  return (
    <button
      onClick={onClick}
      type="{type}"
      className={`${styles?.button} ${styles[className] || ""}`}
    >
      {children}
    </button>
  );
}

export default Button;
