/*!
 * example/lib/api.js
 * webapputils-ds (https://github.com/dstegen/webapputils-ds)
 * Copyright 2021 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapputils-ds/blob/master/LICENSE)
 */

'use strict';

// Required Modules
const { getObj, updateItem, deleteItem } = require('./model');
const { uniSend, SendObj, Auth, getFormObj } = require('../../../webapputils-ds');
const { JWK } = require('jose');
const authenticate = new Auth();

let key = JWK.asKey({ kty: 'oct', k: 'hJtXIZ2uSN5kbQfbtTNWbpdmhkV8FJG-Onbc6mxCcYg' });
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
let obj = getObj();
let passwdObj = { 'Dani': '$2a$10$Lcj1Cq9ldWV4bKrnxzVHqe1uDQwvleEQi1V5pHBcWJqRQDulOFtFa' };


function api (request, response) {
  if (request.url === '/rest/login' && request.method === 'POST') {
    apiLogin(request, response);
  } else if (authenticate.jwtVerify(request.headers.token, key, optionsVerify) && request.url.startsWith('/rest/items')) {
    switch (request.method) {
      case 'GET':
        apiCatalogView(request, response);
        break;
      case 'POST':
        apiCatalogUpdate(request, response, request.method);
        break;
      case 'PUT':
        apiCatalogUpdate(request, response, request.method);
        break;
      case 'DELETE':
        apiCatalogDelete(request, response);
        break;
      default:
        uniSend(new SendObj(405), response);
    }
  }
   else {
    uniSend(new SendObj(401), response);
  }
}


// Additional functions

function apiLogin (request, response) {
  let pwArray = [];
  if (request.headers.authorization) {
    pwArray =  new Buffer.from(request.headers.authorization.split(' ')[1], 'base64').toString().split(':');
  }
  let token = authenticate.jwtLogin(passwdObj, pwArray[0], pwArray[1], { 'userId': pwArray[0] }, key, optionsSign);
  if (token != undefined) {
    let sendObj = new SendObj(200, [], 'application/json');
    sendObj.data = JSON.stringify({token: token});
    uniSend(sendObj, response);
  } else {
    uniSend(new SendObj(401), response);
  }
}

function apiCatalogView (request, response) {
  try {
    let sendObj = new SendObj(200, [], 'application/json');
    if (request.url.split('/')[3] > -1) {
      sendObj.data = JSON.stringify(getObj().filter( item => item.id == request.url.split('/')[3] )[0]);
    } else {
      sendObj.data = JSON.stringify({ catalog: getObj()});
    }
    uniSend(sendObj, response);
  } catch (e) {
    uniSend(new SendObj(500, [], 'application/json', '/', e), response);
  }
}

function apiCatalogUpdate (request, response, method) {
  getFormObj(request).then(
    data => {
      let sendObj = new SendObj(200, [], 'application/json');
      if (method === 'PUT' && request.url.split('/')[3] > -1) {
        data.fields.id = Number(request.url.split('/')[3]);
        obj = updateItem(obj, data.fields);
        sendObj.data = JSON.stringify(obj.filter( item => item.id === data.fields.id ));
        uniSend(sendObj, response);
      } else if (method === 'POST') {
        obj = updateItem(obj, data.fields);
        sendObj.statusCode = 201;
        sendObj.data = JSON.stringify(obj.filter( item => item.id === Math.max(...obj.map( item => item.id)) ));
        uniSend(sendObj, response);
      }
      uniSend(new SendObj(400), response);
    }
  ).catch(
    error => {
      //console.log('ERROR API can\'t update/add: '+error.message);
      uniSend(new SendObj(500, [], 'application/json', '/', error.message), response);
  });
}

function apiCatalogDelete (request, response) {
  try {
    let data = { fields: {} };
    data.fields.id = Number(request.url.split('/')[3]);
    if (obj.filter( item => item.id == request.url.split('/')[3] ).length === 1) {
      obj = deleteItem(obj, data.fields);
      uniSend( new SendObj(204), response);
    } else {
      uniSend( new SendObj(404), response);
    }
  } catch (e) {
    uniSend(new SendObj(500, [], 'application/json', '/', e), response);
  }
}


module.exports = api;
