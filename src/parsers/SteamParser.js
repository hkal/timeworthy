'use strict';

class SteamParser {
  static parse(pattern) {
    const price = Number((pattern.price_overview.initial * 0.01).toFixed(2));
    const salePrice = pattern.price_overview.discount_percent > 0 ?
      Number((pattern.price_overview.final * 0.01).toFixed(2)) : null;

    // TODO: handle price localization
    const priceFormatted = `$${price}`;
    const salePriceFormatted = pattern.price_overview.discount_percent > 0 ?
      `$${salePrice}` : null;

    return {
      price: price,
      priceFormatted: priceFormatted,
      salePrice: salePrice,
      salePriceFormatted: salePriceFormatted,
      image: pattern.header_image
    };
  }
}

module.exports = SteamParser;
