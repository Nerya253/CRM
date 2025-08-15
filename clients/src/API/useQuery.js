import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export async function fetchClients() {
  const res = await fetch(`http://localhost:4371/clients/viewClients`);
  if (!res.ok) throw new Error(`GET ${res.status}`);
  return res.json();
}

export async function fetchClientById(id) {
  const res = await fetch(`http://localhost:4371/clients/${id}`);
  if (!res.ok) throw new Error(`GET ${res.status}`);
  return res.json();
}

export async function createClient(doc) {
  const res = await fetch(`http://localhost:4371/clients/addClient`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(doc),
  });
  if (!res.ok) throw new Error(`POST ${res.status}`);
  return res.json();
}

export async function updateClient({ id, patch }) {
  if (!id) throw new Error("Missing id");
  const res = await fetch(
    `http://localhost:4371/clients/updateClient/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    }
  );
  if (!res.ok) throw new Error(`PUT ${res.status}`);
  return res.json();
}

export async function deleteClient(id) {
  const res = await fetch(`http://localhost:4371/clients/deleteClient/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`DELETE ${res.status}`);
  return null;
}

export function useAllClients() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });
}

export function useClientById(id) {
  return useQuery({
    queryKey: ["client", id],
    queryFn: () => fetchClientById(id),
    enabled: !!id,
  });
}

export function useCreateClient() {
  const uQC = useQueryClient();
  return useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      uQC.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}

export function useUpdateClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateClient,
    onSuccess: (data, vars) => {
      qc.setQueryData(["client", vars.id], data);
      qc.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}

export function useDeleteClient() {
  const uQC = useQueryClient();
  return useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      uQC.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}
