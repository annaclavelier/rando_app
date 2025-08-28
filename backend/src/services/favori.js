const db = require("../db");

async function getFavoritesRandosByUser(userEmail) {
  const result = await db.query(
    `SELECT r.* 
         FROM RANDONNEE r, FAVORI f 
         WHERE r.id=f.rando_id 
         AND f.utilisateur_email = $1`,
    [userEmail]
  );
  return result.rows;
}

async function removeFavorite(randoId, userEmail) {
  const result = await db.query(
    "DELETE FROM FAVORI WHERE rando_id = $1 AND utilisateur_email = $2",
    [randoId, userEmail]
  );
  return result.rows[0];
}

async function addFavorite(randoId, userEmail) {
  const result = await db.query(
    "INSERT INTO FAVORI (rando_id, utilisateur_email) VALUES ($1, $2) ON CONFLICT DO NOTHING",
    [randoId, userEmail]
  );
  return result.rows[0];
}

async function updateUserEmail(newUserEmail, originEmail) {
  const result = await db.query(
    `UPDATE favori SET
      utilisateur_email = $1
      WHERE utilisateur_email = $2`,
    [newUserEmail, originEmail]
  );
  return result.rows[0];
}

module.exports = {
  getFavoritesRandosByUser,
  removeFavorite,
  addFavorite,
  updateUserEmail,
};
