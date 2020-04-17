/*!
 * example/index.js
 * webapputils-ds (https://github.com/dstegen/webapputils-ds)
 * Copyright 2020 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapputils-ds/blob/master/LICENSE)
 */

'use strict';

// Required modules
const {server} = require('../../webapputils-ds');
const router = require('./lib/router');

let devmode = false;
if (process.argv.includes('devmode=true')) {
	console.log('Entering developer mode...');
	devmode=true;
}

server(router, 'webapputils-ds example', 8080, devmode)
