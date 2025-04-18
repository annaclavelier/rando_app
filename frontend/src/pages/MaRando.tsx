import { useParams } from "react-router-dom";
import { Rando } from "../data/rando";
import Galerie from "../components/Galerie";
import axios from "axios";
import { useEffect, useState } from "react";
import ReturnButton from "../components/ReturnButton";

const MaRando = () => {
  const { id } = useParams();
  // Randonnée correspondante
  const [rando, setRando] = useState<Rando | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRando = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/randos/${id}`
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

      <h1>{rando.titre}</h1>
      <hr />
      <div className="row">
        <div className="col">
          <div>
            <h3>
              {rando.difficulte} - {rando.massif} - {rando.duree}h
            </h3>
          </div>
          <div>{rando.description}</div>
        </div>
        <div className="col bg-dark-subtle"></div>
      </div>
      <br />
      {rando.galerie && rando.galerie.length > 0 && rando.image && (
        <div>
          <h3>Galerie photos</h3>
          <Galerie images={[rando.image, ...rando.galerie]} />
        </div>
      )}
    </div>
  );
};

export default MaRando;
