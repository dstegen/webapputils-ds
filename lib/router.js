/*!
 * lib/router.js
 * webapp-ds (https://github.com/dstegen/webapp-ds)
 * Copyright 2020 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapp-ds/blob/master/LICENSE)
 */

const deliver = require('./deliver');
const {webView, login, logout, updateModel, addToModel, deleteInModel} = require('./controller');

function router (request, response, wss, wsport) {
  let route = request.url.substr(1).split('?')[0];
  if (request.url.includes('media') || request.url.includes('node_modules') || request.url.includes('public')) route = 'static';
  switch (route) {
    case 'static':
      deliver(request, response);
      break;
    case 'login':
      login(request, response, wss);
      break;
    case 'logout':
      logout(request, response, wss);
      break;
    case 'update':
      updateModel(request, response, wss, wsport);
      break;
    case 'add':
      addToModel(request, response, wss, wsport);
      break;
    case 'delete':
      deleteInModel(request, response, wss, wsport);
      break;
    default:
      webView(request, response, wss, wsport)
  }
}

 module.exports = router;
