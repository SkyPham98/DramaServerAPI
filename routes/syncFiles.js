const syncFilesController = require("../controllers/syncFilesController");

const router = require("express").Router();

//GET ALL DRAMA
router.put("/", syncFilesController.getAll);

module.exports = router;