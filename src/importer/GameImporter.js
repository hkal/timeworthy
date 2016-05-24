'use strict';

const request = require('superagent');
const AMQP = require('amqplib');
const GameModel = require('./../server/models/GameModel');
const HowLongToBeatParser = require('./../server/parsers/HowLongToBeatParser');

class GameImporter {
  constructor() {
    this.queueName = 'gametime';
    this.queue = AMQP.connect(
      process.env.CLOUDAMQP_URL || 'amqp://localhost'
    );
  }

  enqueue(games, done) {
    let gameCount = 0;

    for (let i = 0; i < games.length; i++) {
      this.queue
        .then((conn) => conn.createChannel())
        .then((channel) => {
          const q = this.queueName;

          return channel.assertQueue(q)
            .then((ok) => {
              const content = new Buffer(JSON.stringify(games[i]));
              return channel.sendToQueue(q, content);
            });
        })
        .then(() => {
          gameCount++;

          if (gameCount === games.length) {
            done();
          }
        });
    }
  }

  process() {
    this.queue
      .then((conn) => conn.createChannel())
      .then((channel) => {
        const q = this.queueName;

        return channel.assertQueue(q)
          .then((ok) => {
            return channel.consume(q, (message) => {
              if (message !== null) {
                const game = JSON.parse(message.content.toString());
                this.getHLTBData(game, message, channel.ack);
              }
            });
          });
      });
  }

  getHLTBData(game, message, done) {
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
              done(message);
            });
        } else {
          done(message);
        }
      });
  }
}

module.exports = GameImporter;
