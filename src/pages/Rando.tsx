import { useNavigate, useParams } from "react-router-dom";
import { Rando, findRando } from "../data/rando";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const RandoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Trouver l'objet correspondant
  const rando: Rando = findRando(Number(id));

  return (
    <div className="container p-5">
      <div>
        <button
          className="btn ps-0 text-secondary"
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Retour aux résultats de la
          recherche
        </button>
      </div>
      <h1>{rando.titre}</h1>
      <hr />
      <div className="row">
        <div className="col">
          <div>
            <h3>
              {rando.difficulte} - {rando.massif} - {rando.duree}
            </h3>
          </div>
          <div>{rando.description}</div>
        </div>
        <div className="col">Carte</div>
      </div>
      <div>Galerie Photos</div>
    </div>
  );
};

export default RandoPage;
