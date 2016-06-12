'use strict';

const assert = require('chai').assert;
const SteamParser = require('../../src/parsers/SteamParser');

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

  const steamSaleResponseStub = {
    price_overview: {
      currency: 'USD',
      initial: '3999',
      final: '3399',
      discount_percent: 15
    },
    header_image: 'http://i.imgur.com/4DDzfxa.jpg'
  };

  describe('#parse()', () => {
    it('should return price details', () => {
      const parsedData = SteamParser.parse(steamResponseStub);

      assert.strictEqual(parsedData.price, 14.99);
      assert.strictEqual(parsedData.priceFormatted, '$14.99');
      assert.strictEqual(parsedData.salePrice, null);
      assert.strictEqual(parsedData.salePriceFormatted, null);
    });

    it('should account for price discounts', () => {
      const parsedData = SteamParser.parse(steamSaleResponseStub);

      assert.strictEqual(parsedData.price, 39.99);
      assert.strictEqual(parsedData.priceFormatted, '$39.99');
      assert.strictEqual(parsedData.salePrice, 33.99);
      assert.strictEqual(parsedData.salePriceFormatted, '$33.99');
    });

    it('should map header_image => image', () => {
      const headerImage = SteamParser.parse(steamResponseStub).image;

      assert.isString(headerImage);
    });
  });
});
