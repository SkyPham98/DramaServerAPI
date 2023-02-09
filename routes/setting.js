const Settings = require("../model/setting_model");
const router = require("express").Router();

//GET
router.put("/", async (req, res) => {
    try {
      if (decode(req.body)){
        const settings = await Settings.findOne();
        res.status(200).json(settings);
      } else
        res.status(200).json("Something wrong");
    } catch (err) {
        res.status(500).json(err.msg);
    }
  }
);

module.exports = router;