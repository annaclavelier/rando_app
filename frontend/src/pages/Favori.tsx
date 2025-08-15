import { useEffect, useState } from "react";
import ReturnButton from "../components/ReturnButton";
import { useParams } from "react-router";
import { Rando } from "../data/rando";
import axios from "axios";
import RandoDetails from "../components/RandoDetails";

function Favori() {
  const { id } = useParams();
  // Randonnée correspondante
  const [rando, setRando] = useState<Rando | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRando = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/randos/${id}`
        );
        setRando(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement de la rando", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRando();
    }
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (!rando) return <div>Rando non trouvée.</div>;

  return (
    <div className="container p-5">
      <ReturnButton link={"/favorites"} text="Retour aux favoris" />

      <RandoDetails rando={rando} />
    </div>
  );
}

export default Favori;
