import { useParams } from "react-router-dom";
import { Rando, findRando } from "../datafixtures/rando";

const RandoPage = () => {
  const { id } = useParams();

  // Trouver l'objet correspondant
  const rando: Rando = findRando(Number(id));

  return (
    <div className="container p-5">
      <h1>{rando.titre}</h1>
      <hr />
      <div className="row">
        <div className="col">
          <div>
           <h3> {rando.difficulte} - {rando.massif}</h3>
          </div>
          <div>Etapes : ...</div>
        </div>
        <div className="col">Carte</div>
      </div>
      <div>Galerie Photos</div>
    </div>
  );
};

export default RandoPage;
