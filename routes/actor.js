const actorController = require("../controllers/actorController");

const router = require("express").Router();

//ADD DRAMA
router.post("/", actorController.add);

//DELETE DRAMA
router.delete("/:id", actorController.delete);

module.exports = router;