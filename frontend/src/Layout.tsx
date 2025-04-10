import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import './app.css'

const Layout = () => {

  return (
    <>
      <Navbar />
      <div className="container-fluid p-0">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
