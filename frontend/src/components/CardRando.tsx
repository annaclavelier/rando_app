import { Link } from "react-router-dom";
import { formatHeuresDecimal } from "../utils/FormatHours";

interface Props {
  id: number;
  titre: string;
  difficulte: string;
  massif: string;
  image?: string;
  duree: string;
  km: number;
  lien: string;
}

const CardRando = ({
  id,
  titre,
  difficulte,
  massif,
  image = `${import.meta.env.VITE_API_URL}/uploads/ecoutoux.jpg`,
  duree,
  km,
  lien,
}: Props) => {
  return (
    <div className="card mb-3 card-rando flex-row">
      <Link to={lien} className="link-light link-underline-opacity-0">
        <div className="d-flex flex-column flex-md-row h-100">
          <div className="col-md-4 h-100 img-container">
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${image}`}
              className="h-100 w-100 object-fit-cover"
              alt={titre}
            />
          </div>
          <div className="col-md-8 h-100">
            <div className="card-body">
              <h5 className="card-title">{titre}</h5>
              <p className="card-text">
                {difficulte} - {massif} -{" "}
                {formatHeuresDecimal(parseFloat(duree))} - {km} km
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardRando;
