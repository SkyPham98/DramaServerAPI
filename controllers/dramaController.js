const Drama = require("../model/drama_model");
const Episode = require("../model/episode_model");
const Actor = require("../model/actor_model");
const updateDBController = require('./updateDBController');
const decode = require("./decode");

const dramaController = {
  //ADD A DRAMA
  post: async (req, res) => {
    // try {
      if (decode(req.body)){
        if (req.body["item"]){
          const newDrama = new Drama(JSON.parse(req.body["item"]));
          const drama = await Drama.findOne( { name: newDrama.name });
          if (!drama)
            await newDrama.save();
          else
            await drama.updateOne({ $set: JSON.parse(req.body["item"]) });
        } 
        else if (req.body["name"]){
          const drama = await Drama.findOne( { name: req.body["name"] });
          if (!drama){
            const dramaName = req.body["name"];
            const dramaName_vi = req.body["name_vi"];
            await updateDBController.addNewDramaDB(dramaName, dramaName_vi);
          }
          else
            res.status(200).json("Drama Exist!");
        }
        res.status(200).json("Complete!");
      } 
      else
        res.status(200).json("Something wrong");
    // } 
    // catch (err) {
    //   res.status(500).json(err);
    // }
  },

  //GET DRAMA
  get: async (req, res) => {
    try {
      if (decode(req.body)){
        if (req.body["id"]){ // GET A DRAMA
          const drama = await Drama.findById(req.body["id"])
                                  .populate("listEp")
                                  .populate("listActor"); 
          res.status(200).json(drama);
        } 
        else {  // GET ALL DRAMA
          const dramas = await Drama.find()
                                  .populate("listEp")
                                  .populate("listActor");
          res.status(200).json(dramas);
        }
      } 
      else
        res.status(200).json("Something wrong");
    } 
    catch (err) {
      res.status(500).json(err.msg);
    }
  },

  
  //UPDATE DRAMA
  update: async (req, res) => {
    // try {
      if (decode(req.body)){
        const drama = await Drama.findById(req.body["id"]);
        if (!drama) return;
        const max_Ep = req.body["maxEp"];
        const rating = req.body["score"];
        const jsonActor = req.body["listActor"];
    
        if (max_Ep)
          await drama.updateOne({ maxEp: max_Ep });
        if (rating)
          await drama.updateOne({ score: rating });
        if (jsonActor){
          await drama.updateOne({ listActor: JSON.parse(jsonActor) });
          // let listActors = [];
          // for(const actorInput of JSON.parse(jsonActor)){
          //   let savedActor;
          //   let actor = await Actor.findOne({ name: actorInput.name});
          //   if (!actor)
          //     savedActor = await new Actor(actor).save();
          //   else
          //     savedActor = actor;
            
          //   checkExistActorInDrama(savedActor, drama);
          //   checkExistDramaInActor(savedActor, drama);

          //   let existActor = await Actor.findOne( { name: actor.name });
          //   if (!existActor){
          //     existActor = await new Actor(actor).save();
          //   }
          //   existActor.updateOne({ $push: {listDrama: drama._id}})
          //   listActors.push(existActor._id);
          // }
          // await drama.updateOne({ $set: {listActor: listActors} });
        }
        res.status(200).json("Updated successfully!");
      } 
      else
        res.status(200).json("Something wrong");
    // } 
    // catch (err) {
    //   res.status(500).json(err.msg);
    // }
  },


  //DELETE DRAMA
  delete: async (req, res) => {
    try {
      if (decode(req.body)){
        await Episode.updateMany({ drama: req.body["id"] }, { drama: null });
        await Drama.findByIdAndDelete(req.body["id"]);
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


async function checkExistActorInDrama(savedActor, drama){
  for (const actor of drama.listActor){
    if (savedActor.name == actor.name)
      return;
  }
  await drama.updateOne({ $push: {listActor: savedActor._id} });
}

async function checkExistDramaInActor(savedActor, drama){
  for (const drm of savedActor.listDrama.populate('listActor')){
    if (drama.name == drm.name)
      return;
  }
  await savedActor.updateOne({ $push: {listDrama: drama._id} });
}

module.exports = dramaController;