import { createContext, useContext, useState } from "react";

const ClientsContext = createContext();

function ClientsProvider({ children }) {
  const [clients, setClients] = useState([
    {
      id: 207786047,
      name: "nerya",
      phone: "0522859094",
      mail: "nerya86@mail.com",
    },
    {
      id: 261189068,
      name: "Adva",
      phone: "05911138097",
      mail: "adva78@demo.net",
    },
    {
      id: 153431272,
      name: "Yael",
      phone: "05821405314",
      mail: "yael71@mail.com",
    },
    {
      id: 734517900,
      name: "Itay",
      phone: "05766666188",
      mail: "itay49@demo.net",
    },
    {
      id: 535621769,
      name: "Yair",
      phone: "05262329034",
      mail: "yair65@demo.net",
    },
    {
      id: 892271528,
      name: "Keren",
      phone: "05020023571",
      mail: "keren93@demo.net",
    },
    {
      id: 915713799,
      name: "Hila",
      phone: "05449699489",
      mail: "hila74@mail.com",
    },
    {
      id: 408569016,
      name: "Noa",
      phone: "05821738281",
      mail: "noa77@mail.com",
    },
    {
      id: 537574483,
      name: "Maya",
      phone: "05781334325",
      mail: "maya14@mail.com",
    },
    {
      id: 710093463,
      name: "Avi",
      phone: "05070352569",
      mail: "avi54@mail.com",
    },
    {
      id: 111111111,
      name: "yakov maya",
      phone: "05070352569",
      mail: "yakov54@mail.com",
    },
  ]);

  function addClient({ id, name, phone, mail }) {
    return setClients((prev) => [...prev, { id, name, phone, mail }]);
  }

  function updateClient(updatedClient) {
    setClients((prev) => {
      return prev.map((c) => (c.id === updatedClient.id ? updatedClient : c));
    });
  }

  function deleteClient(id) {
    setClients((prev) => prev.filter((c) => c.id !== id));
  }

  const value = { clients, addClient, updateClient, deleteClient };

  return (
    <ClientsContext.Provider value={value}>{children}</ClientsContext.Provider>
  );
}

function useClients() {
  const context = useContext(ClientsContext);
  if (context === undefined)
    throw new Error("useClients must be used within ClientsProvider");
  return context;
}

export { ClientsProvider, useClients };
