const Drama = require("../model/drama_model");
const Episode = require("../model/episode_model");
const router = require("express").Router();

//GET ALL DRAMA
router.put("/", async(req, res) => {
    const dramaName = req.body["name"];
    const drama = await Drama.findOne( { name: dramaName }).populate('listEp');
    if (drama){
        let episode = new Episode();
        episode.name = drama.name;
        episode.name_vi = drama.name_vi;
        episode.epNumber = 5;
        episode.lastTime = new Date();
        episode.urlPoster = drama.urlPoster;
        episode.dramaID = drama._id;

      const saved = await episode.save(); //Add new Episode
      await drama.updateOne({$push: {listEp: saved._id}}) //Update Drama ListEp
    }
    res.status(200).json(drama);
});

module.exports = router;