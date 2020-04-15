/*!
 * dist/authenticate.js
 * webapputils-ds (https://github.com/dstegen/webapputils-ds)
 * Copyright 2020 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapputils-ds/blob/master/LICENSE)
 */

'use strict';

const fs = require('fs');
const uuidv4 = require('uuid').v4;
const bcrypt = require('bcryptjs');

function login (passwdObj, myUserId, myPassword, sessionFilePath) {
  let sessionId = uuidv4();
  if (checkPasswd(passwdObj, myUserId, myPassword)) {
    let tmpObj = {};
    tmpObj[sessionId] = myUserId;
    let sessionsList = getSessionsList(sessionFilePath);
    sessionsList.push(tmpObj);
    updateSessionObj(sessionsList, sessionFilePath);
    return sessionId;
  } else {
    return undefined;
  }
}

function logout (sessionId, sessionFilePath) {
  let sessionsList = getSessionsList(sessionFilePath);
  if (sessionsList && sessionsList.some( item => item[sessionId])) {
    sessionsList.splice(sessionsList.indexOf(sessionsList.filter( item => item[sessionId])[0]),1);
    updateSessionObj(sessionsList, sessionFilePath);
    if (sessionsList.length < 1) {
      try {
        fs.unlinkSync(sessionFilePath);
      } catch (e) {
        console.log('ERROR deleting SessionObj: '+e);
      }
    }
  }
}

function loggedIn (sessionId, sessionFilePath) {
  let sessionsList = getSessionsList(sessionFilePath);
  if (sessionsList && sessionsList.some( item => item[sessionId])) {
    return true;
  } else {
    return false;
  }
}

function addPasswd (passwdObj, myUserId, myPassword) {
  try {
    passwdObj[myUserId] = bcrypt.hashSync(myPassword);
  } catch (e) {
    console.log('ERROR adding user and password: '+e);
  }
  return passwdObj;
}

function getUserId (sessionId, sessionFilePath) {
  try {
    return getSessionsList(sessionFilePath).filter( item => item[sessionId])[0][sessionId];
  } catch (e) {
    console.log('ERROR getting userId: '+e);
    return 'ERROR getting userId...';
  }
}


// Additional functions

function getSessionsList (sessionFilePath) {
  let sessionObj = { ids: [] };
  try {
    if (fs.existsSync(sessionFilePath)) {
      sessionObj =  JSON.parse(fs.readFileSync(sessionFilePath, 'utf8'));
    }
  } catch (e) {
    console.log('ERROR reading SessionObj: '+e);
  }
  return sessionObj.ids;
}

function updateSessionObj (sessionsList, sessionFilePath) {
  try {
    fs.writeFileSync(sessionFilePath, JSON.stringify({ ids: sessionsList }));
  } catch (e) {
    console.log('ERROR updating SessionObj: '+e);
  }
}

function checkPasswd (passwdObj, myUserId, myPassword) {
  if (passwdObj[myUserId]) {
    if (bcrypt.compareSync(myPassword, passwdObj[myUserId])) {
      return true;
    } else {
      return false;
    }
  } else {
      return false;
  }
}


module.exports = {login, logout, loggedIn, addPasswd, getUserId};
