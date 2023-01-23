require('dotenv').config()
const express = require('express');
const TwitchBot = require('twitch-bot');
const censor = require('./censor');
const tts = require('./tts');
const playAudio = require('./audio-player');
const PromiseQueue = require('./promiseQueue');

const TWITCH_OAUTH = process.env.TWITCH_OAUTH;

const app = express();
const messageQueue = new PromiseQueue();

const triggerTTS = async (message) => {
  const cleanMessage = censor(message);

  tts(cleanMessage).then(messageMP3 => {
    playAudio(messageMP3);
  }).catch(error => {
    console.error(error);
  });
}

const bot = new TwitchBot({
  username: 'abirddad',
  oauth: TWITCH_OAUTH,
  channels: ['abirddad']
});

const sayInChat = (message) => {
  bot.say(message);
}

bot.on('join', channel => {
  console.log(`Joined channel: ${channel}`);
});

bot.on('error', error => {
  console.error(error);
});

bot.on('message', async chatter => {
  if (chatter.message) {
    console.log(`${chatter.mod || chatter.subscriber ? '->' : ''}${chatter.username}: ${chatter.message}`);
    messageQueue.add(triggerTTS(chatter.username + ' says ' + chatter.message));
  }
});

module.exports = app;