#!/usr/bin/env node
'use strict';

const program = require('commander');
const request = require('superagent');
const GameImporter = require('../src/importer/GameImporter');

const importer = new GameImporter();
let executed = false;

program
  .command('enqueue')
  .action(() => {
    executed = true;
    request
      .get('http://api.steampowered.com/ISteamApps/GetAppList/v0001/')
      .end((error, response) => {
        const games = response.body.applist.apps.app;

        importer.enqueue(games, () => {
          process.exit();
        });
      });
  });

program
  .command('process')
  .action(() => {
    executed = true;
    importer.process();
  });

program.parse(process.argv);

if (!executed) {
  process.exit(1);
}
