const scheduleController = require("../controllers/scheduleController");

const router = require("express").Router();

//GET ALL & ADD ALL EPISODE
router.post("/", scheduleController.addAll);

//GET ALL EPISODE
router.put("/", scheduleController.getAll);

//GET AN EPISODE
// router.get("/:id", scheduleController.get);

//UPDATE AN EPISODE
// router.put("/:id", scheduleController.update);

//DELETE EPISODE
// router.delete("/", scheduleController.delete);

module.exports = router;