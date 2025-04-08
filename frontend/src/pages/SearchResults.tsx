import { useSearchParams } from "react-router-dom";
import { Rando } from "../data/rando";
import CardRando from "../components/CardRando";
import ButtonFilter from "../components/ButtonFilter";
import { useEffect, useState } from "react";
import axios from "axios";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() ?? ""; // Gestion de la casse
  // Filtrer les randonnées qui contiennent le texte recherché dans le titre

  const [allRandos, setAllRandos] = useState<Rando[]>([]);
  const [filteredRandos, setFilteredRandos] = useState<Rando[]>([]);

  // États pour les filtres
  const [pendingFilters, setPendingFilters] = useState({
    difficulty: "",
    duration: "",
    massif: "",
    denivele: "",
  });

  const [activeFilters, setActiveFilters] = useState({ ...pendingFilters });

  const handleUpdate = () => {
    setActiveFilters({ ...pendingFilters });
    setFilteredRandos(
      allRandos.filter((rando) => {
        return (
          (!activeFilters.difficulty ||
            rando.difficulte === activeFilters.difficulty) &&
          (!activeFilters.duration || rando.duree === activeFilters.duration) &&
          (!activeFilters.massif || rando.massif === activeFilters.massif) &&
          (!activeFilters.denivele ||
            getDeniveleCategory(rando.denivele) === activeFilters.denivele)
        );
      })
    );
  };

  // Réinitialiser les filtres et résultats
  const handleReinit = () => {
    setPendingFilters({
      difficulty: "",
      duration: "",
      massif: "",
      denivele: "",
    });
    setActiveFilters({
      difficulty: "",
      duration: "",
      massif: "",
      denivele: "",
    });
    setFilteredRandos(allRandos);
  };

  // Fonction pour catégoriser le dénivelé
  const getDeniveleCategory = (denivele?: number) => {
    if (denivele === undefined) return "";
    if (denivele < 300) return "moins de 300m";
    if (denivele < 500) return "300 à 500m";
    if (denivele < 800) return "500 à 800m";
    if (denivele < 1000) return "800 à 1000m";
    return "plus 1000m";
  };

  // récupèrer les randonnées
  useEffect(() => {
    axios.get("/api/randos")
      .then((response) => {
        setAllRandos(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des randonnées :", error);
      });
  }, []);

  // on appelle useEffect que si activeFilters est modifié ou la query !
  useEffect(() => {
    setFilteredRandos(
      allRandos.filter((rando) => {
        return (
          rando.titre.toLowerCase().includes(query) &&
          (!activeFilters.difficulty ||
            rando.difficulte === activeFilters.difficulty) &&
          (!activeFilters.duration || rando.duree === activeFilters.duration) &&
          (!activeFilters.massif || rando.massif === activeFilters.massif) &&
          (!activeFilters.denivele ||
            getDeniveleCategory(rando.denivele) === activeFilters.denivele)
        );
      })
    );
  }, [query, activeFilters, allRandos]);

  return (
    <div className="container p-5">
      <div className="d-flex justify-content-between align-items-center">
        <h3>
          {filteredRandos.length === 0 && <>Pas de résultat trouvé</>}{" "}
          {filteredRandos.length === 1 && <>1 résultat trouvé</>}
          {filteredRandos.length > 1 && (
            <>{filteredRandos.length} résultats trouvés</>
          )}{" "}
          pour la recherche "{query}"
        </h3>

        <ButtonFilter
          onChange={setPendingFilters}
          onUpdate={handleUpdate}
          onReinit={handleReinit}
          filters={pendingFilters}
        />
      </div>

      <hr />
      <div id="results" className="row gy-2">
        {filteredRandos.map((item) => (
          <div className="col-md-6" key={item.id}>
            <CardRando
              id={item.id}
              titre={item.titre}
              massif={item.massif}
              difficulte={item.difficulte}
              duree={item.duree}
              image={item.image}
              km={item.km}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
