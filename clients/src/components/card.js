import styles from '../style/viewModeChooser.module.css';

export function Card({ item, onClick }) {
  const { id, name, description, role, email, phone } = item;

  return (
    <div
      key={id}
      className={styles.gridItem}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      tabIndex={0}
      role="button"
    >
      <p>
        <strong>id: </strong> {id}
      </p>
      <p>
        <strong>name: </strong> {name}
      </p>
      <p>
        <strong>email: </strong> {email}
      </p>
      <p>
        <strong>phone: </strong> {phone}
      </p>
      {role ? (
        <p>
          <strong>role: </strong> {role}
        </p>
      ) : null}
      {description ? (
        <p>
          <strong>description: </strong> {description}
        </p>
      ) : null}
    </div>
  );
}
