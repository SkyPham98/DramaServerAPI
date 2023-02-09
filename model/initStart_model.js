const mongoose = require("mongoose");

const initStartSchema = new mongoose.Schema({
    Ads:{
        Bn: {
            "enable": Boolean,
            "unit": String
        },
        Tg: {
            "enable": Boolean,
            "unit": String
        },
        St: {
            "enable": Boolean,
            "unit": String
        },
        Ima: {
            "enable": Boolean,
            "unit": String
        },
    },
    StartNotify:{
        "enable": Boolean,
        "btnCancel": String,
        "btnOk": String,
        "imageUrl": String,
        "link": String,
        "message": String,
        "title": String,
    }
});

let InitStart = mongoose.model("InitStart", initStartSchema);

module.exports = InitStart;