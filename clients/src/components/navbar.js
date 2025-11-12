import { NavLink, useNavigate } from 'react-router-dom';
import { useLogout } from '../API/useUsers.js';
import { hasRole } from '../Auth/role.js';
import styles from '../style/navbar.module.css';
import { Button } from './button.js';

export function NavBar({ user }) {
  const navigate = useNavigate();
  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();

  function handleLogout() {
    logoutUser({}, { onSuccess: () => navigate('/', { replace: true }) });
  }

  if (!user) return null;

  const linkClass = ({ isActive }) => `${styles.navlink} ${isActive ? styles.active : ''}`;

  return (
    <nav className={styles.container}>
      <div className={styles.left}>
        <h2 className={styles.brand}>CRM</h2>
        <div className={styles.links}>
          <NavLink className={linkClass} to="/clients">
            Clients
          </NavLink>

          {hasRole(user, 'admin') && (
            <NavLink className={linkClass} to="/register">
              Add User
            </NavLink>
          )}

          {hasRole(user, 'admin') && (
            <NavLink className={linkClass} to="/users">
              Users
            </NavLink>
          )}

          <NavLink className={linkClass} to="/about">
            About
          </NavLink>
        </div>
      </div>

      <div className={styles.right}>
        <span className={styles.hello}>Hello, {user.name ?? 'User'}</span>
        <Button onClick={handleLogout} disabled={isLoggingOut}>
          {isLoggingOut ? 'Logging out…' : 'Logout'}
        </Button>
      </div>
    </nav>
  );
}
