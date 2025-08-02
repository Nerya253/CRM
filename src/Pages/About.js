export default function About() {
  const styles = {
    container: {
      padding: "20px",
      lineHeight: "1.6",
      maxWidth: "600px",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      fontSize: "28px",
      marginBottom: "10px",
      color: "#333",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About</h1>
      <p style={styles.paragraph}>
        This is the app's about page. Here you can find general information
        about the system, its goals, and its main functionality.
      </p>
      <p style={styles.paragraph}>
        The app was built to conveniently display and manage customers,
        including viewing customer data, filtering by ID, and various views such
        as table and grid.
      </p>
    </div>
  );
}
