'use strict';

const GameModel = require('../models/GameModel');
const SteamParser = require('../parsers/SteamParser');

class SearchController {
  static handler(request, reply) {
    const query = request.query.q;
    const from = request.query.from;

    if (!query) {
      reply([]);
    }

    GameModel
      .search(query, from)
      .then((response, error) => {
        const searchResults = response.hits.hits.map((result) => {
          return result._source;
        });

        GameModel
          .getSteamData(searchResults)
          .then((responses) => {
            let validResponses = [];
            const payload = searchResults
              .filter((value, index) => {
                const steamData = responses[index].body[value.steamId].data;

                if (steamData === undefined || steamData.price_overview === undefined) {
                  return false;
                }

                validResponses.push(responses[index]);
                return true;
              })

            payload
              .map((value, index) => {
                const steamData = validResponses[index].body[value.steamId].data;
                const gameData = Object.assign(value, SteamParser.parse(steamData));

                const pricePerHour = (gameData.price / gameData.mainStoryTime);
                gameData.pricePerHour = (Math.floor(100 * pricePerHour) / 100).toFixed(2);
                gameData.pricePerHourFormatted = '$' + gameData.pricePerHour;
                // importer should format this
                gameData.mainStoryTimeFormatted = (gameData.mainStoryTime === 1) ?
                  gameData.mainStoryTime + ' hour' : gameData.mainStoryTime + ' hours';

                return gameData;
              });

            reply(payload);
          });
      });
  }
}

module.exports = SearchController;
