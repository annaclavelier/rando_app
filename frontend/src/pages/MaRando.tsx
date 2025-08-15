import { useParams } from "react-router-dom";
import { Rando } from "../data/rando";
import axios from "axios";
import { useEffect, useState } from "react";
import ReturnButton from "../components/ReturnButton";
import RandoDetails from "../components/RandoDetails";

const MaRando = () => {
  const { id } = useParams();
  // Randonnée correspondante
  const [rando, setRando] = useState<Rando | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRando = async () => {
      try {
        const response = await axios.get(
          `http://localhost:${import.meta.env.VITE_PORT_BACK}/api/randos/${id}`
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
      
      <ReturnButton link="/my-randos" text="Retour à mes randonnées" />

     <RandoDetails rando={rando}/>
     </div>
  );
};

export default MaRando;
