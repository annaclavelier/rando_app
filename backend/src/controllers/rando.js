const randoService = require("../services/rando");
const {
  addElevationToGeoJSON,
  getEndElevation,
  getStartElevation,
  getMaxElevation,
  getMinElevation,
  computeElevationGainLoss,
} = require("../utils/geojsonUtils");
const fs = require("fs");
const turf = require("@turf/turf");
const path = require("path");

async function getAllRandos(req, res) {
  try {
    const randos = await randoService.getAllRandos();
    res.json(randos);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des randonnées");
  }
}

async function getRandoById(req, res) {
  try {
    const randoId = req.params.id;
    const rando = await randoService.getRandoById(randoId);
    if (!rando) {
      return res.status(404).json({ message: "Randonnée non trouvée" });
    }
    res.json(rando);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des données");
  }
}

async function getRandoByUser(req, res) {
  try {
    const userEmail = req.session.user?.email;
    if (!userEmail) return res.status(401).send("Non connecté");
    const randos = await randoService.getAllRandosByUser(userEmail);
    res.json(randos);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des données");
  }
}

async function deleteRandoById(req, res) {
  try {
    const randoId = req.params.id;
    await randoService.deleteRandoById(randoId);
    res.status(200).send("Randonnée supprimée");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la suppression");
  }
}

async function createRando(req, res) {
  const image = req.files["image"] ? req.files["image"][0].filename : null;
  const traceFile = req.files["trace"] ? req.files["trace"][0] : null;
  let kilometers,
    endElevation,
    startElevation,
    maxElevation,
    minElevation,
    dPlus,
    dMoins = null;

  if (traceFile) {
    // Read geojson file
    const rawData = fs.readFileSync(traceFile.path, "utf-8");
    let geojson = JSON.parse(rawData);
    // Compute total length
    kilometers = turf.length(geojson, { units: "kilometers" });
    // By default hike is back and forth
    kilometers = (kilometers * 2).toFixed(1);

    // Add elevation
    geojson = await addElevationToGeoJSON(geojson);
    // Rewrite geojson with elevation
    fs.writeFileSync(traceFile.path, JSON.stringify(geojson, null, 2));
    // Compute elevation of start and end
    endElevation = getEndElevation(geojson);
    startElevation = getStartElevation(geojson);
    // Compute max and min elevation
    maxElevation = getMaxElevation(geojson);
    minElevation = getMinElevation(geojson);
    ({ dPlus, dMoins } = computeElevationGainLoss(geojson));
  }

  if (!req.session.user) {
    return res.status(401).json({ message: "Non autorisé" });
  }

  const { titre, description, difficulte, duree, massif, publique } = req.body;

  if (!titre || !description) {
    return res
      .status(400)
      .json({ message: "Titre et description sont obligatoires." });
  }

  const email = req.session.user.email;

  try {
    const rando = {
      titre: titre,
      description: description,
      difficulte: difficulte,
      duree: duree,
      massif: massif,
      publique: publique,
      denivele: dPlus,
      km: kilometers,
      altitude_depart: startElevation,
      altitude_arrivee: endElevation,
      altitude_max: maxElevation,
      altitude_min: minElevation,
      trace: traceFile.filename,
      auteur: email,
      image: image,
      denivele_negatif: dMoins,
    };
    randoService.createRando(rando);
    res.status(201).send("Randonnée créée avec succès");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la création de la randonnée");
  }
}

async function updateRando(req, res) {
  const randoId = req.params.id;
  const { titre, description, difficulte, duree, massif, publique } = req.body;

  const foundRando = randoService.getRandoById(randoId);
  if (!foundRando) {
    return res.status(404).json({ message: "Randonnée non trouvée" });
  }

  if (foundRando.auteur !== req.session.user?.email) {
    return res.status(403).json({ error: "Accès refusé" });
  }

  const oldImage = existing.rows[0].image;
  let newImagePath = oldImage;

  if (req.files && req.files["image"]) {
    newImagePath = req.files["image"] ? req.files["image"][0].filename : null;

    // Supprimer l'ancienne image si elle existe
    if (oldImage && fs.existsSync(path.join(IMAGE_PATH, oldImage))) {
      fs.unlinkSync(path.join(IMAGE_PATH, oldImage));
    }
  }

  const traceFile = req.files["trace"] ? req.files["trace"][0] : null;

  let kilometers =
    (endElevation =
    startElevation =
    maxElevation =
    minElevation =
    dPlus =
    dMoins =
      null);

  if (traceFile) {
    // Read geojson file
    const rawData = fs.readFileSync(traceFile.path, "utf-8");
    let geojson = JSON.parse(rawData);
    // Compute total length
    kilometers = turf.length(geojson, { units: "kilometers" });
    // By default hike is back and forth
    kilometers = (kilometers * 2).toFixed(1);

    // Add elevation
    geojson = await addElevationToGeoJSON(geojson);
    // Rewrite geojson with elevation
    fs.writeFileSync(traceFile.path, JSON.stringify(geojson, null, 2));
    // Compute elevation of start and end
    endElevation = getEndElevation(geojson);
    startElevation = getStartElevation(geojson);
    // Compute max and min elevation
    maxElevation = getMaxElevation(geojson);
    minElevation = getMinElevation(geojson);
    // Compute elevation gain and loss
    ({ dPlus, dMoins } = computeElevationGainLoss(geojson));
  }

  try {
    const rando = {
      titre: titre,
      description: description,
      difficulte: difficulte,
      duree: duree,
      massif: massif,
      publique: publique,
      denivele: dPlus,
      km: kilometers,
      altitude_depart: startElevation,
      altitude_arrivee: endElevation,
      altitude_max: maxElevation,
      altitude_min: minElevation,
      trace: traceFile.filename,
      auteur: email,
      image: image,
      denivele_negatif: dMoins,
    };
    randoService.updateRando(randoId, rando);
    res.status(200).send("Randonnée mise à jour");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la mise à jour de la randonnée");
  }
}

async function findRandosByTitle(req, res) {
  const { query = "" } = req.query;

  try {
    const randos = await randoService.findRandosByTitle(query);
    res.json(randos);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
}

async function searchPublicRandos(req, res) {
  let { query = "", difficulte, duration, massif, denivele } = req.query;
  query = `%${query.toLowerCase()}%`;
  try {
    const randos = await randoService.searchPublicRandos(
      query,
      difficulte,
      duration,
      massif,
      denivele
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des randonnées");
  }
}

module.exports = {
  getAllRandos,
  getRandoById,
  getRandoByUser,
  deleteRandoById,
  createRando,
  updateRando,
  findRandosByTitle,
  searchPublicRandos,
};
