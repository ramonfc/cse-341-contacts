const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/users.controllers");

router.get("/", userControllers.getAll);
router.get("/:id", userControllers.getSingle);

router.post("/", userControllers.createUser);
router.put("/:id", userControllers.updateUser);
router.delete("/:id", userControllers.deleteUser);

module.exports = router;
