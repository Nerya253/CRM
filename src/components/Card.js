import styles from "./ViewModeChooser.module.css";

function Card({ item }) {
  const { id, name, mail, phone } = item;

  return (
    <div key={id} className={styles.gridItem}>
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
