/*!
 * index.js
 * webapp-ds (https://github.com/dstegen/webapp-ds)
 * Copyright 2020 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapp-ds/blob/master/LICENSE)
 */

'use strict';

const http = require('http');
const WebSocket = require('ws');

const getIPs = require('./lib/getIPs');
const router = require('./lib/router');

let port = 8080;
let wsport = 8080;
let host = 'localhost';
if (getIPs()['en0']) {
	host = getIPs()['en0'];
} else if (getIPs()['wlo1']) {
	host = getIPs()['wlo1'];
} else if (getIPs()['eth0']) {
	host = getIPs()['eth0'];
	wsport = 80;
}
console.log('Available network devices: ');
console.log(getIPs());

const server = http.createServer( function (request, response) {
  router(request, response, wss, wsport);
}).listen(port, host, () => console.log('webapp-ds is online: http://'+host+':'+port+' (wsport:'+wsport+')'));

const wss = new WebSocket.Server({
	server,
	clientTracking: true
});

wss.on('connection', function connection(ws) {
	ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
});
