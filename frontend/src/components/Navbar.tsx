import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useAuth } from "../context/AuthContext";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Button,
} from "reactstrap";
import { useState } from "react";

const NavbarComponent = () => {
  const { auth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar expand="lg" className="shadow-sm" style={{ backgroundColor: "#008844" }}>
      <div className="container-fluid">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <NavbarBrand tag={Link} to="/" className="text-light">
            Carnetd'Rando
          </NavbarBrand>

          <div className="d-flex w-100 justify-content-lg-center justify-content-start my-2 my-lg-0" style={{ flex: 1 }}>
            <SearchBar />
          </div>

          <Nav className="ms-auto" navbar>
            <NavItem>
              {auth ? (
                <span className="text-white text-capitalize">
                  {auth.prenom} {auth.nom}
                </span>
              ) : (
                <Button color="success" tag={Link} to="/login">
                  Se connecter
                </Button>
              )}
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;
