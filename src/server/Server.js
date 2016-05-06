'use strict';

const Hapi = require('hapi');
const vision = require('vision');
const swig = require('swig');
const inert = require('inert');
const path = require('path');

const DocumentController = require('./controllers/DocumentController');
const SearchController = require('./controllers/SearchController');

const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: '3000'
});

server.register(vision, (e) => {
  server.views({
    engines: { html: swig },
    relativeTo: __dirname,
    path: 'views'
  });
});

server.register(inert, (e) => {
  server.route({
    method: 'GET',
    path: '/static/{param*}',
    handler: {
      directory: {
        path: path.join(__dirname, 'static'),
        listing: true
      }
    }
  });
});

server.route({
  method: 'GET',
  path: '/search',
  handler: SearchController.handler
});

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: DocumentController.handler
});

module.exports = server;
