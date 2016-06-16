'use strict';

const GameModel = require('../../models/GameModel');
const bundles = require('../bundles.json');

class DocumentController {
  static handler(request, reply) {
    GameModel
      .search('*', 0, 10000)
      .then((response, error) => {
        if (error) {
          return;
        }

        reply.view('index', {
          bundles,
          gameList: response.hits.hits.map((hit) => hit._source.title)
        });
      });
  }
}

module.exports = DocumentController;
