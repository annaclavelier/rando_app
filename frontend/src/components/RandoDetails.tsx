import { Rando } from "../data/rando";
import Galerie from "./Galerie";
import FavoriteButton from "./FavoriteButton";
import { useAuth } from "../context/AuthContext";

interface Props {
  rando: Rando;
}

const RandoDetails = ({ rando }: Props) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container p-4">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="mb-0">{rando.titre}</h1>
        {isAuthenticated && <FavoriteButton randoId={rando.id} />}
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <h3>
            {rando.difficulte} - {rando.massif} - {rando.duree}h
          </h3>
          <p>{rando.description}</p>
        </div>
        <div className="col bg-dark-subtle"></div>
      </div>
      <br />

      {rando.galerie && rando.galerie.length > 0 && rando.image && (
        <div>
          <h3>Galerie photos</h3>
          <Galerie images={[rando.image, ...rando.galerie]} />
        </div>
      )}

      {(!rando.galerie || rando.galerie.length === 0) && rando.image && (
        <div>
          <h3>Galerie photos</h3>
          <img
            src={`/assets/${rando.image}`}
            alt="Rando"
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: "200px", objectFit: "cover" }}
          />
        </div>
      )}
    </div>
  );
};

export default RandoDetails;
