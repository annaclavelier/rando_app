const express = require("express");
const router = express.Router();

const randoRoutes = require("./rando");
const userRoutes = require("./user");
const favoriteRoutes = require("./favori");

router.use("/randos", randoRoutes);
router.use(userRoutes);
router.use("/favorites", favoriteRoutes);

module.exports = router;
