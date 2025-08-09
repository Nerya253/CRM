import React from "react";
import styles from "../components/LabelField.module.css";

export default function LabelField({
  label,
  value,
  editValue,
  setEditValue,
  editMode,
  inputType = "text",
  className,
}) {
  return (
    <label className={`${styles[className] || ""}`}>
      <strong>{label}: </strong>
      {editMode ? (
        <input
          type={inputType}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className={styles.viewInput}
        />
      ) : (
        <span style={{ marginRight: 10 }}>{value}</span>
      )}
    </label>
  );
}
