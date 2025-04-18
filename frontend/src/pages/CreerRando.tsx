import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreerRando() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    difficulte: "",
    denivele: "",
    altitude_depart: "",
    altitude_arrivee: "",
    duree: "",
    km: "",
    massif: "",
    image: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    for (const key in formData) {
      const value = (formData as any)[key];
      if (value) data.append(key, value);
    }

    try {
      await axios.post("http://localhost:8080/api/rando", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Randonnée créée !");
      navigate("/my-randos");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création");
    }
  };

  return (
    <div className="container p-5">
      <h2>Créer une randonnée</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <input
          name="titre"
          placeholder="Titre"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />

        <input
          name="difficulte"
          placeholder="Difficulté"
          onChange={handleChange}
        />
        <input
          name="denivele"
          type="number"
          placeholder="Dénivelé"
          onChange={handleChange}
        />
        <input
          name="altitude_depart"
          type="number"
          placeholder="Altitude départ"
          onChange={handleChange}
        />
        <input
          name="altitude_arrivee"
          type="number"
          placeholder="Altitude arrivée"
          onChange={handleChange}
        />
        <input
          name="duree"
          type="number"
          placeholder="Durée (h)"
          onChange={handleChange}
        />
        <input
          name="km"
          type="number"
          placeholder="Distance (km)"
          onChange={handleChange}
        />
        <input name="massif" placeholder="Massif" onChange={handleChange} />

        <label>
          Image principale :
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>

        <button type="submit" className="btn btn-primary">
          Créer
        </button>
      </form>
    </div>
  );
}

export default CreerRando;
