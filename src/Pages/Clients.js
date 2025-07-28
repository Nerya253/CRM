import { useState } from "react";
import { Obj } from "../data/MyObj";
import styles from "./Clients.module.css";

export default function Clients() {
  const [searchType, setSearchType] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const filteredClients = Obj.filter((client) => {
    const value = searchValue.trim().toLowerCase();

    switch (searchType) {
      case "id":
        return String(client.id)?.startsWith(value);
      case "name":
        return client.name?.toLowerCase().startsWith(value);
      case "email":
        return client.mail?.toLowerCase().startsWith(value);
      case "phone":
        return client.phone?.startsWith(value);
      default:
        return true;
    }
  });

  const clearSearch = () => {
    setSearchType("");
    setSearchValue("");
  };

  return (
    <div className={styles.container}>
      <h1>Search Customer</h1>

      <div className={styles.searchContainer}>
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className={styles.searchSelect}
        >
          <option value="">Select Search Type</option>
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>

        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={styles.searchInput}
        />

        <div>
          <button onClick={clearSearch} className={styles.clearButton}>
            Clear Search
          </button>
        </div>
      </div>

      {filteredClients.length > 0 ? (
        <div className={styles.results}>
          <p id="count">
            <strong>{filteredClients.length}</strong> customer(s) found.
          </p>
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
      ) : (
        searchValue && <p>No customers found matching your search.</p>
      )}
    </div>
  );
}
