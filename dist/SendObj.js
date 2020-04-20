/*!
 * dist/SendObj.js
 * webapputils-ds (https://github.com/dstegen/webapputils-ds)
 * Copyright 2020 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapputils-ds/blob/master/LICENSE)
 */

'use strict';

class SendObj {
  constructor (statusCode = 200, cookie = [], contentType = 'text/html; charset=UTF-8', location = '/', data='') {
    this._statusCode = statusCode;
    this._contentType = contentType;
    this._cookie = cookie;
    this._location = location;
    this._data = data;
  }

  get statusCode () {
    return this._statusCode;
  }

  set statusCode (statusCode) {
    this._statusCode = statusCode;
  }

  get contentType () {
    return this._contentType;
  }

  set contentType (contentType) {
    this._contentType = contentType;
  }

  get cookie () {
    return this._cookie;
  }

  set cookie (cookie) {
    this._cookie = cookie;
  }

  get location () {
    return this._location;
  }

  set location (location) {
    this._location = location;
  }

  get data () {
    return this._data;
  }

  set data (data) {
    this._data = data;
  }
}

module.exports = SendObj;
