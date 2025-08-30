import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import { useAuth } from "../context/AuthContext";
import { userService } from "../services/userService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    if (auth) {
      navigate("/dashboard");
    }
  });

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { utilisateur } = await userService.login(email, password);
      setAuth(utilisateur);
      navigate("/dashboard");
    } catch (error: any) {
      setErrMsg(error.response?.data || "Erreur de connexion");
    }
  };
  return (
    <div className="container pt-4">
      <div className="h3">Connexion</div>

      <Alert visible={!!errMsg} theme="danger">
        {errMsg}
      </Alert>

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
