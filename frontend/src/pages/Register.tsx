import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Alert from "../components/Alert";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [pseudoAlreadyUsed, setPseudoAlreadyUsed] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (pseudo !== "" && pseudo.length >= 1) {
      // check if this pseudo already exists
      axios.get("/api/users", { withCredentials: true }).then((res) => {
        const alreadyUsed =
          res.data.find((u: any) => u.pseudo === pseudo) != undefined;
        setPseudoAlreadyUsed(alreadyUsed);
      });
    }
  }, [pseudo]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pseudoAlreadyUsed) {
      setErrMsg(
        "Veuillez renseigner un pseudo non utilisé ou ne pas en renseigner."
      );
    } else if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      setErrMsg(
        "Veuillez renseigner les champs obligatoires marqués par un astérisque."
      );
    } else if (password.length < 8) {
      setErrMsg("Le mot de passe doit contenir au moins 8 caractères.");
    } else {
      setErrMsg("");
      axios
        .post(
          "/api/register",
          JSON.stringify({
            email: email,
            prenom: firstName,
            nom: lastName,
            pseudo: pseudo,
            mot_passe: password,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              withCredentials: true,
            },
          }
        )
        .then((response) => {
          console.log(JSON.stringify(response?.data));
          setErrMsg("");
          if (response.status == 201) {
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log(error);
          setErrMsg(error.response.data);
        });
    }
  };

  return (
    <div className="container p-5">
      <div className="h3">Créer votre compte</div>

      <Alert visible={!!errMsg} theme="danger">
        {errMsg}
      </Alert>

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="firstNale" className="form-label">
            Prénom*
          </label>
          <input
            type="text"
            className="form-control"
            value={firstName}
            required
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Nom*
          </label>
          <input
            type="text"
            className="form-control"
            value={lastName}
            required
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>

        <div className="col-12">
          <label htmlFor="email" className="form-label">
            Adresse e-mail*
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
          <label htmlFor="text" className={"form-label "}>
            Pseudo
          </label>
          <input
            type="text"
            className={
              "form-control " +
              (pseudo && (pseudoAlreadyUsed ? "is-invalid" : "is-valid"))
            }
            value={pseudo}
            onChange={(e) => {
              setPseudo(e.target.value);
            }}
          />
         {pseudo && pseudoAlreadyUsed && (<div className="invalid-feedback">Le pseudo "{pseudo}" est déjà utilisé.</div>)} 
        </div>
        <div className="col-12">
          <label htmlFor="password" className="form-label">
            Mot de passe*
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
