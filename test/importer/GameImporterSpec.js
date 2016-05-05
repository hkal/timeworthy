'use strict';

const assert = require('chai').assert;
const kue = require('kue');

const GameImporter = require('../../src/importer/GameImporter');
const queue = kue.createQueue();

describe('GameImporter', () => {
  describe('#constructor()', () => {
    it('should have 3 games', () => {
      const games = [
        {title: 'Game 1'},
        {title: 'Game 2'},
        {title: 'Game 3'}
      ];
      const importer = new GameImporter(games, queue);

      assert.strictEqual(importer.games.length, 3);
    });

    it('should have a queue', () => {
      const importer = new GameImporter([1], queue);

      assert.equal(importer.queue, queue);
    });
  });
});
