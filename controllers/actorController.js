const Drama = require("../model/drama_model");
const Actor = require("../model/actor_model");
const decode = require("./decode");

const actorController = {
  //ADD ACTOR
  add: async (req, res) => {
    try {
      if (decode(req.body)){
        const newActor = new Actor(JSON.parse(req.body["item"]));
        const saved = await newActor.save();
        res.status(200).json(saved);
      } 
      else
        res.status(200).json("Something wrong");
    } 
    catch (err) {
      res.status(500).json(err.msg); //HTTP REQUEST CODE
    }
  },

  //GET ALL ACTORS
  // getAll: async (req, res) => {
  //   try {
  //     const drama = await Drama.findById(req.params.id);
  //     const episodes = await drama.find();
  //     res.status(200).json(episodes);
  //   } catch (err) {
  //     res.status(500).json(err.msg);
  //   }
  // },

  //GET AN ACTORS
  get: async (req, res) => {
    try {
      if (decode(req.body)){
        const actor = await Actor.findById(req.body["id"]);
        res.status(200).json(actor);
      } 
      else
        res.status(200).json("Something wrong");
    } 
    catch (err) {
      res.status(500).json(err.msg);
    }
  },

  //UPDATE ACTOR
  update: async (req, res) => {
    try {
      if (decode(req.body)){
        const actor = await Actor.findById(req.body["id"]);
        await actor.updateOne({ $set: JSON.parse(req.body["item"]) });
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
        await Drama.updateMany({ actor: req.body["id"] }, { actor: null });
        await Actor.findByIdAndDelete(req.body["id"]);
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

module.exports = actorController;