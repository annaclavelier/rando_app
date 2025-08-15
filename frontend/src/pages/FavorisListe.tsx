import { useEffect, useState } from "react";
import { Rando } from "../data/rando";
import TooltipButton from "../components/TooltipButton";
import CardRando from "../components/CardRando";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

function FavorisListe() {
  const [favoris, setFavoris] = useState<Rando[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/favorites`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setFavoris(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="container p-5">Chargement...</div>;

  return (
    <div className="container p-5">
      <div className="h3">Mes favoris</div>
      <hr />

      <div>
        {favoris.length === 0 ? (
          <p>
            Vous n'avez pas encore de favoris.{" "}
            <TooltipButton text_tooltip="Cliquer sur le coeur lorsque vous consulter une randonnée pour la mettre en favori">
              <FontAwesomeIcon icon={faCircleQuestion} />
            </TooltipButton>
          </p>
        ) : (
          <div id="results" className="row gy-2">
            {favoris.map((item) => (
              <div className="col-md-6" key={item.id}>
                <CardRando
                  id={item.id}
                  titre={item.titre}
                  massif={item.massif}
                  difficulte={item.difficulte}
                  duree={item.duree}
                  image={item.image}
                  km={item.km}
                  lien={`/favorites/${item.id}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavorisListe;
