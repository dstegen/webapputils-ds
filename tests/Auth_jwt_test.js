/*!
 * tests/Auth_jwt_test.js
 * webapputils-ds (https://github.com/dstegen/webapputils-ds)
 * Copyright 2021 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapputils-ds/blob/master/LICENSE)
 */

'use strict';

// Required Modules
const assert = require('assert');
const path = require('path');
const {JWK} = require('jose');
const Auth = require('../dist/Auth');

const authenticate = new Auth(path.join(__dirname, 'sessiontest.json'));
let passwdObj = authenticate.addPasswd({}, 'test@danielstegen.de', '123');
let key = JWK.asKey({
  kty: 'oct',
  k: 'hJtXIZ2uSN5kbQfbtTNWbpdmhkV8FJG-Onbc6mxCcYg'
});
let payload = {userId: 'test@danielstegen.de'}
let optionsSign = {
  audience: ['user:backend'],
  expiresIn: '1 hour',
  header: {
    typ: 'JWT'
  },
  issuer: 'localhost'
};
let optionsVerify = {
  audience: ['user:backend'],
  issuer: 'localhost'
}

// Test sign
let token = authenticate.jwtLogin(passwdObj, 'test@danielstegen.de', '123', payload, key, optionsSign);
assert.strictEqual(undefined, authenticate.jwtLogin(passwdObj, 'test@danielstegen.de', '456', payload, key, optionsSign));

// Test verify
assert.strictEqual(true, authenticate.jwtVerify(token, key, optionsVerify));
assert.strictEqual(false, authenticate.loggedIn('a57671fc-1535-4927-a9c4-9b097d823b1d', key, optionsVerify));
