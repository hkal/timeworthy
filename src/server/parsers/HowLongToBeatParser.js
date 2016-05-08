'use strict';

const cheerio = require('cheerio');

class HowLongToBeatParser {
  static formattedTimeToInt(formattedTime) {
    let time = formattedTime.split(' ')[0];
    let unit = formattedTime.split(' ')[1];

    if (time === '--') {
      return time;
    }

    time = (time.indexOf('½') === -1) ? time = Number.parseInt(time) : time = Number.parseInt(time.slice(0, -1)) + 0.5;

    if (unit === 'Mins') {
      time = Number((time / 60).toFixed(2));
    }

    return time;
  }

  static parse(text) {
    if (typeof text !== 'string') {
      return new Error('This parser can only parse strings');
    }

    const $ = cheerio.load(text);
    const results = {};

    try {
      if ($('.global_padding')[0].children[0].data === 'No results for ') {
        return new Error('No result found');
      }
    } catch (error) {
      if (error.name !== 'TypeError') {
        return error;
      }
    }

    try {
      results.htbUrl = `http://howlongtobeat.com/${$('li .search_list_image a')[0].attribs.href}`;

      const gameType = $('li .search_list_details_block .search_list_tidbit:nth-child(1)')[0]
        .children[0]
        .data;

      if (gameType === 'Main Story' || gameType === 'Solo') {
        results.mainStoryTime = this.formattedTimeToInt($('li .search_list_details_block .search_list_tidbit:nth-child(2)')[0]
          .children[0]
          .data);

	return results;
      }
    } catch (error) {
      return error;
    }
  }
}

module.exports = HowLongToBeatParser;
