import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Sidebar() {
  const { auth, setAuth } = useAuth();

  const handleLogout = async () => {
    await axios.post("/api/logout", {}, { withCredentials: true });
    setAuth(null);
  };

  if (!auth) {
    return;
  } else {
    return (
      <div
        id="sidebar"
        className="bg-light-subtle border-end border-secondary-subtle"
      >
        <ul className="nav nav-pills flex-column mb-auto p-4 ">
          <li>
            <Link to="/dashboard" className="nav-link link-secondary">
              Tableau de bord
            </Link>
          </li>
          <hr />
          <li>
            <Link to="/my-randos" className="nav-link link-secondary">
              Randonnées
            </Link>
          </li>
          <li>
            <Link to="/favorites" className="nav-link link-secondary">
              Favoris
            </Link>
          </li>
          <hr />
          <li>
            <Link to="/profile" className="nav-link link-secondary">
              Mon compte
            </Link>
          </li>
          <hr />
          <li>
            <button className="nav-link link-secondary" onClick={handleLogout}>
              Déconnexion
            </button>
            <Link to="/logout"></Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
