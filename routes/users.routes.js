const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/users.controllers");

router.get("/", userControllers.getAll);
router.get("/:id", userControllers.getSingle);

module.exports = router;