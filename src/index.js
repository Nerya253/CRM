import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Clients from "./Pages/Clients";
import ViewModeChooser from "./components/ViewModeChooser";
import Header from "./components/Header";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Header />
    <nav>
      <NavBar />
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/Settings/:view" element={<ViewModeChooser />} />
    </Routes>
  </Router>
);
