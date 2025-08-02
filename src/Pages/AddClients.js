import React, { useState } from "react";
import { Obj } from "../data/MyObj";
import styles from "./AddClients.module.css";

export default function AddClients() {
  const [newClient, setNewClient] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  return (
    <form className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder="ID"
        value={newClient.id}
        onChange={(e) => setNewClient({ ...newClient, id: e.target.value })}
        required
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Name"
        value={newClient.name}
        onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
        required
      />
      <input
        className={styles.input}
        type="email"
        placeholder="Email"
        value={newClient.email}
        onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
        required
      />
      <input
        className={styles.input}
        type="tel"
        placeholder="Phone"
        value={newClient.phone}
        onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
        required
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Address"
        value={newClient.address}
        onChange={(e) =>
          setNewClient({ ...newClient, address: e.target.value })
        }
        required
      />
      <button
        className={styles.btn}
        onClick={() => {
          Obj.push(newClient);
          setNewClient({
            id: "",
            name: "",
            email: "",
            phone: "",
            address: "",
          });
        }}
      >
        Add Client
      </button>
    </form>
  );
}
