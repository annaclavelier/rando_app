import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        "/api/login",
        JSON.stringify({
          email: email,
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
        if (response.status == 200) {
          navigate("/");
          console.log("connecté");
        }
      })
      .catch((error) => {
        setErrMsg(error.response.data);
      });
  };
  return (
    <div className="container p-5">
      <div className="h3">Connexion</div>

      <Alert children={errMsg} visible={!!errMsg} theme="danger" />

      <form className="mb-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="InputEmail" className="form-label">
            Adresse mail
          </label>
          <input
            type="email"
            className="form-control"
            id="InputEmail"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputPassword" className="form-label">
            Mot de passe
          </label>
          <input
            type="password"
            className="form-control"
            id="InputPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Se connecter
        </button>
      </form>

      <div>
        Pas de compte ? <Link to="/register">Créez votre compte</Link>
      </div>
    </div>
  );
};

export default Login;
