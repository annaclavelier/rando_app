import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";;

const FavoriteButton = ({ randoId }: { randoId: number }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Initialiser depuis l'API
    axios.get("/api/favorites", { withCredentials: true }).then((res) => {
      const favoris = res.data.map((r: any) => r.id); 
      setIsFavorite(favoris.includes(randoId));
    });
  }, [randoId]);

  const toggleFavori = async () => {
    if (isFavorite) {
      await axios.delete(`/api/favorites/${randoId}`, {
        withCredentials: true,
      });
      setIsFavorite(false);
    } else {
      await axios.post(`/api/favorite/${randoId}`, {}, {
        withCredentials: true,
      });
      setIsFavorite(true);
    }
  };

  return (
    <button
      className="btn btn-lg btn-link p-2 border-0"
      onClick={toggleFavori}
      aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      {isFavorite ? (
        <FontAwesomeIcon color="rgb(196, 30, 58)" icon={solidHeart} size="2x"/>
      ) : (
        <FontAwesomeIcon  color="rgb(196, 30, 58)" icon={regularHeart}  size="2x"/>

      )}
    </button>
  );
};

export default FavoriteButton;
