import React, { useState } from "react";
import styles from "../Styles/AddClients.module.css";
import { Button } from "../components/Button";
import { useClients } from "../contexts/ClientsFetchContext";

export default function AddClients() {
  const { clients, addClientFetch } = useClients();

  const [newClient, setNewClient] = useState({
    id: "",
    name: "",
    phone: "",
    mail: "",
  });

  const handleSubmit = async (e) => {
    if (
      !window.confirm(
        `The ID right? It cannot be changed later. ${newClient.id}`
      )
    )
      return;

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
    if (newClient.id.length !== 9) {
      alert("ID must be exactly 9 characters long.");
      return;
    }

    if (clients.some((c) => c.id === newClient.id)) {
      alert("A customer with this ID already exists in the system!");
      return;
    }

    try {
      await addClientFetch({
        id: newClient.id,
        name: newClient.name,
        phone: newClient.phone,
        mail: newClient.mail,
      });
      setNewClient({ id: "", name: "", phone: "", mail: "" });
    } catch (error) {
      console.error("Failed to add client:", error);
    }
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
          onChange={(e) =>
            setNewClient({ ...newClient, id: String(e.target.value) })
          }
          pattern="^\d{9}$"
          title="ID must contain exactly 9 digits"
          required
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Name"
          value={newClient.name}
          onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
          pattern="^[A-Za-zא-ת\s]{2,30}$"
          title="The name should be between 2 and 30 letters only"
          required
        />
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          value={newClient.mail}
          onChange={(e) => setNewClient({ ...newClient, mail: e.target.value })}
          title="You must enter a valid email address (e.g. name@mail.com)"
          required
        />

        <input
          className={styles.input}
          type="tel"
          placeholder="Phone"
          value={newClient.phone}
          onChange={(e) =>
            setNewClient({ ...newClient, phone: String(e.target.value) })
          }
          pattern="^0\d{8,9}$"
          title="An Israeli phone number must start with 0 and include 9 or 10 digits"
          required
        />
        <Button className={"addClientBtn"} type="submit">
          Add Client
        </Button>
      </form>
    </div>
  );
}
