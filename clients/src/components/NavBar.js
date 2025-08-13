import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../Styles/NavBar.module.css";
import { FaHome, FaUsers, FaInfoCircle, FaUserPlus } from "react-icons/fa";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
            <FaHome style={{ marginRight: "6px" }} /> Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/About"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <FaInfoCircle style={{ marginRight: "6px" }} /> About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Clients"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <FaUsers style={{ marginRight: "6px" }} /> Clients
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/AddClients"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <FaUserPlus style={{ marginRight: "6px" }} /> Add Client
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
