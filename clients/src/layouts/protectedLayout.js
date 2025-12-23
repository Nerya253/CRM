import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '../API/useUsers.js';
import { hasRole } from '../Auth/role.js';
import { NavBar } from '../components/navbar.js';

export function ProtectedLayout({ roles }) {
  const { data, isPending, error } = useCurrentUser();

  if (isPending) return <div>Loading…</div>;

  if (error?.status === 401) {
    return <Navigate to="/" replace />;
  }

  const user = data?.user;
  if (!user) return <Navigate to="/" replace />;

  if (!hasRole(user, roles)) {
    return <div>Something went wrong, try again.</div>;
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
