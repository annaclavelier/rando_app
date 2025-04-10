const express = require("express");
const cors = require("cors");
const rando = require("./data/rando");

// start
const router = express();

const PORT = 8080;

const corsOptions = {
  origin: ["http://localhost:5173"],
};

router.use(cors(corsOptions));

router.get("/api/randos", (req, res) => {
  res.json(rando.randos);
});

router.listen(PORT, () => {
  console.log("Serveur started on port 8080");
});

router.get("/api/randos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const rando_found = rando.findRando(id);

  if (!rando_found) {
    return res.status(404).json({ message: "Rando non trouvée" });
  }

  res.json(rando_found);
});


router.get("/api/randos-search", (req, res) => {
  const { query = "", difficulte, duration, massif, denivele } = req.query;

  const getDeniveleCategory = (denivele) => {
    if (denivele === undefined) return "";
    if (denivele < 300) return "moins de 300m";
    if (denivele < 500) return "300 à 500m";
    if (denivele < 800) return "500 à 800m";
    if (denivele < 1000) return "800 à 1000m";
    return "plus 1000m";
  };

  const filtered = rando.randos.filter((item) => {
    return (
      item.titre.toLowerCase().includes(query.toLowerCase()) &&
      (!difficulte || item.difficulte === difficulte) &&
      (!duration || item.duree === duration) &&
      (!massif || item.massif === massif) &&
      (!denivele || getDeniveleCategory(item.denivele) === denivele)
    );
  });

  res.json(filtered);
});
