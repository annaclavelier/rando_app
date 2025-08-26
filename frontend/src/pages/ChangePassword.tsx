import { useState } from "react";
import Alert from "../components/Alert";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ChangePassword = () => {
  const { auth } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg("Les mots de passe doivrent identiques.");
      // set error message
    } else if (password.length < 8) {
      // set error message
      setErrorMsg("Le mots de passe doit contenir au moins 8 caractères.");
    } else {
      // save new password and redirect to my account
      setErrorMsg("");
      axios
        .put(
          "/api/change-password",
          JSON.stringify({
            email: auth?.email,
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
          setErrorMsg("");
          if (response.status == 200) {
            navigate("/profile");
          }
        })
        .catch((error) => {
          console.log(error);
          setErrorMsg(error.response.data);
        });
    }
  };

  return (
    <div className="container pt-4">
      <div className="h3">Changer de mot de passe</div>
      <hr />

      <Alert visible={!!errorMsg} theme="danger">
        {errorMsg}
      </Alert>

      <div>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress2" className="form-label">
              Confirmation du nouveau mot de passe
            </label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Mettre à jour le mot de passe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
