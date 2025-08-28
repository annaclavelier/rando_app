const favoriService = require("../services/favori");

async function getFavoritesByUser(req, res) {
  if (!req.session.user) {
    return res.status(401).json({ message: "Non connecté" });
  }

  const userEmail = req.session.user.email;

  try {
    const randos = await favoriService.getFavoritesRandosByUser(userEmail);
    res.status(200).json(randos);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des favoris");
  }
}

async function removeFavorite(req, res) {
  if (!req.session.user) {
    return res.status(401).json({ message: "Non connecté" });
  }

  const userEmail = req.session.user.email;
  const randoId = parseInt(req.params.rando_id);

  try {
    await favoriService.removeFavorite(randoId, userEmail);
    res.status(200).json({ message: "Randonnée retirée des favoris" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la suppresion du favori");
  }
}

async function addFavorite(req, res) {
  if (!req.session.user) {
    return res.status(401).json({ message: "Non connecté" });
  }

  const userEmail = req.session.user.email;
  const randoId = parseInt(req.params.rando_id);

  try {
    await favoriService.addFavorite(randoId, userEmail);
    res.status(200).json({ message: "Randonnée ajoutée aux favoris" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de l'ajout du favori");
  }
}

module.exports = {
  getFavoritesByUser,
  removeFavorite,
  addFavorite
};
