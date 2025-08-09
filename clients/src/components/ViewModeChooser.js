import { useView } from "../contexts/ViewContext";
import styles from "../components/ViewModeChooser.module.css";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

export default function ViewModeChooser({ items }) {
  const { isCard } = useView();
  return <div>{isCard ? <Grid items={items} /> : <Table items={items} />}</div>;
}

export function Table({ items }) {
  const navigate = useNavigate();

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {Object.keys(items[0]).map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className={styles.tableRow}
              onClick={() => navigate(`/client/${item.id}`)}
              style={{ cursor: "pointer" }}
            >
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

export function Grid({ items }) {
  const navigate = useNavigate();

  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <div className={styles.gridContainer}>
      {items.map((item) => {
        return (
          <Card
            item={item}
            key={item.id}
            onClick={() => navigate(`/client/${item.id}`)}
            style={{ cursor: "pointer" }}
          />
        );
      })}
    </div>
  );
}
