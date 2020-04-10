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
const viewEdit = require('./viewEdit');
const view = require('./view');
const SendObj = require('./SendObj');
const { initObj, getObj, updateItem, deleteItem } = require('./model');
let obj = getObj();

let passwd = { 'dani': '$2a$10$Lcj1Cq9ldWV4bKrnxzVHqe1uDQwvleEQi1V5pHBcWJqRQDulOFtFa' };
let sessionFilePath = path.join(path.resolve(), 'sessionids.json');


function webView (request, response, wss, wsport) {
  if (authenticate.loggedIn(cookie(request).sessionid, sessionFilePath)) {
    uniSend(view(wsport, obj), response);
  } else {
    uniSend(viewLogin(), response);
  }
}

function login (request, response, wss) {
  getFormObj(request).then(
    data => {
      //console.log(data.fields);
      uniSend(new SendObj(302, ['sessionid='+authenticate.login(passwd, data.fields.username, data.fields.password, sessionFilePath)]), response);
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

function editAction (request, response, wss) {
  if (authenticate.loggedIn(cookie(request).sessionid, sessionFilePath)) {
    getFormObj(request).then(
      data => {
        //console.log(data.fields);
        let itemObj = {};
        Object.keys(obj[0]).forEach((key, i) => {
          itemObj[key] = '';
        });
        if (data.fields.id) itemObj = obj.filter( item => item.id == Number(data.fields.id))[0];
        uniSend(viewEdit(itemObj), response);
      }
    ).catch(
      error => {
        console.log('ERROR can\'t edit: '+error.message);
    });
  } else {
    uniSend(viewLogin(), response);
  }
}

function updateAction (request, response, wss) {
  if (authenticate.loggedIn(cookie(request).sessionid, sessionFilePath)) {
    getFormObj(request).then(
      data => {
        //console.log(data.fields);
        obj = updateItem(obj, data.fields);
      }
    ).catch(
      error => {
        console.log('ERROR can\'t update/add: '+error.message);
    });
    uniSend(new SendObj(302), response);
  } else {
    uniSend(viewLogin(), response);
  }
}

function deleteAction (request, response, wss) {
  if (authenticate.loggedIn(cookie(request).sessionid, sessionFilePath)) {
    getFormObj(request).then(
      data => {
        obj = deleteItem(obj, data.fields);
      }
    ).catch(
      error => {
        console.log('ERROR can\'t delete item: '+error.message);
    });
    uniSend(new SendObj(302), response);
  } else {
    uniSend(viewLogin(), response);
  }
}

module.exports = {webView, login, logout, editAction, updateAction, deleteAction};
