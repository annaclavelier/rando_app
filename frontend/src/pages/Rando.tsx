import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Rando } from "../data/rando";
import RandoDetails from "../components/RandoDetails";
import ReturnButton from "../components/ReturnButton";
import { randoService } from "../services/randoService";

const RandoPage = ({ myRando }: { myRando: boolean }) => {
  const { id } = useParams();
  const [rando, setRando] = useState<Rando | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRando = async () => {
      try {
        const data = await randoService.getById(parseInt(id ?? "-1"));
        setRando(data);
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
    <div className="container pt-4">
      <ReturnButton
        link={myRando ? "/my-randos" : -1}
        text={
          myRando
            ? "Retour à mes randonnées"
            : "Retour aux résultats de la recherche"
        }
      />
      <RandoDetails rando={rando} />
    </div>
  );
};

export default RandoPage;
