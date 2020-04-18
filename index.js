/*!
 * index.js
 * webapputils-ds (https://github.com/dstegen/webapputils-ds)
 * Copyright 2020 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapputils-ds/blob/master/LICENSE)
 */

const authenticate = require('./dist/authenticate');
const cookie = require('./dist/cookie');
const deliver = require('./dist/deliver');
const getFormObj = require('./dist/getFormObj');
const getIPs = require('./dist/getIPs');
const SendObj = require('./dist/SendObj');
const uniSend = require('./dist/uniSend');
const Auth = require('./dist/Auth');
const ServerDS = require('./dist/ServerDS');
const ServerDSS = require('./dist/ServerDSS');

module.exports = { authenticate, cookie, deliver, getFormObj, getIPs, SendObj, uniSend, Auth, ServerDS, ServerDSS }
