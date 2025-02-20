import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  return (
    <div className="container p-5">
      <div>
        <h3>X résultats pour la recherche "{query}"</h3>
        <hr />
      </div>
      <div id="results"></div>
    </div>
  );
};

export default SearchResults;
