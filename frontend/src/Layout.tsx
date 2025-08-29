import { Outlet } from "react-router-dom";
import NavbarCustom from "./components/Navbar";
import "./app.css";

const Layout = () => {
  return (
    <>
      <NavbarCustom />
      <div className="container-fluid p-0">
        {/* Contenu principal */}
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
