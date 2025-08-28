const express = require("express");
const router = express.Router();

const favoriController = require("../controllers/favori");

// Mettre en favori une randonnée pour l'utilisateur actuel
router.post("/:rando_id", favoriController.addFavorite);

// Récupérer la liste des randonnées favorites de l'utilisateur actuel
router.get("/", favoriController.getFavoritesByUser);

// Retirer des favoris une randonnée pour l'utilisateur actuel
router.delete("/:rando_id", favoriController.removeFavorite);

module.exports = router;
