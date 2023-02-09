const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
    Suggest:{
        "enable": Boolean,
        "appName": String,
        "btnAction": String,
        "tvTitle": String,
        "videoUrl": String,
    },
    Update:{
        "enable": Boolean,
        "appName": String,
        "changelog": String,
        "imageUrl": String,
        "link": String,
        "versionCode": Number,
        "versionName": String,
    }
});

let Settings = mongoose.model("Setting", settingSchema);

module.exports = Settings;