const InitStart = require("../model/initStart_model");
const router = require("express").Router();
const decode = require("../controllers/decode");

//GET
router.put("/", async (req, res) => {
    // try {
      if (decode(req.body)){
        const initStart = await InitStart.findOne();
        res.status(200).json(initStart);
      } else
        res.status(200).json("Something wrong");
    // } catch (err) {
    //     res.status(500).json(err.msg);
    // }
  }
);

module.exports = router;