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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/rando/:id" element={<Rando />} />
          <Route element={<AuthenticatedRoute />} >
            <Route path="/dashboard" element={<Dashboard/>}  />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
