import { Link, useNavigate } from "react-router-dom";
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
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { userService } from "../services/userService";

const NavbarComponent = () => {
  const { auth, setAuth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await userService.logout();
    setAuth(null);
  };

  const toggle = () => setIsOpen(!isOpen);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Navbar
      expand="lg"
      className="shadow-sm"
      style={{ backgroundColor: "#008844" }}
    >
      <div className="container-fluid">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <NavbarBrand tag={Link} to="/" className="text-light">
            Carnetd'Rando
          </NavbarBrand>

          <div
            className="d-flex w-100 justify-content-lg-center justify-content-start my-2 my-lg-0"
            style={{ flex: 1 }}
          >
            <SearchBar />
          </div>

          <Nav className="ms-auto" navbar>
            <NavItem style={{ overflow: "visible" }}>
              {auth ? (
                <Dropdown
                  inNavbar={true}
                  isOpen={dropdownOpen}
                  toggle={toggleDropdown}
                  direction={"down"}
                  flip
                >
                  <DropdownToggle caret color="success">
                    <FontAwesomeIcon icon={faCircleUser} />{" "}
                    {auth.pseudo ?? (
                      <span className="text-capitalize">
                        {auth.prenom} {auth.nom}
                      </span>
                    )}
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      Mon compte
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem
                      onClick={() => {
                        navigate("/my-randos");
                      }}
                    >
                      Mes randonnées
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        navigate("/favorites");
                      }}
                    >
                      Mes favoris
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={handleLogout}>
                      Déconnexion
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
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
