const express = require("express");
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcrypt");
const session = require("express-session");

// start
const router = express();

const PORT = 8080;

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
// authorize json
router.use(express.json());
router.use(cors(corsOptions));

router.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1h
    },
  })
);

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

router.get("/api/randos-search", async (req, res) => {
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

router.get("/api/users", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM utilisateur", []);
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des utilisateurs");
  }
});

router.post("/api/register", async (req, res) => {
  const { pseudo, email, mot_passe, nom, prenom } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(mot_passe, saltRounds);

    const utilisateur = await db.query(
      "INSERT INTO UTILISATEUR VALUES($1, $2, $3, $4, $5)",
      [email, pseudo, hashedPassword, nom, prenom]
    );

    res.status(201).send("Utilisateur créé avec succès");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la création d'un utilisateur.");
  }
});

router.post("/api/login", async (req, res) => {
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

router.get("/api/current-user", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Non connecté" });
  }
  res.json(req.session.user);
});

router.post("/api/logout", (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});

