const fs = require('fs');
const path = require('path');

const bannedWordsList = fs.readFileSync(path.join(__dirname, 'banned-words.txt')).toString();
const censorWordsList = fs.readFileSync(path.join(__dirname, 'censor-words.txt')).toString();

const bannedWords = Array.from(new Set(bannedWordsList.split(/\r?\n/)))
const censorWords = Array.from(new Set(censorWordsList.split(/\r?\n/)))

const reg = new RegExp(bannedWords.join("|"), "gi");

module.exports = (str) => {
  return str.replace(reg, _ => {
    const randomIndex = Math.floor(Math.random() * censorWords.length);
    return censorWords[randomIndex];
  });
}