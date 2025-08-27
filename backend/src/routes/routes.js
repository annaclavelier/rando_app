const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const IMAGE_PATH = "uploads";
const turf = require('@turf/turf');
const { addElevationToGeoJSON, getEndElevation } = require("../utils/geojsonUtils.js");

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
  // get only public randonnees
  let sql =
    "SELECT * FROM randonnee WHERE LOWER(titre) LIKE $1 AND publique=true";
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

router.get("/rando-search-min", async (req, res) => {
  const { query = "" } = req.query;

  try {
    const result = await db.query(
      "SELECT titre, id FROM randonnee WHERE titre ILIKE $1 LIMIT 5",
      [`%${query}%`]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
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
router.put("/rando/:id",  upload.fields([
  { name: "image", maxCount: 1 },
  { name: "trace", maxCount: 1 },
]), async (req, res) => {
  const randoId = req.params.id;
  const {
    titre,
    description,
    difficulte,
    denivele,
    altitude_depart,
    duree,
    massif,
    publique,
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

    if (req.files && req.files["image"]) {
      newImagePath = req.files["image"] ? req.files["image"][0].filename : null;

      // Supprimer l'ancienne image si elle existe
      if (oldImage && fs.existsSync(path.join(IMAGE_PATH, oldImage))) {
        fs.unlinkSync(path.join(IMAGE_PATH, oldImage));
      }
    }

    const traceFile = req.files["trace"] ? req.files["trace"][0] : null;

    let kilometers = null;

    if (traceFile) {
      // Read geojson file
      const rawData = fs.readFileSync(traceFile.path, "utf-8");
      const geojson = JSON.parse(rawData);
      // Compute total length
      kilometers = turf.length(geojson, { units: "kilometers" });
      // By default hike is back and forth
      kilometers =(kilometers * 2).toFixed(1);
    }

    const result = await db.query(
      `UPDATE randonnee SET
        titre = COALESCE($1, titre),
        description = COALESCE($2, description),
        difficulte = COALESCE($3, difficulte),
        denivele = COALESCE($4, denivele),
        altitude_depart = COALESCE($5,altitude_depart),
        altitude_arrivee = COALESCE($6, altitude_arrivee),
        duree = COALESCE($7, duree),
        km = COALESCE($8, km),
        massif = COALESCE($9, massif),
        image = COALESCE($10, image),
        publique = COALESCE($12, publique),
        trace = COALESCE($13, trace)
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
        kilometers || null,
        massif || null,
        newImagePath,
        randoId,
        publique,
        traceFile  ? traceFile.filename : null
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Erreur update rando:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Add rando for current-user
router.post(
  "/rando",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "trace", maxCount: 1 },
  ]),
  async (req, res) => {
    const image = req.files["image"] ? req.files["image"][0].filename : null;
    const traceFile = req.files["trace"] ? req.files["trace"][0] : null;
    let kilometers = 0;
    let endElevation = null;

    if (traceFile) {
      // Read geojson file
      const rawData = fs.readFileSync(traceFile.path, "utf-8");
      let geojson = JSON.parse(rawData);
      // Compute total length
      kilometers = turf.length(geojson, { units: "kilometers" });
      // By default hike is back and forth
      kilometers =(kilometers * 2).toFixed(1);

      // Add elevation
      geojson = await addElevationToGeoJSON(geojson);
      // Rewrite geojson with elevation 
      fs.writeFileSync(traceFile.path, JSON.stringify(geojson, null, 2));
      // Compute hike's end elevation
      endElevation = getEndElevation(geojson);
    }

    if (!req.session.user) {
      return res.status(401).json({ message: "Non autorisé" });
    }

    const {
      titre,
      description,
      difficulte,
      denivele,
      altitude_depart,
      duree,
      massif,
      publique
    } = req.body;

    if (!titre || !description) {
      return res
        .status(400)
        .json({ message: "Titre et description sont obligatoires." });
    }

    try {
      const email = req.session.user.email;
      await db.query(
        "INSERT INTO RANDONNEE(titre, description,difficulte,denivele,altitude_depart, altitude_arrivee, duree, km, massif, image, auteur, trace, publique) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11, $12, )",
        [
          titre,
          description,
          difficulte || null,
          denivele ?? null,
          altitude_depart ?? null,
          endElevation,
          duree ?? null,
          kilometers ?? null,
          massif || null,
          image,
          email,
          traceFile.filename,
          publique
        ]
      );
      res.status(201).send("Randonnée créée avec succès");
    } catch (err) {
      console.error(err);
      res.status(500).send("Erreur serveur");
    }
  }
);

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
      pseudo || null,
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

router.put("/current-user-infos", async (req, res) => {
  const { prenom, nom, email, email_origin, pseudo } = req.body;

  try {
    // updating user infos
    const result = await db.query(
      `UPDATE utilisateur SET
        prenom = $1,
        nom = $2,
        email = $3,
        pseudo = $4
        WHERE email = $5`,
      [prenom, nom, email, pseudo || null, email_origin]
    );

    // update randonnees and favori data to still be link to correct user
    if (email !== email_origin) {
      await db.query(
        `UPDATE favori SET
          utilisateur_email = $1
          WHERE utilisateur_email = $2`,
        [email, email_origin]
      );

      await db.query(
        `UPDATE randonnee SET
          auteur = $1
          WHERE auteur = $2`,
        [email, email_origin]
      );
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Erreur update user:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ==================FAVORIS==================

// Mettre en favori une randonnée pour l'utilisateur actuel
router.post("/favorite/:rando_id", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Non connecté" });
  }

  const email = req.session.user.email;
  const randoId = parseInt(req.params.rando_id);

  try {
    await db.query(
      "INSERT INTO FAVORI (rando_id, utilisateur_email) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [randoId, email]
    );
    res.status(200).json({ message: "Randonnée ajoutée aux favoris" });
  } catch (error) {
    console.error("Erreur ajout favori:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Récupérer la liste des randonnées favorites de l'utilisateur actuel
router.get("/favorites", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Non connecté" });
  }

  const email = req.session.user.email;

  try {
    const result = await db.query(
      `SELECT r.* 
       FROM RANDONNEE r, FAVORI f 
       WHERE r.id=f.rando_id 
       AND f.utilisateur_email = $1`,
      [email]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erreur récupération favoris:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Retirer des favoris une randonnée pour l'utilisateur actuel
router.delete("/favorites/:rando_id", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Non connecté" });
  }

  const email = req.session.user.email;
  const randoId = parseInt(req.params.rando_id);

  try {
    await db.query(
      "DELETE FROM FAVORI WHERE rando_id = $1 AND utilisateur_email = $2",
      [randoId, email]
    );
    res.status(200).json({ message: "Randonnée retirée des favoris" });
  } catch (error) {
    console.error("Erreur suppression favori:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
