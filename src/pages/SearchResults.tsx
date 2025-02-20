import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  return (
    <>
      <div className="container-fluid">
        <Navbar />
      </div>
      <div className="container p-5">
        <div><h3>X résultats pour "{query}"</h3>
        <hr /></div>
        <div id="results"></div>
      </div>
    </>
  );
};

export default SearchResults;
