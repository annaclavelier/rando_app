import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  onClick: () => void;
}

const ButtonFilter = ({ onClick }: Props) => {
  return (
    <>
      <button
        className="btn btn-success btn-lg"
        onClick={onClick}
        data-bs-toggle="modal"
        data-bs-target="#filterModal"
      >
        Filtrer <FontAwesomeIcon icon={faFilter} />
      </button>

      <div
        className="modal fade"
        id="filterModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">
                Filtrer les résultats
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="difficulty" className="form-label">Difficulté</label>
                  <select  className="form-select" name="difficulty" id="difficulty-select">
                    <option value="" defaultChecked>
                      Toutes
                    </option>
                    <option value="">Facile</option>
                    <option value="">Moyen</option>
                    <option value="">Difficile</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="duration" className="form-label">Durée</label>
                  <select className="form-select" name="duree" id="duree-select">
                    <option value="">moins d'1h</option>
                    <option value="">plus d'1h</option>
                    <option value="">plus de 2h</option>
                    <option value="">plus de 3h</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="massif" className="form-label">Massif</label>
                  <select  className="form-select" name="massif" id="massif-select">
                    <option value="">Chartreuse</option>
                    <option value="">Vercors</option>
                    <option value="">Oisan</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="denivele" className="form-label">Dénivelé +</label>
                  <select  className="form-select" name="denivele" id="denivele-select">
                    <option value="">0 m</option>
                    <option value="">100 m</option>
                    <option value="">500 m</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Réinitialiser
              </button>
              <button type="button" className="btn btn-primary">
                Mettre à jour les filtres
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ButtonFilter;
