import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import ErrorPage from "./pages/Error.tsx";
import Login from "./pages/Login.tsx";
import SearchResults from "./pages/SearchResults.tsx";
import Layout from "./Layout.tsx";
import Rando from "./pages/Rando.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import AuthenticatedRoute from "./components/AuthenticatedRoute.tsx";
import MesRandos from "./pages/MesRandos.tsx";
import CreerRando from "./pages/CreerRando.tsx";
import EditRando from "./pages/MaRandoEdit.tsx";
import FavorisListe from "./pages/FavorisListe.tsx";
import Favori from "./pages/Favori.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import Profil from "./pages/Profil.tsx";
import ChangePassword from "./pages/ChangePassword.tsx";
import Register from "./pages/Register.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/rando/:id" element={<Rando myRando={false} />} />
            <Route path="/register" element={<Register />} />
            <Route element={<AuthenticatedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/my-randos" element={<MesRandos />} />
              <Route path="/new-rando" element={<CreerRando />} />
              <Route path="/my-rando/:id" element={<Rando myRando={true} />} />
              <Route path="/my-rando/:id/edit" element={<EditRando />} />
              <Route path="/favorites" element={<FavorisListe />} />
              <Route path="/favorites/:id" element={<Favori />} />
              <Route path="/profile" element={<Profil />} />
              <Route path="/change-password" element={<ChangePassword />} />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
