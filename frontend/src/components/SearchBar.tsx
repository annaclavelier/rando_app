import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { randoService } from "../services/randoService";
import { Rando } from "../data/rando";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<
    { id: number; titre: string }[]
  >([]);
  const [displaySuggestions, setDisplaySuggestions] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const randos: Rando[] = await randoService.searchMin(searchTerm);
        setSuggestions(randos);
      } catch (error) {
        console.log(error);
      }
    }
    if (searchTerm !== "" && searchTerm.length >= 3) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form
      className="d-flex position-relative search-bar"
      onSubmit={handleSubmit}
      role="search"
    >
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="search-icon position-absolute"
      />
      <input
        className="form-control search-input rounded-5 border-0"
        type="search"
        placeholder="Chercher une randonnée..."
        aria-label="Chercher"
        value={searchTerm}
        onChange={handleChange}
        onBlur={() => {
          setDisplaySuggestions(false);
        }}
        onFocus={() => {
          setDisplaySuggestions(true);
        }}
      />

      {displaySuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((s) => (
            <li
              key={s.id}
              onMouseDown={() => {
                navigate(`/rando/${s.id}`);
              }}
            >
              {s.titre}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;
