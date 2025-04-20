import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { Rando } from "../data/rando";
import TooltipButton from "./TooltipButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

interface Props {
  mode: "create" | "edit";
}

function FormRando({ mode }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<Partial<Rando>>({
    titre: "",
    description: "",
    difficulte: "Facile",
    denivele: undefined,
    altitude_depart: undefined,
    altitude_arrivee: undefined,
    duree: undefined,
    km: undefined,
    massif: "Chartreuse",
    publique: false,
  });
  const [image, setImage] = useState<File | null>(null);

  // Charger les données existantes si mode édition
  useEffect(() => {
    if (mode === "edit" && id) {
      fetch(`http://localhost:8080/api/randos/${id}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setForm(data))
        .catch((err) => console.error("Erreur chargement:", err));
    }
  }, [id, mode]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    if (image) {
      formData.append("image", image);
    }

    const url =
      mode === "edit"
        ? `http://localhost:8080/api/rando/${id}`
        : "http://localhost:8080/api/rando";
    const method = mode === "edit" ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      body: formData,
      credentials: "include",
    });

    if (res.ok) {
      navigate("/my-randos");
    } else {
      alert("Erreur lors de l'enregistrement");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="mt-4"
    >
      <div className="mb-3">
        <label htmlFor="titre" className="form-label fw-semibold">
          Titre
        </label>
        <input
          type="text"
          className="form-control"
          name="titre"
          value={form.titre ?? ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label fw-semibold">
          Description
        </label>
        <textarea
          className="form-control"
          name="description"
          rows={3}
          value={form.description ?? ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label
            htmlFor="Massif de montagne"
            className="form-label fw-semibold"
          >
            Massif
          </label>
          <select
            className="form-select"
            name="massif"
            value={form.massif ?? ""}
            onChange={handleChange}
          >
            <option value="">-- Sélectionner --</option>
            <option value="Chartreuse">Chartreuse</option>
            <option value="Vercors">Vercors</option>
            <option value="Oisans">Oisans</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="difficulté" className="form-label fw-semibold">
            Difficulté
          </label>
          <select
            className="form-select"
            name="difficulte"
            value={form.difficulte ?? ""}
            onChange={handleChange}
          >
            <option value="">-- Sélectionner --</option>
            <option value="Facile">Facile</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Difficile">Difficile</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label
            htmlFor="denivelé en mètres"
            className="form-label fw-semibold"
          >
            Dénivelé (m)
          </label>
          <input
            type="number"
            className="form-control"
            name="denivele"
            value={form.denivele ?? ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label
            htmlFor="altitude de départ"
            className="form-label fw-semibold"
          >
            Altitude départ (m)
          </label>
          <input
            type="number"
            className="form-control"
            name="altitude_depart"
            value={form.altitude_depart ?? ""}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label
            htmlFor="Altitude arrivée en mètres"
            className="form-label fw-semibold"
          >
            Altitude arrivée (m)
          </label>
          <input
            type="number"
            className="form-control"
            name="altitude_arrivee"
            value={form.altitude_arrivee ?? ""}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2 mb-3">
          <label htmlFor="durée" className="form-label fw-semibold">
            Durée (h)
          </label>
          <input
            type="number"
            step="0.1"
            className="form-control"
            name="duree"
            value={form.duree ?? ""}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2 mb-3">
          <label
            htmlFor="Distance en kilomètres"
            className="form-label fw-semibold"
          >
            Distance (km)
          </label>
          <input
            type="number"
            step="0.1"
            className="form-control"
            name="km"
            value={form.km ?? ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center mb-1">
          <span className="me-2 fw-semibold">Visibilité</span>
          <TooltipButton text_tooltip="Si vous cochez cette case, votre randonnée sera publique pour tous les utilisateurs." >   <FontAwesomeIcon icon={faCircleQuestion} /></TooltipButton>
        </div>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="switchVisibilite"
            name="publique"
            checked={form.publique}
            onChange={handleChange}
          />

          <label className="form-check-label" htmlFor="switchVisibilite">
            Publique
          </label>
        </div>
      </div>

      {mode === "edit" && form.image && !image && (
        <div className="mb-3">
          <label htmlFor="Image actuelle" className="form-label fw-semibold">
            Image actuelle
          </label>

          <div>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={() => setImage(null)} // forcer l'affichage du champ fichier
            >
              Changer l'image
            </button>
            <div>
              <img
                src={`/assets/${form.image}`}
                alt="Image actuelle"
                className="img-fluid rounded mb-2"
                style={{ maxHeight: "300px" }}
              />
            </div>
          </div>
        </div>
      )}

      {(!form.image || image) && (
        <div className="mb-4">
          <label htmlFor="Image principale" className="form-label fw-semibold">
            Nouvelle image
          </label>
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>
      )}

      <button className="btn btn-primary" type="submit">
        {mode === "edit" ? "Mettre à jour" : "Enregistrer"}
      </button>
    </form>
  );
}

export default FormRando;
