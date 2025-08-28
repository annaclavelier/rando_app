const express = require("express");
const router = express.Router();
const multer = require("multer");
const IMAGE_PATH = "uploads";

const randoController = require("../controllers/rando");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGE_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // conserver le nom original
  },
});

const upload = multer({ storage });

router.get("/", randoController.getAllRandos);

// Add rando for current-user
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "trace", maxCount: 1 },
  ]),
  randoController.createRando
);

router.get("/search", randoController.searchPublicRandos);

router.get("/search-min", randoController.findRandosByTitle);

router.get("/current-user", randoController.getRandoByUser);

router.get("/:id", randoController.getRandoById);

router.delete("/:id", randoController.deleteRandoById);

// Update
router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "trace", maxCount: 1 },
  ]),
  randoController.updateRando
);

module.exports = router;
