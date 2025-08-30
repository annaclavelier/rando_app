import { useEffect, useState } from "react";
import ReturnButton from "../components/ReturnButton";
import { useParams } from "react-router";
import { Rando } from "../data/rando";
import RandoDetails from "../components/RandoDetails";
import { randoService } from "../services/randoService";

function Favori() {
  const { id } = useParams();
  // Randonnée correspondante
  const [rando, setRando] = useState<Rando | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRando() {
      try {
        const rando: Rando = await randoService.getById(id);
        setRando(rando);
      } catch (error) {
        console.error("Erreur lors du chargement de la rando", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchRando();
    }
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (!rando) return <div>Rando non trouvée.</div>;

  return (
    <div className="container pt-4">
      <ReturnButton link={"/favorites"} text="Retour aux favoris" />

      <RandoDetails rando={rando} />
    </div>
  );
}

export default Favori;
