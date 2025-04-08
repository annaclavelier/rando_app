import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DifficultyFilter from "./filters/DifficultyFilter";
import DurationFilter from "./filters/DurationFilter";
import MassifFilter from "./filters/MassifFilter";
import DeniveleFilter from "./filters/DeniveleFilter";

interface Props {
  filters: {
    difficulty: string;
    duration: string;
    massif: string;
    denivele: string;
  };
  onChange: (filters: Props["filters"]) => void;
  onUpdate: () => void;
  onReinit: () => void;
}

const ButtonFilter = ({ filters, onReinit, onUpdate, onChange }: Props) => {
  const badge = document.getElementById("badgeBtnFilter");

  function hideBadge() {
    if (badge) {
      badge.classList.add("visually-hidden");
    }
  }

  function displayBadge() {
    if (
      badge &&
      (filters.difficulty != "" ||
        filters.denivele != "" ||
        filters.duration != "" ||
        filters.massif != "")
    ) {
      badge.classList.remove("visually-hidden");
    } else {
      hideBadge();
    }
  }

  return (
    <>
      <button
        className="btn btn-success btn-lg position-relative"
        data-bs-toggle="modal"
        data-bs-target="#filterModal"
      >
        Filtrer <FontAwesomeIcon icon={faFilter} />
        <span
          className="position-absolute top-0 start-100 translate-middle p-2 bg-primary border border-light rounded-circle visually-hidden"
          id="badgeBtnFilter"
        ></span>
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
              <h1 className="modal-title fs-5">Filtrer les résultats</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <DifficultyFilter
                  value={filters.difficulty}
                  onChange={(val) => onChange({ ...filters, difficulty: val })}
                />
                <DurationFilter
                  value={filters.duration}
                  onChange={(val) => onChange({ ...filters, duration: val })}
                />
                <MassifFilter
                  value={filters.massif}
                  onChange={(val) => onChange({ ...filters, massif: val })}
                />
                <DeniveleFilter
                  value={filters.denivele}
                  onChange={(val) => onChange({ ...filters, denivele: val })}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  onReinit();
                  hideBadge();
                }}
              >
                Réinitialiser
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  onUpdate();
                  displayBadge();
                }}
              >
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
