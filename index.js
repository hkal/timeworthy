'use strict';

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const files = fs.readdirSync(path.join(__dirname, 'src/server/static/'));
const metaBundlePath = path.join(__dirname, 'src/server/bundles.json');
const bundles = {};

console.log(chalk.green('Starting Timeworthy'));

fs.unlinkSync(metaBundlePath);
console.log(leftPad('Deleted stale meta-bundle'));

// TODO: investigate why reduce() acts wonky
for (let i = 0; i < files.length; i++) {
  const filename = files[i];
  const filetype = filename.split('.').pop();
  const filepath = `/static/${filename}`;

  if (bundles[filetype]) {
    bundles[filetype].push(filepath);
  } else {
    bundles[filetype] = [filepath];
  }
}

fs.writeFileSync(metaBundlePath, JSON.stringify(bundles));
console.log(leftPad('Created fresh meta-bundle'));

const server = require('./src/server');

server.start((err) => {
  if (err) {
    console.warn('Error starting server');
    return;
  }

  console.log(chalk.green('Timeworthy is up and running'));
});

function leftPad(text) {
  return `    ${text}`;
}
