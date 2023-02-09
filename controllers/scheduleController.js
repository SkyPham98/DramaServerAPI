const Drama = require("../model/drama_model");
const Schedule = require("../model/schedule_model");
const decode = require("./decode");

const scheduleController = {
  addAll: async (req, res) => {
    try {
      if (decode(req.body) && req.body["list"] != null){
        await Schedule.deleteMany();
        for(const element of JSON.parse(req.body["list"])){
          const newSchedule = new Schedule(element);
          await newSchedule.save();
        }
        res.status(200).json("Update Complete!");
      } 
      else
        res.status(200).json("Something wrong");
    } 
    catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  //GET ALL SCHEDULE
  getAll: async (req, res) => {
    try {
      if (decode(req.body)){
        const schedule = await Schedule.find();
        res.status(200).json(schedule);
      } else
        res.status(200).json("Something wrong");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = scheduleController;