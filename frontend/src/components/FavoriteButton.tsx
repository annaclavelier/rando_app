import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { favoriteService } from "../services/favoriteService";
import { Rando } from "../data/rando";

const FavoriteButton = ({
  randoId,
  disabled = false,
}: {
  randoId: number;
  disabled: boolean;
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function init() {
      // Initialiser depuis l'API
      const favorites: Rando[] =
        await favoriteService.getCurrentUserFavorites();
      const favoritesId = favorites.map((r: any) => r.id);
      setIsFavorite(favoritesId.includes(randoId));
    }
    init();
  }, [randoId]);

  const toggleFavori = async () => {
    if (isFavorite) {
      await favoriteService.removeFavorite(randoId);
      setIsFavorite(false);
    } else {
      await favoriteService.addFavorite(randoId);
      setIsFavorite(true);
    }
  };

  return (
    <button
      className="btn btn-lg btn-link p-2 border-0"
      onClick={toggleFavori}
      aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      disabled={disabled}
    >
      {isFavorite ? (
        <FontAwesomeIcon color="rgb(196, 30, 58)" icon={solidHeart} size="2x" />
      ) : (
        <FontAwesomeIcon
          color="rgb(196, 30, 58)"
          icon={regularHeart}
          size="2x"
        />
      )}
    </button>
  );
};

export default FavoriteButton;
