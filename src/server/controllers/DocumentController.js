'use strict';

const bundles = require('../bundles.json');

class DocumentController {
  static handler(request, reply) {
    reply.view('index', {
      bundles
    });
  }
}

module.exports = DocumentController;
