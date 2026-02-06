import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
const API_BASE = 'http://crm-nerya.duckdns.org:3000';

// ==============

async function getUsers() {
  const res = await fetch(`${API_BASE}/users/`, {
    credentials: 'include',
  });

  if (!res.ok) {
    const body = await res.json();
    throw new Error(body.error);
  }

  return res.json();
}

export function useUsers() {
  return useQuery({ queryKey: ['users'], queryFn: getUsers, initialData: [] });
}

// ==============

async function getCurrentUser() {
  const res = await fetch(`${API_BASE}/users/currentUser`, {
    credentials: 'include',
  });
  if (!res.ok) {
    const body = await res.json();
    throw new Error(body.error);
  }
  return res.json();
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    refetchInterval: 60 * 1000,
  });
}

// ==============

async function getUser(id) {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    credentials: 'include',
  });

  if (!res.ok) {
    const body = await res.json();
    throw new Error(body.error);
  }

  return res.json();
}

export function useUser(id) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });
}

// ==============

async function getClientsByUserId() {
  const res = await fetch(`${API_BASE}/users/currentUserClients`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    const body = await res.json();
    throw new Error(body.error);
  }

  return res.json();
}

export function useClientsByUserId() {
  return useQuery({
    queryKey: ['clients', 'me'],
    queryFn: getClientsByUserId,
    initialData: [],
  });
}

// ==============

async function addUser(doc) {
  const res = await fetch(`${API_BASE}/users/`, {
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

export function useAddUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
}

// ==============

async function updateUser({ id, patch }) {
  if (!id) throw new Error('Missing id');

  const res = await fetch(`${API_BASE}/users/${id}`, {
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

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data, vars) => {
      qc.setQueryData(['user', vars.id], data);
      qc.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

// ==============

async function deleteUser(id) {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    const body = await res.json();
    throw new Error(body.error);
  }

  return null;
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
}

// ==============

async function loginRequest({ email, password }) {
  const res = await fetch(`${API_BASE}/users/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const body = await res.json();
    throw new Error(body.error);
  }

  return res.json();
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      qc.setQueryData(['currentUser'], data);
    },
  });
}

// ==============

async function logoutRequest() {
  const res = await fetch(`${API_BASE}/users/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    const body = await res.json();
    throw new Error(body.error);
  }

  return res.json();
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      qc.setQueryData(['currentUser'], null);
    },
  });
}
