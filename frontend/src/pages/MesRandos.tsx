import { useEffect, useState } from "react";
import { Rando } from "../data/rando";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import axios from "axios";
import { formatHeuresDecimal } from "../utils/FormatHours";

function MesRandos() {
  const [randos, setRandos] = useState<Rando[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const deleteRando = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/rando/${id}`);
    } catch (error) {
      console.error("Erreur lors de la suppression : ", error);
    }
  };

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

  if (loading) return <div className="container p-5">Chargement...</div>;
  return (
    <div className="container p-5">
      <div className="h3">Mes randonnées</div>
      <hr />
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
              <th>Visibilité</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {randos.map((rando, index) => (
              <tr key={rando.id}>
                <td>{rando.titre}</td>
                <td>{rando.massif}</td>
                <td>{rando.duree && (<>{formatHeuresDecimal(parseFloat(rando.duree))}</>)}</td>
                <td>{rando.difficulte}</td>
                <td>{rando.denivele && `${rando.denivele}m`}</td>
                <td>{rando.publique ? "Publique" : "Privée"}</td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn btn-outline-primary"
                      title="Voir"
                      onClick={() => navigate(`/my-rando/${rando.id}`)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      title="Modifier"
                      onClick={() => navigate(`/my-rando/${rando.id}/edit`)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      title="Supprimer"
                      onClick={() => {
                        let confirmation = confirm(
                          "Voulez vous vraiment supprimer cette randonnée ?"
                        );
                        if (confirmation) {
                          deleteRando(rando.id).then(() => {
                            setRandos((prevRandos) =>
                              prevRandos.filter((r) => r.id !== rando.id)
                            );
                          });
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MesRandos;
