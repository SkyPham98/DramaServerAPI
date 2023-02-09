const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
    {
        add_status: {
            type: Boolean,
        },
        content_type: {
            type: String,
        },
        country:{
            type: String,
        },
        cover:{
            type: String,
        },
        duration:{
            type: Number,
        },
        episode_number:{
            type: Number,
        },
        genres:{
            type: String,
        },
        id:{
            type: Number,
        },
        original_release_date:{
            type: Number,
        },
        permalink:{
            type: String,
        },
        popularity:{
            type: Number,
        },
        ranking:{
            type: Number,
        },
        rating:{
            type: Number,
        },
        released_at:{
            type: Number,
        },
        rid:{
            type: Number,
        },
        synopsis:{
            type: String,
        },
        thumbnail:{
            type: String,
        },
        timezone:{
            type: String,
        },
        title:{
            type: String,
        },
        type:{
            type: String,
        },
        url:{
            type: String,
        },
    }
);

let Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;