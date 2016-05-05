const request = require('superagent');
const kue = require('kue');

const GameImporter = require('./GameImporter');

request
  .get('http://api.steampowered.com/ISteamApps/GetAppList/v0001/')
  .end((error, response) => {
    const games = response.body.applist.apps.app;
    const queue = kue.createQueue();
    const importer = new GameImporter(games, queue).start();
  });
