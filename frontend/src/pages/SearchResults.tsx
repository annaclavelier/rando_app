import { useSearchParams } from "react-router-dom";
import { Rando } from "../data/rando";
import CardRando from "../components/CardRando";
import ButtonFilter from "../components/ButtonFilter";
import { useEffect, useState } from "react";
import axios from "axios";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  // recherche
  const query = searchParams.get("query")?.toLowerCase() ?? "";

  // Résultats
  const [randos, setRandos] = useState<Rando[]>([]);

  const emptyFilters = {
    difficulty: "",
    duration: "",
    massif: "",
    denivele: "",
  };

  // Filtres provisoires => pas encore appliqués à la recherche
  const [pendingFilters, setPendingFilters] = useState(emptyFilters);
  // Filtres actifs => appliqués à la recherche
  const [activeFilters, setActiveFilters] = useState(emptyFilters);

  const handleUpdate = () => {
    // les filtres en attente passent en actif
    setActiveFilters({ ...pendingFilters });
  };

  // Réinitialiser les filtres à vide
  const handleReinit = () => {
    setPendingFilters(emptyFilters);
    setActiveFilters(emptyFilters);
  };

  // on appelle useEffect que si les filtres effectifs sont modifiés ou la query
  useEffect(() => {
    //  Recherche selon filtres et query
    axios
      .get(
        `/api/randos/search?query=${query}&difficulte=${activeFilters.difficulty}&duration=${activeFilters.duration}&massif=${activeFilters.massif}&denivele=${activeFilters.denivele}`
      )
      .then((response) => {
        setRandos(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des randonnées :", error);
      });
  }, [query, activeFilters]);

  return (
    <div className="container pt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h3>
          {randos.length === 0 && <>Pas de résultat trouvé</>}{" "}
          {randos.length === 1 && <>1 résultat trouvé</>}
          {randos.length > 1 && <>{randos.length} résultats trouvés</>} pour la
          recherche "{query}"
        </h3>

        <ButtonFilter
          onChange={setPendingFilters}
          onUpdate={handleUpdate}
          onReinit={handleReinit}
          filters={pendingFilters}
        />
      </div>

      <hr />
      <div id="results" className="row row-cols-1 row-cols-md-2 g-4">
        {randos.map((item) => (
          <div className="col" key={item.id}>
            <CardRando
              id={item.id}
              titre={item.titre}
              massif={item.massif}
              difficulte={item.difficulte}
              duree={item.duree}
              image={item.image}
              km={item.km}
              lien={`/rando/${item.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
