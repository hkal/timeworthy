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

    this.dequeue = this.dequeue.bind(this);
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
    setInterval(this.dequeue, 100);
  }

  getHLTBData(game, message, done) {
    const title = game.name;
    const steamId = game.appid;

    request
      .post('http://howlongtobeat.com/search_main.php?page=1')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send({queryString: title, t: 'games', sorthead: 'popular', sortd: 'Normal Order', detail: '0'})
      .end((error, query) => {
        if (error) {
          return;
        }

        const results = HowLongToBeatParser.parse(query.text);

        if (results !== undefined && !(Object.keys(results).length === 0)) {
          results.title = title;
          results.steamId = steamId;

          GameModel
            .add(results)
            .then((error, response) => {
              console.log(error);
              console.log(response);
              console.log(title + ' was indexed');
              done.ack(message);
            });
        } else {
          console.log(title + ' was not indexed');
          done.ack(message);
        }
      });
  }

  dequeue() {
    this.queue
      .then((conn) => conn.createChannel())
      .then((channel) => {
        const q = this.queueName;

        return channel.assertQueue(q)
          .then((ok) => {
            return channel
              .get(q)
              .then((message) => {
                if (message !== null && message.content) {
                  const game = JSON.parse(message.content.toString());
                  this.getHLTBData(game, message, channel);
                }
              });
          });
      });
  }
}

module.exports = GameImporter;
