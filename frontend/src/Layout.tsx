import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./app.css";
import { AuthProvider } from "./context/AuthContext";

const Layout = () => {
  return (
      <AuthProvider>
        <Navbar />
        <div className="container-fluid p-0">
          <Outlet />
        </div>
      </AuthProvider>
  );
};

export default Layout;
