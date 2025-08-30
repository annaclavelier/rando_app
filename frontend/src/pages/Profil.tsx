import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import { userService } from "../services/userService";
import { User } from "../data/user";

function Profil() {
  const { auth, setAuth } = useAuth();
  const [email, setEmail] = useState(auth?.email);
  const [prenom, setPrenom] = useState(auth?.prenom);
  const [nom, setNom] = useState(auth?.nom);
  const [pseudo, setPseudo] = useState(auth?.pseudo);
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updatedUser: User = await userService.updateUser({
        email: email,
        prenom: prenom,
        nom: nom,
        pseudo: pseudo,
        email_origin: auth?.email,
      });

      if (updatedUser) setAuth(updatedUser);
    } catch (error) {
      setErrMsg(error);
    }
  };

  return (
    <div className="container pt-4">
      <div className="h3">Mon compte</div>
      <hr />

      <Alert visible={!!errMsg} theme="danger">
        {errMsg}
      </Alert>

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="inputFirstName" className="form-label">
            Prénom
          </label>
          <input
            type="text"
            className="form-control text-capitalize"
            value={prenom}
            required
            onChange={(e) => {
              setPrenom(e.target.value);
            }}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputLastName" className="form-label ">
            Nom
          </label>
          <input
            type="text"
            className="form-control text-capitalize"
            value={nom}
            required
            onChange={(e) => {
              setNom(e.target.value);
            }}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail" className="form-label">
            Addresse mail
          </label>
          <input
            type="email"
            className="form-control"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputPseudo" className="form-label">
            Pseudo
          </label>
          <input
            type="text"
            className="form-control"
            value={pseudo}
            onChange={(e) => {
              setPseudo(e.target.value);
            }}
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary me-3">
            Enregistrer les modifications
          </button>

          <Link to={"/change-password"} className="btn btn-secondary">
            Changer de mot de passe
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Profil;
