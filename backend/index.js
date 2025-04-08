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
