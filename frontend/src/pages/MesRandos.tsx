import { useEffect, useState } from "react";
import { Rando } from "../data/rando";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

function MesRandos() {
  const [randos, setRandos] = useState<Rando[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/mes-randos", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setRandos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-5">Chargement...</div>;
  return (
    <div className="container p-5">
      <div className="h3">Mes randonnées</div>
      <button
        className="btn btn-primary"
        onClick={() => {
          navigate("/new-rando");
        }}
      >
        <FontAwesomeIcon icon={faPlus} /> Nouvelle randonnée
      </button>

      {randos.length === 0 ? (
        <p>Vous n'avez pas encore créé de randonnées.</p>
      ) : (
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Massif</th>
              <th>Durée</th>
              <th>Difficulté</th>
              <th>Dénivelé</th>
            </tr>
          </thead>
          <tbody>
            {randos.map((rando) => (
              <tr key={rando.id}>
                <td>{rando.titre}</td>
                <td>{rando.massif}</td>
                <td>{rando.duree}</td>
                <td>{rando.difficulte}</td>
                <td>{rando.denivele} m</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MesRandos;
