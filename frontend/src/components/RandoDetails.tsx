import { Rando } from "../data/rando";
import Galerie from "./Galerie";
import FavoriteButton from "./FavoriteButton";
import { useAuth } from "../context/AuthContext";
import TooltipButton from "./TooltipButton";
import { formatHeuresDecimal } from "../utils/FormatHours";

interface Props {
  rando: Rando;
}

const RandoDetails = ({ rando }: Props) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container p-4">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="mb-0">{rando.titre}</h1>
        {isAuthenticated ? (
          <FavoriteButton disabled={false} randoId={rando.id} />
        ) : (
          <TooltipButton text_tooltip="Connectez vous pour ajouter des favoris">
            {" "}
            <FavoriteButton disabled={true} randoId={rando.id} />
          </TooltipButton>
        )}
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <h3>
            {rando.difficulte} - {rando.massif} - {formatHeuresDecimal(parseFloat(rando.duree))}
          </h3>
          {rando.altitude_depart && rando.altitude_arrivee && rando.denivele && (
            <h5>
              Départ : {rando.altitude_depart}m - Arrivée :{" "}
              {rando.altitude_arrivee} m  - Dénivelé positif : {rando.denivele} m
            </h5>
          )}

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
            src={`http://localhost:${import.meta.env.VITE_PORT_BACK}/uploads/${rando.image}`}
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
