/*!
 * dist/cookie.js
 * webapputils-ds (https://github.com/dstegen/webapputils-ds)
 * Copyright 2020 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapputils-ds/blob/master/LICENSE)
 */

'use strict';

function cookie (request) {
  let curCookie = {};
  if (request.headers.cookie) {
    request.headers.cookie.split(';').forEach( cookie => {
      curCookie[cookie.split('=')[0].replace(/\s/,'')] = cookie.split('=')[1];
    });
  }
  return curCookie;
}

module.exports = cookie;
