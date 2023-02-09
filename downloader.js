const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
// const helmet = require("helmet");
const dotenv = require("dotenv");
const ffmpeg = require('fluent-ffmpeg');
const updateDBController = require('./controllers/updateDBController');

////////////////////////////////
const m3u8Url = 'https://hls26.drafcdn.com/newvideos/newhls/U3ZAFN3PLyJQ0N3kClNoeg/1674206291/367421_125.212.156.136/7e0123542a8fcbaff46189a75004650e/ep.78.v2.1674175223.720.m3u8'; //required
const segmentsDir = '/var/www/html/kr/-NKWOF9bPLyPnPeQJu59/';
const dramaName = 'The Love in Your Eyes';
const ep_number = '78';
//////////////////////////////////

dotenv.config();
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL,)
        .then(()=>console.log('Connected database'))
        .catch(e=>console.log(e));

ffmpeg(m3u8Url, { timeout: 432000 }).addOptions([
    '-c copy',              // baseline profile (level 3.0) for H264 video codec
    '-hls_list_size 0',     // Maxmimum number of playlist entries (0 means all entries/infinite)
    '-preset ultrafast',
    '-f hls'])              // HLS format
  .output(segmentsDir + ep_number + '.m3u8')
  .on('progress', function(progress) { console.log(dramaName + " " + ep_number + ": " + progress.percent.toFixed(2) + ' % progress'); })
  .on('error', function(err, stdout, stderr) { console.log('ERROR: ' + err.message); })
  .on('end', callbackEnd)
  .run();

  function callbackEnd() { // do something when encoding is done 
    console.log("Download complete!");
    updateDBController.addEpisodeDB(dramaName, ep_number);
  };