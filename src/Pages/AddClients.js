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
    <div className={styles.container}>
      <input
        type="text"
        placeholder="ID"
        value={newClient.id}
        onChange={(e) => setNewClient({ ...newClient, id: e.target.value })}
      />{" "}
      <input
        type="text"
        placeholder="Name"
        value={newClient.name}
        onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newClient.email}
        onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
      />
      <input
        type="tel"
        placeholder="Phone"
        value={newClient.phone}
        onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
      />
      <input
        type="text"
        placeholder="Address"
        value={newClient.address}
        onChange={(e) =>
          setNewClient({ ...newClient, address: e.target.value })
        }
      />
      <button
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
    </div>
  );
}
