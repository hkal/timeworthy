'use strict';

const co = require('co');
const elasticsearch = require('elasticsearch').Client({
  host: 'localhost:9200'
});
const request = require('superagent');

const indexName = 'gametime'
const steamURL = 'http://store.steampowered.com/api/appdetails?appids='

class GameModel {
  static search(query, from) {
    return elasticsearch.search({
      index: indexName,
      q: 'title:' + query,
      size: 10,
      from: from
    });
  }

  static add(game) {
    return elasticsearch.index({
      id: game.steamId,
      index: indexName,
      type: 'game',
      body: game
    });
  }

  static getSteamData(games) {
    const fn = co.wrap(function* (collection) {
      let promises = [];

      for (let i = 0; i < collection.length; i++) {
        const steamId = collection[i].steamId
        const r = request
          .get(steamURL + steamId);

        promises.push(r);
      }

      return yield promises;
    });

    return fn(games);
  }
}

module.exports = GameModel;
