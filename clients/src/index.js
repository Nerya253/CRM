import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Clients from "./Pages/Clients";
import AddClients from "./Pages/AddClients";
import ViewModeChooser from "./components/ViewModeChooser";
import { ViewProvider } from "./contexts/ViewContext"; // Assuming you have a context for view mode
import ViewClient from "./Pages/ViewClient"; // Assuming you have a context for view mode
import { ClientsProvider } from "./contexts/ClientsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ViewProvider>
    <ClientsProvider>
      <BrowserRouter>
        <Header />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/client/:id" element={<ViewClient />} />
          {/* <Route path="/client/:id/edit" element={<EditClient />} /> */}
          <Route path="/Settings" element={<ViewModeChooser />} />
          <Route path="/AddClients" element={<AddClients />} />
        </Routes>
      </BrowserRouter>
    </ClientsProvider>
  </ViewProvider>
);
