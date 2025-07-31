import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="hamburger" onClick={() => setMenuOpen((prev) => !prev)}>
        ☰
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/About"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Clients"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Clients
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/AddClients"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Add Client
          </NavLink>
        </li>
        <li>
          <span
            className="settings-toggle"
            onClick={() => setSettingsOpen((prev) => !prev)}
          >
            Settings ▾
          </span>
          {settingsOpen && (
            <ul className="dropdown">
              <li>
                <NavLink
                  to="/Settings/table"
                  onClick={() => {
                    setMenuOpen(false);
                    setSettingsOpen(false);
                  }}
                  className={({ isActive }) => (isActive ? "active" : "")}
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
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Grid
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}
