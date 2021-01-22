/*!
 * example/index.js
 * webapputils-ds (https://github.com/dstegen/webapputils-ds)
 * Copyright 2021 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapputils-ds/blob/master/LICENSE)
 */

'use strict';

// Required modules
const { ServerDS, ServerDSS } = require('../../webapputils-ds');
const router = require('./lib/router');

// Name the process
process.title = 'webapputils-ds example';

let devmode = false;
if (process.argv.includes('devmode=true')) {
	console.log('Entering developer mode...');
	devmode=true;
}

const server = new ServerDS('webapputils-ds example');
server.setCallback(router, devmode);
server.startServer();
