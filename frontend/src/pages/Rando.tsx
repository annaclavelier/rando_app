import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Rando } from "../data/rando";
import RandoDetails from "../components/RandoDetails";
import ReturnButton from "../components/ReturnButton";

const RandoPage = ({ myRando }: { myRando: boolean }) => {
  const { id } = useParams();
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

    if (id) fetchRando();
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (!rando) return <div>Rando non trouvée.</div>;

  return (
    <>
      <div className="container pt-4">
        <ReturnButton
          link={myRando ? "/my-randos" : -1}
          text={
            myRando
              ? "Retour à mes randonnées"
              : "Retour aux résultats de la recherche"
          }
        />
      </div>
      <RandoDetails rando={rando} />
    </>
  );
};

export default RandoPage;
