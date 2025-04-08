import { Link } from "react-router-dom";

interface Props {
  id: number;
  titre: string;
  difficulte: string;
  massif: string;
  image?: string;
  duree: string;
  km: number;
}

const CardRando = ({
  id,
  titre,
  difficulte,
  massif,
  image = "/assets/ecoutoux.jpg",
  duree,
  km,
}: Props) => {
  return (
    <div
      className="card mb-3 card-rando h-100"
      style={{ maxWidth: "540px", backgroundColor: "#436D3B", flexDirection:"row" }}
    >
      <Link to={`/rando/${id}`} className="link-light link-underline-opacity-0">
        <div className="row g-0 h-100">
          <div className="col-md-4 h-100">
            <img
              src={image}
              className="h-100 w-100 rounded-start object-fit-cover"
              alt={titre}
            />
          </div>
          <div className="col-md-8 h-100">
            <div className="card-body">
              <h5 className="card-title">{titre}</h5>
              <p className="card-text">
                {difficulte} - {massif} - {duree} - {km} km
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardRando;
