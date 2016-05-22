const request = require('superagent');
const GameImporter = require('./GameImporter');

request
  .get('http://api.steampowered.com/ISteamApps/GetAppList/v0001/')
  .end((error, response) => {
    const games = response.body.applist.apps.app;
    new GameImporter().enqueue(games, () => {
      process.exit();
    });
  });
