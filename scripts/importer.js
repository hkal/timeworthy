#!/usr/bin/env node

const program = require('commander');
const request = require('superagent');
const GameImporter = require('../src/importer/GameImporter');

const importer = new GameImporter();

program
  .command('enqueue')
  .action(() => {
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
    importer.process();
  });

program.parse(process.argv);
