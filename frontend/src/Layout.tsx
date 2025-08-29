import { Outlet } from "react-router-dom";
import NavbarCustom from "./components/Navbar";
import "./app.css";

const Layout = () => {
  return (
    <>
      <NavbarCustom />
      <div className="container-fluid">
          {/* Contenu principal */}
          <div className="p-0">
            <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
