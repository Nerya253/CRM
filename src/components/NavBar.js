import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div
        className={styles.hamburger}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        ☰
      </div>

      <ul className={`${styles["nav-links"]} ${menuOpen ? styles.active : ""}`}>
        <li>
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/About"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Clients"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Clients
          </NavLink>
        </li>

        <li>
          <span
            className={styles.settingsToggle}
            onClick={() => setSettingsOpen((prev) => !prev)}
          >
            Settings ▾
          </span>
          {settingsOpen ? (
            <ul className={styles.dropdown}>
              <li>
                <NavLink
                  to="/Settings/table"
                  onClick={() => {
                    setMenuOpen(false);
                    setSettingsOpen(false);
                  }}
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Table
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Settings/grid"
                  onClick={() => {
                    setMenuOpen(false);
                    setSettingsOpen(false);
                  }}
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Grid
                </NavLink>
              </li>
            </ul>
          ) : null}
        </li>
      </ul>
    </nav>
  );
}
