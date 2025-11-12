import { useNavigate } from 'react-router-dom';
import { useView } from '../context/viewContext.js';
import styles from '../style/viewModeChooser.module.css';
import { Card } from './card.js';

export function ViewModeChooser({ items, type }) {
  const { isCard } = useView();
  if (!Array.isArray(items) || items.length === 0) {
    return <div className={styles.empty}>No items found</div>;
  }
  return isCard ? <Grid items={items} type={type} /> : <Table items={items} type={type} />;
}

export function Table({ items, type }) {
  const navigate = useNavigate();

  const allowedColumns =
    type === 'client'
      ? ['id', 'name', 'email', 'phone', 'description']
      : ['id', 'name', 'email', 'phone', 'role'];

  const goTo = (id) => navigate(type === 'client' ? `/client/${id}` : `/user/${id}`);

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {allowedColumns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {items.map((item, i) => (
            <tr
              key={`${item?.id ?? 'row'}-${i}`}
              className={styles.tableRow}
              onClick={() => goTo(item.id)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => (e.key === 'Enter' ? goTo(item.id) : null)}
              aria-label={`פתח ${type} ${item?.name ?? ''}`}
            >
              {allowedColumns.map((col) => (
                <td key={col}>{item?.[col] ?? ''}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Grid({ items, type }) {
  const navigate = useNavigate();
  const goTo = (id) => navigate(type === 'client' ? `/client/${id}` : `/user/${id}`);

  return (
    <div className={styles.gridContainer}>
      {items.map((item, i) => (
        <Card item={item} key={`${item?.id ?? 'card'}-${i}`} onClick={() => goTo(item.id)} />
      ))}
    </div>
  );
}
