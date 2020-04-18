/*!
 * dist/Auth.js
 * webapputils-ds (https://github.com/dstegen/webapputils-ds)
 * Copyright 2020 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapputils-ds/blob/master/LICENSE)
 */

'use strict';

//Required Modules
const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid').v4;
const bcrypt = require('bcryptjs');


class Auth {
  constructor (sessionFilePath=path.join(__dirname, '../sessionids.json')) {
    if (!path.isAbsolute(sessionFilePath)) throw new TypeError('ERROR sessionFilePath is incorrect!');
    this._sessionFilePath = sessionFilePath;
    this._sessionsList = [];
  }

  login (passwdObj, myUserId, myPassword) {
    let sessionId = uuidv4();
    if (checkPasswd(passwdObj, myUserId, myPassword)) {
      let tmpObj = {};
      tmpObj[sessionId] = myUserId;
      this._sessionsList = loadSessionsList(this._sessionFilePath);
      this._sessionsList.push(tmpObj);
      saveSessionsList(this._sessionsList, this._sessionFilePath);
      return sessionId;
    } else {
      return undefined;
    }
  }

  logout (sessionId) {
    this._sessionsList = loadSessionsList(this._sessionFilePath);
    if (this._sessionsList && this._sessionsList.some( item => item[sessionId])) {
      this._sessionsList.splice(this._sessionsList.indexOf(this._sessionsList.filter( item => item[sessionId])[0]),1);
      saveSessionsList(this._sessionsList, this._sessionFilePath);
    }
  }

  loggedIn (sessionId) {
    this._sessionsList = loadSessionsList(this._sessionFilePath);
    if (this._sessionsList && this._sessionsList.some( item => item[sessionId])) {
      return true;
    } else {
      return false;
    }
  }

  addPasswd (passwdObj, myUserId, myPassword) {
    try {
      if (myUserId !== '' && myPassword !== '' && myPassword !== undefined) {
        passwdObj[myUserId] = bcrypt.hashSync(myPassword);
      } else {
        return undefined;
      }
    } catch (e) {
      console.log('ERROR adding user and password: '+e);
    }
    return passwdObj;
  }

  getUserId (sessionId) {
    try {
      return loadSessionsList(this._sessionFilePath).filter( item => item[sessionId])[0][sessionId];
    } catch (e) {
      console.log('ERROR getting userId: '+e);
      return 'ERROR getting userId...';
    }
  }

}


// Additional functions

function loadSessionsList (sessionFilePath) {
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

function saveSessionsList (sessionsList, sessionFilePath) {
  if (sessionsList.length < 1) {
    try {
      fs.unlinkSync(sessionFilePath);
    } catch (e) {
      console.log('ERROR deleting SessionObj: '+e);
    }
  } else {
    try {
      fs.writeFileSync(sessionFilePath, JSON.stringify({ ids: sessionsList }));
    } catch (e) {
      console.log('ERROR updating SessionObj: '+e);
    }
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

module.exports = Auth;