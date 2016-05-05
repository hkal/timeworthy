'use strict';

const assert = require('chai').assert;
const SteamParser = require('../../src/server/parsers/SteamParser');

describe('SteamParser', () => {
  const steamResponseStub = {
    price_overview: {
      currency: 'USD',
      initial: '1499',
      final: '1499',
      discount_percent: 0
    },
    header_image: 'http://i.imgur.com/4DDzfxa.jpg'
  };

  describe('#parse()', () => {
    it('should return price details', () => {
      const parsedData = SteamParser.parse(steamResponseStub);

      assert.strictEqual(parsedData.price, 14.99);
      assert.strictEqual(parsedData.priceFormatted, '$14.99');
    });

    it('should map header_image => image', () => {
      const headerImage = SteamParser.parse(steamResponseStub).image;

      assert.isString(headerImage);
    });
  });
});
