/*!
 * lib/uniSend.js
 * webapp-ds (https://github.com/dstegen/webapp-ds)
 * Copyright 2020 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapp-ds/blob/master/LICENSE)
 */

function uniSend(sendObj, response) {
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
