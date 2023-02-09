const mongoose = require("mongoose");
const Drama = require('./drama_model');

const actorSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    character:{
        type: String
    },
    role:{
        type: String
    },
    number:{
        type: Number
    },
    urlActor:{
        type: String
    },
    urlAvatar:{
        type: String
    },
});

let Actor = mongoose.model("Actor", actorSchema);

module.exports = Actor;