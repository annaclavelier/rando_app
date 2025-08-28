const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.get("/users", userController.getAllUsers);

router.post("/users", userController.createUser);

router.post("/login", userController.login);

router.get("/current-user", userController.getCurrentUser);

router.post("/logout", userController.logout);

router.put("/current-user", userController.updateUser);

router.post("/change-password", userController.updatePasswordUser);

module.exports = router;
