'use strict';

const request = require('superagent');

const GameModel = require('./../server/models/GameModel');
const HowLongToBeatParser = require('./../server/parsers/HowLongToBeatParser');

class GameImporter {
  constructor(games, queue) {
    this.queue = queue;
    this.games = games;

    this.queue.process('game', 20, this.process);
  }

  start() {
    for (let i = 0; i < this.games.length; i++) {
      this.queue
        .create('game', this.games[i])
        .removeOnComplete(true)
        .save();
    }
  }

  process(job, done) {
    const game = job.data;
    const title = game.name;
    const steamId = game.appid;

    request
      .post('http://howlongtobeat.com/search_main.php?page=1')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send({queryString: title, t: 'games', sorthead: 'popular', sortd: 'Normal Order', detail: '0'})
      .end((error, query) => {
        const results = HowLongToBeatParser.parse(query.text);

        if (results !== undefined && !(Object.keys(results).length === 0)) {
          results.title = title;
          results.steamId = steamId;

          GameModel
            .add(results)
            .then((error, response) => {
              console.log(title + ' was successfully indexed: ' + response + '\n');
            });
        } else if (results !== undefined) {
          done(new Error('Could not add ' + title + '\n'));
          return;
        }

        done();
      });
  }
}

module.exports = GameImporter;
