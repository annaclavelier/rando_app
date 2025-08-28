const db = require("../db");

async function getAllRandos() {
  const result = await db.query("SELECT * FROM randonnee");
  return result.rows;
}

async function getAllRandosByUser(userEmail) {
  const result = await db.query("SELECT * FROM randonnee WHERE auteur = $1", [
    userEmail,
  ]);
  return result.rows;
}

async function getRandoById(id) {
  const result = await db.query("SELECT * FROM randonnee WHERE id=$1", [id]);
  if (result.rows.length === 0) return null;

  const galerie = await db.query(
    "SELECT chemin FROM IMAGE_SECONDAIRE WHERE rando_id=$1",
    [id]
  );

  const rando = result.rows[0];
  rando.galerie = galerie.rows.map((img) => img.chemin);
  return rando;
}

async function deleteRandoById(id) {
  await db.query("DELETE FROM IMAGE_SECONDAIRE WHERE rando_id = $1", [id]);
  await db.query("DELETE FROM randonnee WHERE id = $1", [id]);
}

async function createRando(newRando) {
  const query = `
    INSERT INTO RANDONNEE(
      titre, description, difficulte, denivele, altitude_depart, altitude_arrivee, duree,
      km, massif, image, auteur, trace, publique, altitude_max, altitude_min, denivele_negatif
    ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
    RETURNING *;
  `;

  const values = [
    newRando.titre,
    newRando.description,
    newRando.difficulte,
    newRando.denivele,
    newRando.altitude_depart,
    newRando.altitude_arrivee,
    newRando.duree,
    newRando.km,
    newRando.massif,
    newRando.image,
    newRando.auteur,
    newRando.trace,
    newRando.publique,
    newRando.altitude_max,
    newRando.altitude_min,
    newRando.denivele_negatif,
  ];

  const result = await db.query(query, values);
  return result.rows[0];
}

async function updateRando(id, updatedRando) {
  const result = await db.query(
    `UPDATE randonnee SET
        titre = COALESCE($1, titre),
        description = COALESCE($2, description),
        difficulte = COALESCE($3, difficulte),
        denivele = COALESCE($4, denivele),
        denivele_negatif = COALESCE($5, denivele_negatif),
        altitude_depart = COALESCE($6, altitude_depart),
        altitude_arrivee = COALESCE($7, altitude_arrivee),
        duree = COALESCE($8, duree),
        km = COALESCE($9, km),
        massif = COALESCE($10, massif),
        image = COALESCE($11, image),
        publique = COALESCE($12, publique),
        trace = COALESCE($13, trace),
        altitude_max = COALESCE($14, altitude_max),
        altitude_min = COALESCE($15, altitude_min)
      WHERE id = $16
      RETURNING *`,
    [
      updatedRando.titre,
      updatedRando.description,
      updatedRando.difficulte,
      updatedRando.denivele,
      updatedRando.denivele_negatif,
      updatedRando.altitude_depart,
      updatedRando.altitude_arrivee,
      updatedRando.duree,
      updatedRando.km,
      updatedRando.massif,
      updatedRando.image,
      updatedRando.publique,
      updatedRando.trace,
      updatedRando.altitude_max,
      updatedRando.altitude_min,
      id,
    ]
  );

  return result.rows[0];
}

async function updateAuthorFromItsRandos(newUserEmail, originEmail) {
  await db.query(
    `UPDATE randonnee SET auteur = $1 WHERE auteur = $2`,
    [newUserEmail, originEmail]
  );
}

async function findRandosByTitle(title) {
  const result = await db.query(
    "SELECT titre, id FROM randonnee WHERE titre ILIKE $1 LIMIT 5",
    [`%${title}%`]
  );
  return result.rows;
}

async function searchPublicRandos(query, difficulte, duration, massif, denivele) {
  let sql =
    "SELECT * FROM randonnee WHERE LOWER(titre) LIKE $1 AND publique=true";
  const params = [`%${query.toLowerCase()}%`];
  let i = 2;

  if (difficulte) {
    sql += ` AND difficulte = $${i}`;
    params.push(difficulte);
    i++;
  }

  if (duration) {
    if (duration === "moins d'1h") sql += " AND duree < 1";
    else if (duration === "1h à 2h") sql += " AND duree >= 1 AND duree <= 2";
    else if (duration === "2h à 3h") sql += " AND duree >= 2 AND duree <= 3";
    else if (duration === "plus de 3h") sql += " AND duree > 3";
  }

  if (massif) {
    sql += ` AND massif = $${i}`;
    params.push(massif);
    i++;
  }

  if (denivele) {
    if (denivele === "moins de 300m") sql += ` AND denivele < 300`;
    else if (denivele === "300 à 500m") sql += ` AND denivele >= 300 AND denivele < 500`;
    else if (denivele === "500 à 800m") sql += ` AND denivele >= 500 AND denivele < 800`;
    else if (denivele === "800 à 1000m") sql += ` AND denivele >= 800 AND denivele < 1000`;
    else if (denivele === "plus 1000m") sql += ` AND denivele >= 1000`;
  }

  const result = await db.query(sql, params);
  return result.rows;
}

module.exports = {
  getAllRandos,
  getRandoById,
  getAllRandosByUser,
  deleteRandoById,
  createRando,
  updateRando,
  updateAuthorFromItsRandos,
  findRandosByTitle,
  searchPublicRandos,
};
