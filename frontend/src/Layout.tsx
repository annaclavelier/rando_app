import { Outlet } from "react-router-dom";
import NavbarCustom from "./components/Navbar";
import "./app.css";
import { useAuth } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  const { auth } = useAuth();
  return (
    <>
      <NavbarCustom />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar uniquement si l'utilisateur est connecté */}
          {auth && (
            <div className="col-12 col-md-2 p-0">
              <Sidebar />
            </div>
          )}
          {/* Contenu principal */}
          <div className={`p-0 ${auth ? "col-12 col-md-10" : "col-12"}`}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
