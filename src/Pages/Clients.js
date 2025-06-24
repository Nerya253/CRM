import React, { useState } from "react";
import { Obj } from "../data/MyObj";
import styles from "./Clients.module.css";

export default function Clients() {
  const [searchId, setSearchId] = useState("");

  const filteredClients = Obj.filter((client) =>
    String(client.id).startsWith(searchId.trim())
  );

  return (
    <div className={styles.container}>
      <h1>Search Customer by ID</h1>

      <input
        type="number"
        placeholder="Enter customer ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        className={styles.searchInput}
      />

      {searchId && filteredClients.length > 0 ? (
        <div className={styles.results}>
          {filteredClients.map((client) => (
            <div key={client.id} className={styles.clientCard}>
              <h3>Customer Details</h3>
              {Object.entries(client).map(([key, val]) => (
                <p key={key}>
                  <strong>{key}:</strong> {val}
                </p>
              ))}
            </div>
          ))}
        </div>
      ) : searchId ? (
        <p>No customers found with ID starting with {searchId}</p>
      ) : null}
    </div>
  );
}
