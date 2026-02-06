import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
const API_BASE = 'http://crm-nerya.duckdns.org:3000';
// ==============

async function getClient(id) {
  const res = await fetch(`${API_BASE}/clients/${id}`, { credentials: 'include' });
  if (!res.ok) throw new Error(`GET ${res.status}`);
  return res.json();
}

export function useClient(id) {
  return useQuery({
    queryKey: ['client', id],
    queryFn: () => getClient(id),
    enabled: !!id,
    retry: false,
  });
}

// ==============

async function addClient(doc) {
  const res = await fetch(`${API_BASE}/clients/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(doc),
    credentials: 'include',
  });

  if (!res.ok) {
    const body = await res.json();
    throw new Error(body.error);
  }

  return res.json();
}

export function useAddClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addClient,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['clients'] }),
  });
}

// ==============

async function updateClient({ id, patch }) {
  const res = await fetch(`${API_BASE}/clients/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
    credentials: 'include',
  });
  if (!res.ok) {
    const body = await res.json();
    throw new Error(body.error);
  }

  return res.json();
}

export function useUpdateClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateClient,
    onSuccess: (data, vars) => {
      qc.setQueryData(['client', vars.id], data);
      qc.invalidateQueries({ queryKey: ['clients'] });
    },
  });
}

// ==============

async function deleteClient(id) {
  const res = await fetch(`${API_BASE}/clients/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error(`DELETE ${res.status}`);
  return null;
}

export function useDeleteClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteClient,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['clients'] }),
  });
}
