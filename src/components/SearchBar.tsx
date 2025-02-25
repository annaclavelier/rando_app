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
    <form className="d-flex mx-auto" style={{ width: "45%" }} onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Chercher une randonnée..."
        aria-label="Chercher"
        value={searchTerm}
        onChange={handleChange}
      />
      <button className="btn btn-outline-success" type="submit">
        Chercher
      </button>
    </form>
  );
};

export default SearchBar;
