const mongoose = require("mongoose");
const Episode = require('./episode_model');
const Actor = require('./actor_model');

const dramaSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    name_vi:{
        type: String,
    },
    listEp: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: Episode,
        },
    ],
    listComment: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: Episode,
        },
    ],
    listActor: [
        {
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
        },
    ],
    country:{
        type: String,
    },
    synopsis:{
        type: String,
    },
    maxEp:{
        type: Number,
    },
    score:{
        type: String,
    },
    type:{
        type: String,
    },
    urlActors:{
        type: String,
    },
    urlPoster:{
        type: String,
    },
    urlServer1:{
        type: String,
    },
    urlServer2:{
        type: String,
    },
});

let Drama = mongoose.model("Drama", dramaSchema);
module.exports = Drama;