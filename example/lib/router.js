/*!
 * example/lib/router.js
 * webapputils-ds (https://github.com/dstegen/webapputils-ds)
 * Copyright 2020 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapputils-ds/blob/master/LICENSE)
 */

'use strict';

// Required modules
const path = require('path');
const {deliver} = require('../../../webapputils-ds');
const {webView, login, logout, editAction, updateAction, deleteAction} = require('./controller');


function router (request, response, wss, wsport, devmode) {
  let staticPath = path.join(__dirname, '../../../');
  if (devmode) staticPath = path.join(__dirname, '../../');
  let route = request.url.substr(1).split('?')[0];
  if (request.url.includes('media') || request.url.includes('node_modules') || request.url.includes('public') || request.url.includes('favicon')) route = 'static';
  switch (route) {
    case 'static':
      deliver(request, response, staticPath);
      break;
    case 'login':
      login(request, response, wss);
      break;
    case 'logout':
      logout(request, response, wss);
      break;
    case 'edit':
      editAction(request, response, wss);
      break;
    case 'update':
      updateAction(request, response, wss);
      break;
    case 'delete':
      deleteAction(request, response, wss);
      break;
    default:
      webView(request, response, wss, wsport)
  }
}

 module.exports = router;
