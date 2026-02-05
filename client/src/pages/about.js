export function About() {
  const styles = {
    container: {
      padding: '20px',
      lineHeight: '1.6',
      maxWidth: '600px',
      fontFamily: 'Arial, sans-serif',
    },
    heading: { fontSize: '28px', marginBottom: '10px', color: '#333' },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About the Developer</h1>
      <p>
        Hi! I'm Nerya, a passionate software student and aspiring practical engineer specializing in
        modern web development.
        <br />
        This project is part of my learning journey, focused on mastering technologies such as
        React, Node.js, and full-stack programming.
        <br />
        <br />
        The customer management system you see here was built from scratch as a practical exercise
        in building responsive, user-friendly, and maintainable web applications.
        <br />
        You can add, edit, filter, and view customer data, switch between table and card views, and
        experience advanced state management with React Context.
        <br />
        <br />
        Want to see the code? Check out my GitHub:
        <br />
        <a href="https://github.com/Nerya253/CRM" target="_blank" rel="noopener noreferrer">
          MY CODE
        </a>
      </p>
    </div>
  );
}
