const bcrypt = require("bcrypt");
const userService = require("../services/user");
const favoriService = require("../services/favori");
const randoService = require("../services/rando");

async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des utilisateurs");
  }
}

async function getCurrentUser(req, res) {
  if (!req.session.user) {
    return res.status(401).json({ message: "Non connecté" });
  }
  res.json(req.session.user);
}

async function logout(req, res) {
  req.session.destroy();
  res.sendStatus(200);
}

async function login(req, res) {
  const { email, mot_passe } = req.body;

  try {
    const user = await userService.getUserByEmail(email);

    if (!user) {
      return res.status(404).send("Il n'existe pas de compte avec cet email !");
    }

    const hashedPassword = user.mot_passe;
    const passwordMatch = await bcrypt.compare(mot_passe, hashedPassword);

    if (passwordMatch) {
      req.session.user = {
        pseudo: user.pseudo,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
      };
      res.json({ message: "Connexion réussie", utilisateur: req.session.user });
    } else {
      res.status(401).send("Identifiants incorrects");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Erreur serveur");
  }
}

async function createUser(req, res) {
  const { pseudo, email, mot_passe, nom, prenom } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(mot_passe, saltRounds);

    await userService.createUser({
      pseudo: pseudo,
      email: email,
      mot_passe: hashedPassword,
      nom: nom,
      prenom: prenom,
    });
    res.status(201).send("Utilisateur créé avec succès");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la création d'un utilisateur.");
  }
}

async function updateUser(req, res) {
  const { prenom, nom, email, email_origin, pseudo } = req.body;

  try {
    // update user infos
    await userService.updateUser(
      { prenom: prenom, nom: nom, email: email, pseudo: pseudo },
      email_origin
    );

    if (email !== email_origin) {
      // update randonnees and favori data to still be link to correct user
      await favoriService.updateUserEmail(email, email_origin);
      await randoService.updateAuthorFromItsRandos(email, email_origin);
    }
  } catch (error) {
    console.error("Erreur update user:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
  }
}

module.exports = {
  getAllUsers,
  getCurrentUser,
  logout,
  login,
  createUser,
  updateUser,
};
