const Drama = require("../model/drama_model");
const Episode = require("../model/episode_model");
const decode = require("./decode");

const episodeController = {
  //ADD EPISODE
  add: async (req, res) => {
    try {
      if (decode(req.body) && JSON.parse(req.body["item"])){
        const newEpisode = new Episode(JSON.parse(req.body["item"]));
        const ep_number = newEpisode.epNumber;
        const dramaName = newEpisode.name;
        const drama = await Drama.findOne({name: dramaName}).populate("listEp");
        if (!drama)             
          res.status(200).json(newEpisode);
        else {
          for(const ep of drama.listEp){ // Update Episode if exist
            if (ep.epNumber == ep_number) {
              const episode = await Episode.findById(ep._id);
              await episode.updateOne({ $set: JSON.parse(req.body["item"]) });
              res.status(200).json("Update Complete!");
              next();
            }
          }

          const saved = await newEpisode.save(); //Add new Episode
          await drama.updateOne({$push: {listEp: saved._id}}) //Update Drama ListEp
      
          res.status(200).json("Add Complete!");
        }
      } 
      else
        res.status(200).json("Something wrong");
    } catch (err) {
      res.status(500).json(err.msg); //HTTP REQUEST CODE
    }
  },

  //GET EPISODES
  get: async (req, res) => {
    try {
      if (decode(req.body)){
        if (req.body["id"]){ // GET A EPISODES
          const episode = await Episode.findById(req.body["id"]);     
          res.status(200).json(episode);
        } 
        else if (req.body["dramaID"]){  // GET ALL EPISODE
          const drama = await Drama.findById(req.body["dramaID"]).populate("listEp");
          const episodes = await drama.listEp;
          res.status(200).json(episodes);
        } else
          res.status(200).json("Something wrong");
      } 
      else
        res.status(200).json("Something wrong");
    } catch (err) {
      res.status(500).json(err.msg);
    }
  },

  //UPDATE EPISODE
  update: async (req, res) => {
    try {
      if (decode(req.body)){
        const episode = await Episode.findById(req.body["id"]);
        await episode.updateOne({ $set: JSON.parse(req.body["item"]) });
        res.status(200).json("Updated successfully!");
      } 
      else
        res.status(200).json("Something wrong");
    } 
    catch (err) {
      res.status(500).json(err.msg);
    }
  },

  //DELETE EPISODE
  delete: async (req, res) => {
    try {
      if (decode(req.body)){
        await Drama.updateOne({ episode: req.body["id"] }, { episode: null });
        await Episode.findByIdAndDelete(req.body["id"]);
        res.status(200).json("Deleted successfully!");
      } 
      else
        res.status(200).json("Something wrong");
    } 
    catch (err) {
      res.status(500).json(err.msg);
    }
  },
};

module.exports = episodeController;