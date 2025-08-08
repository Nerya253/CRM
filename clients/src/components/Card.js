import styles from "./ViewModeChooser.module.css";

function Card({ item, onClick, style }) {
  const { id, name, mail, phone } = item;
  console.log(`Card rendered for item with id: ${id}`);

  return (
    <div
      key={id}
      className={styles.gridItem}
      onClick={onClick}
      style={{ ...style, cursor: "pointer" }}
      tabIndex={0}
      role="button"
    >
      <p>
        <strong>id:</strong> {id}
      </p>
      <p>
        <strong>name:</strong> {name}
      </p>
      <p>
        <strong>mail:</strong> {mail}
      </p>
      <p>
        <strong>phone:</strong> {phone}
      </p>
    </div>
  );
}

export default Card;
