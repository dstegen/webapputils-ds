/*!
 * dist/uniSend.js
 * webapputils-ds (https://github.com/dstegen/webapputils-ds)
 * Copyright 2020 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapputils-ds/blob/master/LICENSE)
 */

'use strict';

function uniSend(sendObj, response) {
  if (sendObj == undefined || typeof sendObj !== 'object') {
    sendObj = {};
    sendObj.statusCode = 500;
  }
  if (sendObj.statusCode == undefined) sendObj.statusCode = 200;
  if (sendObj.location == undefined) sendObj.location = '/';
  if (sendObj.contentType == undefined) sendObj.contentType = 'text/html; charset=UTF-8';
  if (sendObj.cookie == undefined) sendObj.cookie = [];
  if (sendObj.data == undefined) sendObj.data = '';
  try {
    response.writeHead(sendObj.statusCode, {
      location: sendObj.location,
      'content-type': sendObj.contentType,
      'set-cookie': sendObj.cookie });
    response.end(sendObj.data);
  } catch (e) {
    console.log('ERROR sending response: ' + e);
  }
}

module.exports = uniSend;
