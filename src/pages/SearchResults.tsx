import { useSearchParams } from "react-router-dom";
import randos from "../data/rando";
import CardRando from "../components/CardRando";
import ButtonFilter from "../components/ButtonFilter";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() ?? ""; // Gestion de la casse

  // Filtrer les randonnées qui contiennent le texte recherché dans le titre
  const filteredRandos = randos.filter((rando) =>
    rando.titre.toLowerCase().includes(query)
  );

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

        <ButtonFilter onClick={() => console.log("filtré")} />
      </div>

      <hr />
      <div id="results" className="row">
        {filteredRandos.map((item) => (
          <div className="col"key={item.id}>
            <CardRando
              id={item.id}
              titre={item.titre}
              massif={item.massif}
              difficulte={item.difficulte}
              duree={item.duree}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
