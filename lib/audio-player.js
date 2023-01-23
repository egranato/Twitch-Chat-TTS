const player = require('play-sound')(opts = {})
const sound = require("sound-play");
const fs = require('fs');

module.exports = (filePath) => {
  return new Promise((resolve, reject) => {
    sound.play(filePath).then(_ => {
      fs.unlinkSync(filePath);
      resolve();
    }).catch(_ => {
      fs.unlinkSync(filePath);
      resolve();
    });
  })
};
