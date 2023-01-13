/*!
 * tests/Auth_test.js
 * webapputils-ds (https://github.com/dstegen/webapputils-ds)
 * Copyright 2021 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapputils-ds/blob/master/LICENSE)
 */

'use strict';

// Required Modules
const assert = require('assert');
const path = require('path');
const Auth = require('../dist/Auth');

const authenticate = new Auth(path.join(__dirname, 'sessiontest.json'));

let myTimeStamp = (new Date()).toString();
let passwdObj = authenticate.addPasswd({}, 'test@danielstegen.de', '123');
let sessionId = authenticate.login(passwdObj, 'test@danielstegen.de', '123', myTimeStamp);


// Test login
assert.strictEqual(true, isUUID(sessionId));
assert.strictEqual(undefined, authenticate.login(passwdObj, 'test@danielstegen.de', '456'));

// Test loggedIn
assert.strictEqual(true, authenticate.loggedIn(sessionId));
assert.strictEqual(false, authenticate.loggedIn('a57671fc-1535-4927-a9c4-9b097d823b1d'));

// Test getUserId
assert.strictEqual('test@danielstegen.de', authenticate.getUserId(sessionId));

// Test getUserTimeStamp
assert.strictEqual(myTimeStamp, authenticate.getUserTimeStamp(sessionId));

// Test logout
assert.strictEqual(undefined, authenticate.logout(sessionId));


// Additional functions

function isUUID ( uuid ) {
  let s = "" + uuid;
  s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
  if (s === null) {
    return false;
  }
  return true;
}
