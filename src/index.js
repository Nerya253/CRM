import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Clients from "./Pages/Clients";
import AddClients from "./Pages/AddClients";
import ViewModeChooser from "./components/ViewModeChooser";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Header />
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/Settings/:view" element={<ViewModeChooser />} />
      <Route path="/AddClients" element={<AddClients />} />
    </Routes>
  </Router>
);
