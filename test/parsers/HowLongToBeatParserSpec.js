'use strict';

const assert = require('chai').assert;
const HowLongToBeatParser = require('../../src/parsers/HowLongToBeatParser');
const fixtures = require('./fixtures');

describe('HowLongToBeatParser', () => {
  describe('#parse()', () => {
    it('will only attempt to parse strings', () => {
      const error = HowLongToBeatParser.parse('')

      assert.notEqual(error.message, 'This parser can only parse strings');
      assert.equal(HowLongToBeatParser.parse({}).message, 'This parser can only parse strings');
    });

    it('should indicate no results from source', () => {
      const result = HowLongToBeatParser.parse(fixtures.noResult);

      assert.equal(result.message, 'No result found');
    });

    it('should handle minutes', () => {
      const result = HowLongToBeatParser.parse(fixtures.minutes);

      assert.strictEqual(result.mainStoryTime, 0.43);
    });

    it('should handle empty time value', () => {
      const result = HowLongToBeatParser.parse(fixtures.empty);

      assert.strictEqual(result.mainStoryTime, '--');
    });

    it('should include HowLongToBeat URL', () => {
      const result = HowLongToBeatParser.parse(fixtures.empty);

      assert.strictEqual(result.htbUrl, 'http://howlongtobeat.com/game.php?id=28161');
    });

    it('should parse single result properly', () => {
      const result = HowLongToBeatParser.parse(fixtures.singleResult);

      assert.strictEqual(result.mainStoryTime, 24);
      /*
      assert.strictEqual(result.mainExtrasTime, 33.5);
      assert.strictEqual(result.completionist, 53);
      assert.strictEqual(result.completionist, 31.5);
      */
    });

    it('should parse multi-result properly', () => {
      const result = HowLongToBeatParser.parse(fixtures.multiResult);

      assert.strictEqual(result.mainStoryTime, 45);
      /*
      assert.strictEqual(result.mainExtrasTime, 96.5);
      assert.strictEqual(result.completionist, 163);
      assert.strictEqual(result.completionist, 98);
      */
    });
  });
});

