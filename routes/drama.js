const dramaController = require("../controllers/dramaController");

const router = require("express").Router();

//ADD DRAMA
router.post("/", dramaController.post);

//GET DRAMA
router.put("/", dramaController.get);

//UPDATE AN DRAMA
router.patch("/", dramaController.update);

//DELETE DRAMA
router.delete("/", dramaController.delete);

module.exports = router;