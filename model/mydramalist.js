const mongoose = require("mongoose");

const mydramalistSchema = new mongoose.Schema({
    address:{
        type: String,
        require:true
    },
    origin:{
        type: String,
    },
    referer:{
        type: String,
    },
    userAgent:{
        type: String,
    }
});

let MydramalistSchema = mongoose.model("MyDramaList", mydramalistSchema);
module.exports = MydramalistSchema;