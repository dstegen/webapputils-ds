/*!
 * lib/controller.js
 * webapp-ds (https://github.com/dstegen/webapp-ds)
 * Copyright 2020 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapp-ds/blob/master/LICENSE)
 */

'use strict';

const path = require('path');
const cookie = require('./cookie');
const uniSend = require('./uniSend');
const getFormObj = require('./getFormObj');
const authenticate = require('./authenticate');
const viewLogin = require('./viewLogin');
const view = require('./view');
const SendObj = require('./SendObj');

let passwd = { 'dani': '$2a$10$Lcj1Cq9ldWV4bKrnxzVHqe1uDQwvleEQi1V5pHBcWJqRQDulOFtFa' };
let sessionFilePath = path.join(path.resolve(), 'sessionids.json');


function webView (request, response, wss, wsport) {
  if (authenticate.loggedIn(cookie(request).sessionid, sessionFilePath)) {
    uniSend(view(wsport), response);
  } else {
    uniSend(viewLogin(), response);
  }
}

function login (request, response, wss) {
  getFormObj(request).then(
    data => {
      //console.log(data.fields);
      uniSend(new SendObj(302, ['sessionid='+authenticate.login(passwd, data.fields.name, data.fields.password, sessionFilePath)]), response);
    }
  ).catch(
    error => {
      console.log('ERROR login: '+error.message);
  });
}

function logout (request, response, wss) {
  authenticate.logout(cookie(request).sessionid, sessionFilePath)
  uniSend(new SendObj(302, ['sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;']), response);
}

function updateModel (request, response, wss, wsport) {
  if (authenticate.loggedIn(cookie(request).sessionid, sessionFilePath)) {
    uniSend(view(wsport, 'Updated!'), response);
  }
  uniSend(new SendObj(302), response);
}

function addToModel (request, response, wss, wsport) {
  if (authenticate.loggedIn(cookie(request).sessionid, sessionFilePath)) {
    uniSend(view(wsport, 'Added!'), response);
  }
  uniSend(new SendObj(302), response);
}

function deleteInModel (request, response, wss, wsport) {
  if (authenticate.loggedIn(cookie(request).sessionid, sessionFilePath)) {
    uniSend(view(wsport, 'Deleted!'), response);
  }
  uniSend(new SendObj(302), response);
}

module.exports = {webView, login, logout, updateModel, addToModel, deleteInModel};
