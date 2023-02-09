const router = require("express").Router();
const User = require("../model/user_model");

//ADD DRAMA
router.post("/login", async (req, res) => {
  const reqID = req.body["id"];
  const reqUser = req.body["user"];
  if (!reqID || !reqUser) 
    return res.status(200).json("Something wrong");

  const user = await User.findOne({ googleID: reqID});
  if (!user) {
    const newUser = new User(JSON.parse(reqUser));
    await newUser.save();
  }
  return res.status(200).json("Success");
});

module.exports = router;