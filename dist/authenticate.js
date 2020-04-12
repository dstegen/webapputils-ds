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

function login (passwdObj, myName, myPassword, sessionFilePath) {
  let sessionId = uuidv4();
  if (checkPasswd(passwdObj, myName, myPassword)) {
    let sessionObj = {};
    if (fs.existsSync(sessionFilePath)) {
      sessionObj = getSessionObj(sessionFilePath);
      sessionObj.ids.push(sessionId);
      updateSessionObj(sessionObj, sessionFilePath);
    } else {
      sessionObj = { ids: []};
      sessionObj.ids.push(sessionId);
      updateSessionObj(sessionObj, sessionFilePath);
    }
    return sessionId;
  } else {
    return undefined;
  }
}

function logout (sessionId, sessionFilePath) {
  let sessionObj = getSessionObj(sessionFilePath);
  if (sessionObj.ids.includes(sessionId)) {
    sessionObj.ids.splice(sessionObj.ids.indexOf(sessionId));
    updateSessionObj(sessionObj, sessionFilePath);
    if (sessionObj.ids.length < 1) {
      try {
        fs.unlinkSync(sessionFilePath);
      } catch (e) {
        console.log('ERROR deleting SessionObj: '+e);
      }
    }
  }
}

function loggedIn (sessionId, sessionFilePath) {
  let sessionObj = getSessionObj(sessionFilePath);
  if (sessionObj.ids && sessionObj.ids.includes(sessionId)) {
    return true;
  } else {
    return false;
  }
}

function addPasswd (passwdObj, myName, myPassword) {
  passwdObj[myName.toLowerCase()] = bcrypt.hashSync(myPassword);
  return passwdObj;
}


// Additional functions

function getSessionObj (sessionFilePath) {
  let sessionObj = {};
  try {
    if (fs.existsSync(sessionFilePath)) {
      sessionObj = require(sessionFilePath);
    }
  } catch (e) {
    console.log('ERROR reading SessionObj: '+e);
  }
  return sessionObj;
}

function updateSessionObj (sessionObj, sessionFilePath) {
  try {
    fs.writeFileSync(sessionFilePath, JSON.stringify(sessionObj));
  } catch (e) {
    console.log('ERROR updating SessionObj: '+e);
  }
}

function checkPasswd (passwdObj, myName, myPassword) {
  if (passwdObj[myName.toLowerCase()]) {
    if (bcrypt.compareSync(myPassword, passwdObj[myName.toLowerCase()])) {
      return true;
    } else {
      return false;
    }
  } else {
      return false;
  }
}


module.exports = {login, logout, loggedIn, addPasswd};
