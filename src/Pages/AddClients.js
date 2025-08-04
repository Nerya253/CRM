import React, { useState } from "react";
import { Obj } from "../data/MyObj";
import styles from "./AddClients.module.css";
import Button from "../components/Button";

export default function AddClients() {
  const [newClient, setNewClient] = useState({
    id: "",
    name: "",
    phone: "",
    mail: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !newClient.id ||
      !newClient.name ||
      !newClient.mail ||
      !newClient.phone
    ) {
      alert("Please fill all fields.");
      return;
    }
    if (newClient.id.length < 9 || newClient.id.length > 9) {
      alert("ID must be exactly 9 characters long.");
      return;
    }

    Obj.push(newClient);
    setNewClient({
      id: "",
      name: "",
      phone: "",
      mail: "",
    });
  };

  return (
    <div className={styles.addClientContainer}>
      <h1 className={styles.addClientHeader}>Add New Client</h1>
      <form className={styles.container} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="ID"
          value={newClient.id}
          onChange={(e) => setNewClient({ ...newClient, id: e.target.value })}
          pattern="^\d{9}$"
          title="ID חייב להכיל בדיוק 9 ספרות"
          required
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Name"
          value={newClient.name}
          onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
          pattern="^[A-Za-zא-ת\s]{2,30}$"
          title="השם צריך להיות בין 2 ל־30 אותיות בלבד"
          required
        />
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          value={newClient.mail}
          onChange={(e) => setNewClient({ ...newClient, mail: e.target.value })}
          required
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          title="יש להזין כתובת מייל תקינה (לדוג' name@mail.com)"
        />

        <input
          className={styles.input}
          type="tel"
          placeholder="Phone"
          value={newClient.phone}
          onChange={(e) =>
            setNewClient({ ...newClient, phone: e.target.value })
          }
          pattern="^0\d{8,9}$"
          title="מספר טלפון ישראלי חייב להתחיל ב-0 ולכלול 9 או 10 ספרות"
          required
        />

        <Button className={"addClientBtn"} type="submit">
          Add Client
        </Button>
      </form>
    </div>
  );
}
