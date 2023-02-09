const decode = require("./decode");
const fs = require('fs-extra')
const Drama = require("../model/drama_model");
const Episode = require("../model/episode_model");
const updateDBController = require('../controllers/updateDBController');

const serverController = {
  getAll: async (req, res) => {
    // try {
      if (decode(req.body)){
        const path = '/var/www/html/kr/';
        const listFoldersName = await fs.promises.readdir(path);
        let jsonArray = [];
        for(const folderName of listFoldersName){
          const files = await fs.promises.readdir(path + folderName);
          const filteredFiles = files.filter((file) => !file.includes('.ts'));
          let json = {};
          for(const file of filteredFiles){
            if (file.substring(0,2) === "0-"){
              json.name = file.substring(2);
              syncDrama(json.name, folderName);          
            }
            else if (file.slice(-5) === ".m3u8"){
              const ep_number = file.replace(".m3u8", "");
              syncEpisode(json.name, ep_number);
              if (json.ep)
                json.ep = json.ep + "-" + ep_number;
              else
                json.ep = ep_number;
            }
            else if (file.slice(-4) === ".srt"){
              const lang_sub = file.replace(".srt", "");
              syncSub(json.name, lang_sub);
              if (json.sub) 
                json.sub = json.sub + "-" + lang_sub;
              else
                json.sub = lang_sub;
            }
          }
          jsonArray.push(json);
        }
        res.status(200).json(jsonArray);
      }
      else
        res.status(200).json("Something wrong");
    // } 
    // catch (err) {
    //     res.status(500).json(err);
    // }
  },
};

async function syncDrama(dramaName, folderName){
  let drama = await Drama.findOne( { name: dramaName });
  if (!drama){
    drama = await updateDBController.addNewDramaDB(dramaName, '');
    if (drama && drama._id.toString() != folderName){
      const oldFolder = '/var/www/html/kr/' + folderName;
      const newFolder = '/var/www/html/kr/' + drama._id.toString();
      fs.move(oldFolder, newFolder, { overwrite: true }, (err) => {
        if (err) return console.error(err);
        console.log('Rename folder: ' + oldFolder + ' -> ' + newFolder);
      });    
      console.log('syncDrama: ' + drama.name);
    }
  }
}

async function syncSub(dramaName, lang_sub){
  const arrSub = lang_sub.split(" ");
  const ep_number = arrSub[0];
  const episode = await Episode.findOne( { name: dramaName, epNumber: ep_number });
  if (!episode) return;
  if (episode.listSub){
    for (const lang of episode.listSub){
      if (lang == lang_sub) {
        return;
      }
    }
    await episode.updateOne({$push: {listSub: lang_sub}})  //Update Drama ListEp
    console.log('syncSub: ' + dramaName + ' - ' + lang_sub);
  }

}


async function syncEpisode(dramaName, ep_number){
  const drama = await Drama.findOne( {name: dramaName});
  const episode = await Episode.findOne( {name: dramaName, epNumber: ep_number});
  if (drama && !episode){
    updateDBController.addEpisodeDB(dramaName, ep_number);
    console.log('syncEpisode: ' + dramaName + ' - ' + ep_number);
  }
}


module.exports = serverController;