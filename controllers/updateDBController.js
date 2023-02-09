const Drama = require("../model/drama_model");
const Episode = require("../model/episode_model");
const Schedule = require("../model/schedule_model");
const fs = require('fs');

const updateDBController = {
    addEpisodeDB: async (dramaName, ep_number) => {
      let drama = await Drama.findOne( { name: dramaName });
      if (drama){
        let episode = new Episode();
        for(const ep in drama.listEp){
          if (ep.epNumber === ep_number){
              episode._id = ep._id;
              break;
          }
        }
        episode.name = drama.name;
        episode.name_vi = drama.name_vi;
        episode.epNumber = ep_number;
        episode.lastTime = new Date();
        episode.urlPoster = drama.urlPoster;
        episode.dramaID = drama._id;

        const dramaSchedule = await Schedule.findOne( {title: drama.name});
        if (dramaSchedule){
          drama.score = dramaSchedule.rating;
        }
        const saved = await episode.save(); //Add new Episode
        await drama.updateOne({$push: {listEp: saved._id}}); //Update Drama ListEp
      } 
      else {
        if (await updateDBController.addNewDramaDB(dramaName,'')){
            updateDBController.addEpisodeDB(dramaName, ep_number);
            console.log("Creating new Drama...");
          }
      }
    },

    addNewDramaDB: async (dramaName, dramaName_vi) => {
      const dramaSchedule = await Schedule.findOne( {title: dramaName});
      if (dramaSchedule){
        let drama = new Drama();
        drama.name = dramaName;
        drama.name_vi = dramaName_vi;
        drama.country = dramaSchedule.country;
        drama.synopsis = dramaSchedule.synopsis;
        drama.score = dramaSchedule.rating;
        drama.type = dramaSchedule.type;
        drama.urlActors = "https://mydramalist.com" + dramaSchedule.url + "/cast";
        drama.urlPoster = dramaSchedule.cover;
        drama.urlServer1 = '';
        drama.urlServer2 = '';

        const saved = await drama.save(); //Add new Drama

        const folderPath = '/var/www/html/kr/' + saved._id;
        if (!fs.existsSync(folderPath))
          fs.mkdirSync(folderPath);
        const filePath = folderPath + '/0-' + dramaName;
        fs.writeFileSync(filePath,'');

        console.log('addNewDramaDB ' + saved.name);
        return saved;
      } 
      else
        return null;
    },

    updateRating: async (drama) => {
      const dramaSchedule = await Schedule.findOne( {title: drama.name});
      if (dramaSchedule){
        drama.score = dramaSchedule.rating;
      }
      return drama;
    },

    getListFilesServer: async (req, res) => {
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
              }
              else if (file.slice(-5) === ".m3u8"){
                const ep_number = file.replace(".m3u8", "");
                if (json.ep) 
                  json.ep = json.ep + "-" + ep_number;
                else
                  json.ep = ep_number;
              }
              else if (file.slice(-4) === ".srt"){
                const lang_sub = file.replace(".srt", "");
                if (json.sub) 
                  json.sub = json.sub + "-" + lang_sub;
                else
                  json.sub = lang_sub;
              }
            }
            jsonArray.push(json);
          }
          return jsonArray;
        }
        else
          return false;
    },


  };
  
module.exports = updateDBController;
