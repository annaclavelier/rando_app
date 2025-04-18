import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { auth } = useAuth();

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{ backgroundColor: "#008844" }}
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link className="navbar-brand text-light" to="/">
            Carnetd'Rando
          </Link>
          <SearchBar />
          <ul className="navbar-nav">
            <li className="nav-item">
              {auth ? (
                <span className="text-white text-capitalize">
                  {auth.prenom} {auth.nom}
                </span>
              ) : (
                <Link className="btn btn-success" to="/login">
                  Se connecter
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
