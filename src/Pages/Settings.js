import { Obj } from "../data/MyObj";
import styles from "../components/ViewModeChooser.module.css";

export function Table() {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {Object.keys(Obj[0]).map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Obj.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((val, idx) => (
                <td key={idx}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Grid() {
  return (
    <div className={styles.gridContainer}>
      {Obj.map((item) => (
        <div key={item.id} className={styles.gridItem}>
          {Object.entries(item).map(([key, val]) => (
            <p key={key}>
              <strong>{key}:</strong> {val}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
