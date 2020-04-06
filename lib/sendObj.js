/*!
 * lib/sendObj.js
 * webapp-ds (https://github.com/dstegen/webapp-ds)
 * Copyright 2020 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapp-ds/blob/master/LICENSE)
 */

function sendObj (statusCode, cookie) {
  if (statusCode == undefined) statusCode = 200;
  if (cookie == undefined) cookie = [];
  return {
    statusCode: statusCode,
    contentType: 'text/html; charset=UTF-8',
    cookie: cookie,
    location: '/',
    data: ''
  };
}

module.exports = sendObj;
