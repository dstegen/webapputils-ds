/*!
 * lib/controller.js
 * webapp-ds (https://github.com/dstegen/webapp-ds)
 * Copyright 2020 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapp-ds/blob/master/LICENSE)
 */

const path = require('path');
const cookie = require('./cookie');
const uniSend = require('./uniSend');
const deliver = require('./deliver');
const getFormObj = require('./getFormObj');
const authenticate = require('./authenticate');
const viewLogin = require('./viewLogin');
const view = require('./view');
let sendObj = require('./sendObj');

let passwd = { 'dani': '$2a$10$Lcj1Cq9ldWV4bKrnxzVHqe1uDQwvleEQi1V5pHBcWJqRQDulOFtFa' };
let sessionFilePath = path.join(path.resolve(), 'sessionids.json');

function controller (request, response, wss, wsport) {
  let route = request.url.substr(1).split('?')[0];
  if (authenticate.loggedIn(cookie(request).sessionid, sessionFilePath) && route !== 'logout') route = 'html';
  if (request.url.includes('media') || request.url.includes('node_modules') || request.url.includes('public')) route = 'deliver';
  console.log(route);
  switch (route) {
    case 'deliver':
      uniSend(deliver(request),response);
      break;
    case 'login':
      getFormObj(request).then(
        data => {
          console.log(data.fields);
          uniSend(sendObj(302, ['sessionid='+authenticate.login(passwd, data.fields.name, data.fields.password, sessionFilePath)]), response);
        }
      ).catch(
        error => {
          console.log('ERROR login: '+error.message);
      });
      break;
    case 'logout':
      authenticate.logout(cookie(request).sessionid, sessionFilePath)
      uniSend(sendObj(302, ['sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;']), response);
      break;
    case 'html':
      uniSend(view(wsport), response);
      break;
    default:
      uniSend(viewLogin(), response);
  }
}

module.exports = controller;
