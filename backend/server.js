const express = require("express");
const cors = require("cors");
const db = require("./db");

// start
const router = express();

const PORT = 8080;

const corsOptions = {
  origin: ["http://localhost:5173"],
};
// authorize json
router.use(express.json());
router.use(cors(corsOptions));

router.listen(PORT, () => {
  console.log("Serveur started on port 8080");
});

// ================routes========================

router.get("/api/randos", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM randonnee", []);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des utilisateurs");
  }
});

router.get("/api/randos/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await db.query("SELECT * FROM randonnee WHERE id=$1", [id]);
    if (result.rows.length == 0) {
      return res.status(404).json({ message: "Randonnée non trouvée" });
    }
    const galerie = await db.query("SELECT chemin FROM IMAGE_SECONDAIRE WHERE rando_id=$1", [id]);
    const images = galerie.rows;

    // Ajouter la galerie d'images (secondaires)
    if (images.length > 0) {
      result.rows[0].galerie = images.map(image => image.chemin); 
    }else{
      result.rows[0].galerie = [];
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des données");
  }
});

router.get("/api/randos-search", async (req, res) => {
  let { query = "", difficulte, duration, massif, denivele } = req.query;
  query = `%${query.toLowerCase()}%`;

  let sql = "SELECT * FROM randonnee WHERE LOWER(titre) LIKE $1";
  let params = [query];
  let i = 2;

  if (difficulte) {
    sql += ` AND difficulte = $${i}`;
    params.push(difficulte);
    i++;
  }

  if (duration) {
    sql += ` AND duree = $${i}`;
    params.push(duration);
    i++;
  }

  if (massif) {
    sql += ` AND massif = $${i}`;
    params.push(massif);
    i++;
  }

  if (denivele) {
    // ici on filtre selon les catégories que tu définis côté client
    if (denivele === "moins de 300m") {
      sql += ` AND denivele < $${i}`;
      params.push(300);
    } else if (denivele === "300 à 500m") {
      sql += ` AND denivele >= 300 AND denivele < 500`;
    } else if (denivele === "500 à 800m") {
      sql += ` AND denivele >= 500 AND denivele < 800`;
    } else if (denivele === "800 à 1000m") {
      sql += ` AND denivele >= 800 AND denivele < 1000`;
    } else if (denivele === "plus 1000m") {
      sql += ` AND denivele >= 1000`;
    }
  }

  try {
    const result = await db.query(sql, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des randonnées");
  }
});

router.get("/api/users", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM utilisateurs", []);
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des utilisateurs");
  }
});
