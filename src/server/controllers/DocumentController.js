'use strict';

const bundles = require('../bundles.json');

class DocumentController {
  static handler(request, reply) {
    reply.view('index', {bundles: bundles});
  }
}

module.exports = DocumentController;
