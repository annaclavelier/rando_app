import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
          <Link className="navbar-brand" to="/">
            Carnetd'Rando
          </Link>
          <form className="d-flex mx-auto" role="search" style={{width:"45%"}}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Chercher une randonnée..."
              aria-label="Chercher"
            />
            <button className="btn btn-outline-success" type="submit">
              Chercher
            </button>
          </form>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="btn btn-success" to="/login">
                Se connecter
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
