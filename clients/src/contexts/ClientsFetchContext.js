import { createContext, useContext, useEffect, useState } from "react";

const ClientContext = createContext();

function ClientProvider({ children }) {
  const [clients, setClients] = useState([]);
  const [clientsError, setClientsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await getAllClientsFetch();
    })();
  }, []);

  async function getAllClientsFetch() {
    try {
      setIsLoading(true);

      const res = await fetch("http://localhost:4371/clients/viewClients", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setClients(data);
      return data;
    } catch (error) {
      console.error("Error fetching clients:", error);
      setClientsError(`Fail to get clients, ${error}`);
      setClients([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  }

  async function getClientByIdFetch(id) {
    try {
      const res = await fetch(`http://localhost:4371/clients/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`GET ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error(`Error fetching client ${id}:`, error);
      throw error;
    }
  }

  async function addClientFetch(client) {
    const res = await fetch("http://localhost:4371/clients/addClient", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client),
    });
    if (!res.ok) throw new Error(`POST ${res.status}`);

    const data = await res.json();

    setClients((prev) => [...prev, data]);
    return data;
  }

  async function updateClientFetch(id, payload) {
    const res = await fetch(
      `http://localhost:4371/clients/updateClient/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) throw new Error(`PUT ${res.status}`);

    const updated = { id, ...payload };

    setClients((prev) =>
      prev.map((c) => (String(c.id) === String(id) ? updated : c))
    );
    return updated;
  }

  async function deleteClientFetch(id) {
    const res = await fetch(
      `http://localhost:4371/clients/deleteClient/${id}`,
      { method: "DELETE" }
    );

    if (!res.ok) throw new Error(`DELETE ${res.status}`);

    setClients((prev) => prev.filter((c) => String(c.id) !== String(id)));
    return null;
  }

  return (
    <ClientContext.Provider
      value={{
        clients,
        isLoading,
        clientsError,
        addClientFetch,
        deleteClientFetch,
        updateClientFetch,
        getAllClientsFetch,
        getClientByIdFetch,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

function useClients() {
  const context = useContext(ClientContext);
  if (context === undefined)
    throw new Error("ClientContext was used outside of the provider");
  return context;
}

export { ClientProvider, useClients };
