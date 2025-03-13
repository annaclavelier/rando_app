import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
      className="d-flex mx-auto position-relative search-bar"
      style={{ width: "45%" }}
      onSubmit={handleSubmit}
      role="search"
  
    >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon position-absolute" />
        <input
          className="form-control search-input rounded-5 border-0"
          type="search"
          placeholder="Chercher une randonnée..."
          aria-label="Chercher"
          value={searchTerm}
          onChange={handleChange}
        />
    </form>
  
  );
};

export default SearchBar;
