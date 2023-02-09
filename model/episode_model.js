const mongoose = require("mongoose");
const Drama = require('./drama_model');

const episodeSchema = new mongoose.Schema({
    dramaID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Drama",
    },
    name:{
        type: String,
    },
    name_vi:{
        type: String,
    },
    epNumber:{
        type: Number,
    },
    listSub: [
        {
          type: String,
        },
    ],
    lastTime:{
        type: Number,
    },
    urlPoster:{
        type: String,
    },
});

let Episode = mongoose.model("Episode", episodeSchema);

module.exports = Episode;