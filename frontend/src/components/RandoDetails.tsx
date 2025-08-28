import { Rando } from "../data/rando";
import Galerie from "./Galerie";
import FavoriteButton from "./FavoriteButton";
import { useAuth } from "../context/AuthContext";
import TooltipButton from "./TooltipButton";
import { formatHeuresDecimal } from "../utils/FormatHours";
import MapWithGeoJson from "./MapWithGeoJson";

interface Props {
  rando: Rando;
}

const RandoDetails = ({ rando }: Props) => {
  const { isAuthenticated } = useAuth();

  return (
    <>
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
          <div className="row">
            <div className="col-xs-12 col-md-4">
              {" "}
              <ul className="list-unstyled">
                <li>
                  <span className="fw-semibold">Massif : </span>
                  {rando.massif}
                </li>
                <li>
                  <span className="fw-semibold">
                    Distance {rando.aller_retour ? "(A/R)" : ""} :{" "}
                  </span>
                  {rando.km}km
                </li>
                <li>
                  <span className="fw-semibold">Altitude départ : </span>
                  {rando.altitude_depart}m
                </li>
                <li>
                  <span className="fw-semibold">Altitude max : </span>
                  {rando.altitude_max}m
                </li>
              </ul>
            </div>
            <div className="col-xs-12 col-md-4">
              {" "}
              <ul className="list-unstyled">
                <li>
                  <span className="fw-semibold">Niveau : </span>
                  {rando.difficulte}
                </li>
                <li>
                  <span className="fw-semibold">
                    Dénivelé + {rando.aller_retour ? "(aller)" : ""} :{" "}
                  </span>
                  {rando.denivele}m
                </li>
                <li>
                  <span className="fw-semibold">Altitude arrivée : </span>
                  {rando.altitude_arrivee}m
                </li>
                <li>
                  <span className="fw-semibold">Altitude min : </span>
                  {rando.altitude_min}m
                </li>
              </ul>
            </div>

            <div className="col-xs-12 col-md-4">
              {" "}
              <ul className="list-unstyled">
                <li>
                  <span className="fw-semibold">Durée : </span>{" "}
                  {formatHeuresDecimal(parseFloat(rando.duree))}
                </li>

                <li>
                  <span className="fw-semibold">
                    Dénivelé - {rando.aller_retour ? "(aller)" : ""} :{" "}
                  </span>
                  {rando.denivele_negatif}m
                </li>

                <li>
                  <span className="fw-semibold">Aller-retour : </span>
                  {rando.aller_retour ? "Oui" : "Non"}
                </li>
              </ul>
            </div>
          </div>

          <p>{rando.description}</p>
        </div>

        {rando.trace ? (
          <div className="col" style={{ height: "500px" }}>
            <div className="leaflet">
              <MapWithGeoJson geojsonFile={rando.trace} />
            </div>
          </div>
        ) : (
          <div className="col bg-dark-subtle" style={{ height: "500px" }}></div>
        )}
      </div>
      <br />

      {rando.galerie && rando.galerie.length > 0 && rando.image && (
        <div>
          <h3>Photos</h3>
          <Galerie images={[rando.image, ...rando.galerie]} />
        </div>
      )}

      {(!rando.galerie || rando.galerie.length === 0) && rando.image && (
        <div>
          <h3>Photos</h3>
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/${rando.image}`}
            alt="Rando"
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: "200px", objectFit: "cover" }}
          />
        </div>
      )}
      <br />
    </>
  );
};

export default RandoDetails;
