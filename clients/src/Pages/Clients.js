import { useState } from "react";
import styles from "../Styles/ViewModeChooser.module.css";
import ViewModeChooser from "../components/ViewModeChooser";
import { useView } from "../contexts/ViewContext";
import { FaTable, FaThLarge } from "react-icons/fa";
import { Button } from "../components/Button";
import { useAllClients } from "../API/useQuery";

export default function Clients() {
  const { isPending, error, data: clients } = useAllClients();

  const { isCard, toggleView } = useView();
  const [searchValue, setSearchValue] = useState("");

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const filteredClients = clients.filter((client) => {
    const value = searchValue.trim().toLowerCase();

    return (
      String(client.id).toLowerCase().includes(value) ||
      (client.name && client.name.toLowerCase().includes(value)) ||
      (client.mail && client.mail.toLowerCase().includes(value)) ||
      String(client.phone).toLowerCase().includes(value)
    );
  });

  const clearSearch = () => {
    setSearchValue("");
  };

  return clients.length ? (
    <div className={styles.searchContainer}>
      <div className={styles.searchHeader}>
        <h1 className={styles.clientsHeader}>Search Customer</h1>
        <div className={styles.searchSelectContainer}>
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={styles.searchInput}
          />

          <Button onClick={clearSearch} className={"clearButton"}>
            Clear
          </Button>
        </div>
        <Button onClick={toggleView}>
          {isCard ? (
            <>
              change view
              <FaTable style={{ marginLeft: "6px" }} />
            </>
          ) : (
            <>
              change view
              <FaThLarge style={{ marginLeft: "6px" }} />
            </>
          )}
        </Button>
      </div>

      <div>
        {filteredClients.length > 0 ? (
          <>
            <p id={styles.count}>
              <strong>{filteredClients.length}</strong> customer(s) found.
            </p>
            <ViewModeChooser items={filteredClients} />
          </>
        ) : (
          searchValue && <p>No customers found matching your search.</p>
        )}
      </div>
    </div>
  ) : null;
}
