# How to use

## Install node 
(here)[https://nodejs.org/en/download/]

## Clone this app
Run `npm i`

## Get OAuth token
Go to (here)[https://twitchapps.com/tmi/] to get an OAuth token

## Set up .env file
Create a file named `.env` with these items filled out

```
BOT_NAME={your bot name} (optional)
TWITCH_CHANNEL={your twitch channel}
TWITCH_OAUTH=oauth:{your token}
```

## Run the app
`npm start`