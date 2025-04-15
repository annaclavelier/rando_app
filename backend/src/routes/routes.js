const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

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
