/*!
 * dist/server.js
 * webapputils-ds (https://github.com/dstegen/webapputils-ds)
 * Copyright 2020 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapputils-ds/blob/master/LICENSE)
 */

'use strict';

 // Required modules
const WebSocket = require('ws');
const getIPs = require('./getIPs');


function server (callback, serverName='Server', port=8080, optPar='', serverOptions={}) {
  let server = '';
  if (serverOptions && serverOptions.key && serverOptions.cert) {
    let https = require('https');
    server = https.createServer(serverOptions, function (request, response) {
      callback(request, response, wss, port, optPar);
    }).listen(port, () => console.log(serverName+' is online: https://'+getMyIp()+':'+port));
  } else {
    let http = require('http');
    server = http.createServer( function (request, response) {
      callback(request, response, wss, port, optPar);
    }).listen(port, () => console.log(serverName+' is online: http://'+getMyIp()+':'+port));
  }
  const wss = new WebSocket.Server({
    server,
    clientTracking: true
  });
}


// Additional functions

function getMyIp () {
  let host = 'localhost';
  if (getIPs()['en0']) {
    host = getIPs()['en0'];
  } else if (getIPs()['wlo1']) {
    host = getIPs()['wlo1'];
  } else if (getIPs()['eth0']) {
    host = getIPs()['eth0'];
  }
  return host;
}


module.exports = server;
