const db = require("../db");

async function getAllUsers() {
  const result = await db.query("SELECT * FROM utilisateur");
  return result.rows;
}

async function getUserByEmail(userEmail) {
  const result = await db.query("SELECT * FROM UTILISATEUR WHERE email=$1", [
    userEmail,
  ]);
  return result.rows[0];
}

async function updateUserByEmail(userEmail, newUser) {
  const result = await db.query(
    `UPDATE utilisateur SET
          prenom = $1,
          nom = $2,
          email = $3,
          pseudo = $4
          WHERE email = $5`,
    [newUser.prenom, newUser.nom, newUser.email, newUser.pseudo, userEmail]
  );
  return result.rows[0];
}

async function createUser(newUser) {
  const result = await db.query(
    "INSERT INTO UTILISATEUR VALUES($1, $2, $3, $4, $5)",
    [
      newUser.email,
      newUser.pseudo,
      newUser.mot_passe,
      newUser.nom,
      newUser.prenom,
    ]
  );

  return result.rows[0];
}

async function updateUser(updatedUser, originEmail) {
  const result = await db.query(
    `UPDATE utilisateur SET
  prenom = $1,
  nom = $2,
  email = $3,
  pseudo = $4
  WHERE email = $5`,
    [
      updatedUser.prenom,
      updatedUser.nom,
      updatedUser.email,
      updatedUser.pseudo,
      originEmail,
    ]
  );

  return result.rows[0];
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  updateUserByEmail,
  createUser,
  updateUser,
};
