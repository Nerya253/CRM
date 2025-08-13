// export async function getAllClientsFetch() {
//   try {
//     const res = await fetch("http://localhost:4371/clients/viewClients", {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });

//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     return res.json();
//   } catch (error) {
//     console.error("Error fetching clients:", error);
//     throw error;
//   }
// }

// export async function addClientFetch(client) {
//   const res = await fetch("http://localhost:4371/clients/addClient", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(client),
//   });
//   if (!res.ok) throw new Error(`POST ${res.status}`);
//   return res.json();
// }

// export async function getClientByIdFetch(id) {
//   try {
//     const res = await fetch(`http://localhost:4371/clients/${id}`, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });

//     if (!res.ok) throw new Error(`GET ${res.status}`);

//     return await res.json();
//   } catch (error) {
//     console.error(`Error fetching client ${id}:`, error);
//     throw error;
//   }
// }

// export async function updateClientFetch(id, payload) {
//   const res = await fetch(`http://localhost:4371/clients/updateClient/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   if (res.status === 204) return null;

//   if (!res.ok) throw new Error(`PUT ${res.status}`);
//   return res.json();
// }

// export async function deleteClientFetch(id) {
//   const res = await fetch(`http://localhost:4371/clients/deleteClient/${id}`, {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//   });

//   if (!res.ok) throw new Error(`DELETE ${res.status}`);

//   return res.json();
// }
