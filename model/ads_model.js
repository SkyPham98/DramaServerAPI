const mongoose = require("mongoose");

const bnSchema = new mongoose.Schema({
    enable:{
        type: Boolean,
        require:true
    },
    unit:{
        type: String,
    }
});

const imaSchema = new mongoose.Schema({
    enable:{
        type: Boolean,
        require:true
    },
    unit:{
        type: String,
    }
});

const stSchema = new mongoose.Schema({
    enable:{
        type: Boolean,
        require:true
    },
    unit:{
        type: String,
    }
});

const tgSchema = new mongoose.Schema({
    enable:{
        type: Boolean,
        require:true
    },
    unit:{
        type: String,
    }
});


const adsSchema = new mongoose.Schema({
    enable:{
        type: Boolean,
        require:true
    },
    bnSchema:{
        type: bnSchema,
    },
    imaSchema:{
        type: imaSchema,
    },
    stSchema:{
        type: stSchema,
    },
    tgSchema:{
        type: tgSchema,
    }
});


let Ads = mongoose.model("Ads", adsSchema);
module.exports = Ads;