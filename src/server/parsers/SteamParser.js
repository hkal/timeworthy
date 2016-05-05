'use strict';

class SteamParser {
  static parse(pattern) {
    const currentPrice = Number((pattern.price_overview.final * 0.01).toFixed(2));

    // TODO: handle price localization
    const currentPriceFormatted = `$${currentPrice}`;

    return {
      price: currentPrice,
      priceFormatted: currentPriceFormatted,
      image: pattern.header_image
    };
  }
}

module.exports = SteamParser;
