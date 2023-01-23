const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const axios = require('axios').default;
const path = require('path');
const baseFolder = path.join(__dirname, 'tts-mp3');

module.exports = (text, locale = 'en-US') => {
  return new Promise((resolve, reject) => {
    const voices = ['female', 'male']; // voice options
    const voice = voices[Math.floor(Math.random() * 2)]; // get a random voice
    const url = `https://synthesis-service.scratch.mit.edu/synth?locale=${encodeURIComponent(locale)}&gender=${voice.toLowerCase()}&text=${encodeURIComponent(text).split('%20').join('+')}`; // make url
    const fileId = uuidv4(); // generate an id for this message
    const output = path.join(baseFolder, `${fileId}.mp3`); // create an output destination

    // open write stream
    const file = fs.createWriteStream(output, {
      autoClose: true,
    });

    // get mp3
    axios
      .get(url, { responseType: 'stream', referrerPolicy: "strict-origin-when-cross-origin" })
      .then(result => {
        result.data.pipe(file);

        file.on('finish', () => {
          // return destination
          resolve(output);
        });

        file.on('error', err => {
          // error and delete broken file
          fs.unlinkSync(output);
          reject(err);
        });
      })
      .catch(err => {
        // error and delete broken file
        fs.unlinkSync(output);
        reject(err);
      });
  });
};
