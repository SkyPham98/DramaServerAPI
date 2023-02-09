const episodeController = require("../controllers/episodeController");

const router = require("express").Router();

//ADD EPISODE
router.post("/", episodeController.add);

//GET EPISODE
router.put("/", episodeController.get);

//UPDATE AN EPISODE
router.patch("/:id", episodeController.update);

//DELETE EPISODE
router.delete("/:id", episodeController.delete);

module.exports = router;