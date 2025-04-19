const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");

const IMAGE_PATH = "../frontend/public/assets";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGE_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // conserver le nom original
  },
});

const upload = multer({ storage });

// =====================RANDONNEES===================

router.get("/randos", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM randonnee", []);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des randonnées");
  }
});

router.get("/randos/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await db.query("SELECT * FROM randonnee WHERE id=$1", [id]);
    if (result.rows.length == 0) {
      return res.status(404).json({ message: "Randonnée non trouvée" });
    }
    const galerie = await db.query(
      "SELECT chemin FROM IMAGE_SECONDAIRE WHERE rando_id=$1",
      [id]
    );
    const images = galerie.rows;

    // Ajouter la galerie d'images (secondaires)
    if (images.length > 0) {
      result.rows[0].galerie = images.map((image) => image.chemin);
    } else {
      result.rows[0].galerie = [];
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des données");
  }
});

router.delete("/rando/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await db.query("DELETE FROM IMAGE_SECONDAIRE WHERE rando_id = $1", [id]);
    await db.query("DELETE FROM randonnee WHERE id = $1", [id]);
    res.status(202).send("Randonnée supprimée avec succès");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la suppression");
  }
});

router.get("/randos-search", async (req, res) => {
  let { query = "", difficulte, duration, massif, denivele } = req.query;
  query = `%${query.toLowerCase()}%`;

  let sql = "SELECT * FROM randonnee WHERE LOWER(titre) LIKE $1";
  const params = [query];
  let i = 2;

  if (difficulte) {
    sql += ` AND difficulte = $${i}`;
    params.push(difficulte);
    i++;
  }

  if (duration) {
    if (duration === "moins d'1h") {
      sql += " AND duree < 1 ";
    } else if (duration == "1h à 2h") {
      sql += " AND duree >= 1 AND duree <= 2";
    } else if (duration == "2h à 3h") {
      sql += " AND duree >= 2 AND duree <= 3";
    } else if (duration == "plus de 3h") {
      sql += " AND duree > 3";
    }
  }

  if (massif) {
    sql += ` AND massif = $${i}`;
    params.push(massif);
    i++;
  }

  if (denivele) {
    // filtrer selon catégories
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

// ====================DONNEES UTILISATEUR CONNECTE =================
router.get("/mes-randos", async (req, res) => {
  const email = req.session.user?.email;
  if (!email) return res.status(401).send("Non connecté");

  try {
    const result = await db.query("SELECT * FROM randonnee WHERE auteur = $1", [
      email,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});

// Update
router.put("/rando/:id", upload.single("image"), async (req, res) => {
  const randoId = req.params.id;
  const {
    titre,
    description,
    difficulte,
    denivele,
    altitude_depart,
    altitude_arrivee,
    duree,
    km,
    massif,
  } = req.body;

  try {
    // récupérer l'existante pour potentiellement supprimer l'ancienne image
    const existing = await db.query("SELECT * FROM randonnee WHERE id = $1", [
      randoId,
    ]);
    if (existing.rows.length === 0)
      return res.status(404).json({ error: "Rando introuvable" });

    if (existing.rows[0].auteur !== req.session.user?.email) {
      return res.status(403).json({ error: "Accès refusé" });
    }

    const oldImage = existing.rows[0].image;
    let newImagePath = oldImage;

    if (req.file) {
      newImagePath = req.file.filename;

      // Supprimer l'ancienne image si elle existe
      if (oldImage && fs.existsSync(path.join(IMAGE_PATH, oldImage))) {
        fs.unlinkSync(path.join(IMAGE_PATH, oldImage));
      }
    }

    const result = await db.query(
      `UPDATE randonnee SET
        titre = $1,
        description = $2,
        difficulte = $3,
        denivele = $4,
        altitude_depart = $5,
        altitude_arrivee = $6,
        duree = $7,
        km = $8,
        massif = $9,
        image = $10
      WHERE id = $11
      RETURNING *`,
      [
        titre || null,
        description || null,
        difficulte || null,
        denivele || null,
        altitude_depart || null,
        altitude_arrivee || null,
        duree || null,
        km || null,
        massif || null,
        newImagePath,
        randoId,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Erreur update rando:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Add rando for current-user
router.post("/rando", upload.single("image"), async (req, res) => {
  const imageName = req.file.originalname;

  if (!req.session.user) {
    return res.status(401).json({ message: "Non autorisé" });
  }

  const {
    titre,
    description,
    difficulte,
    denivele,
    altitude_depart,
    altitude_arrivee,
    duree,
    km,
    massif,
  } = req.body;

  if (!titre || !description) {
    return res
      .status(400)
      .json({ message: "Titre et description sont obligatoires." });
  }

  try {
    const email = req.session.user.email;
    await db.query(
      "INSERT INTO RANDONNEE(titre, description,difficulte,denivele,altitude_depart, altitude_arrivee, duree, km, massif, image, auteur) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
      [
        titre,
        description,
        difficulte || null,
        denivele ?? null,
        altitude_depart ?? null,
        altitude_arrivee ?? null,
        duree ?? null,
        km ?? null,
        massif || null,
        imageName,
        email,
      ]
    );
    res.status(201).send("Randonnée créée avec succès");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});

// ==========================UTILISATEURS============================
router.get("/users", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM utilisateur", []);
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des utilisateurs");
  }
});

router.post("/register", async (req, res) => {
  const { pseudo, email, mot_passe, nom, prenom } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(mot_passe, saltRounds);

    await db.query("INSERT INTO UTILISATEUR VALUES($1, $2, $3, $4, $5)", [
      email,
      pseudo,
      hashedPassword,
      nom,
      prenom,
    ]);

    res.status(201).send("Utilisateur créé avec succès");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la création d'un utilisateur.");
  }
});

router.post("/login", async (req, res) => {
  const { email, mot_passe } = req.body;

  try {
    const user = await db.query("SELECT * FROM UTILISATEUR WHERE email=$1", [
      email,
    ]);

    if (!user.rows[0]) {
      return res.status(404).send("Il n'existe pas de compte avec cet email !");
    }

    const hashedPassword = user.rows[0].mot_passe;

    const passwordMatch = await bcrypt.compare(mot_passe, hashedPassword);

    if (passwordMatch) {
      req.session.user = {
        pseudo: user.rows[0].pseudo,
        email: user.rows[0].email,
        nom: user.rows[0].nom,
        prenom: user.rows[0].prenom,
      };
      res.json({ message: "Connexion réussie", utilisateur: req.session.user });
    } else {
      res.status(401).send("Identifiants incorrects");
    }
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
});

router.get("/current-user", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Non connecté" });
  }
  res.json(req.session.user);
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});

module.exports = router;
