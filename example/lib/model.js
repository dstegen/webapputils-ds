/*!
 * lib/model.js
 * webapp-ds (https://github.com/dstegen/webapp-ds)
 * Copyright 2020 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapp-ds/blob/master/LICENSE)
 */

'use strict';

// Required modules
const fs = require('fs');
const path = require('path');

let obj = undefined;
const objPath = path.join(__dirname, '../data/mydata.json');

function initObj () {
  try {
    if (fs.existsSync(objPath)) {
      obj = require(objPath).data;
      return obj;
    } else {
      console.log('ERROR obj doesn\' exsists in path: '+objPath);
    }
  } catch (e) {
    console.log('ERROR loading obj: '+e);
  }
}

function getObj () {
  if (obj == undefined) {
    return initObj(objPath);
  } else {
    return obj;
  }
}

function updateItem (obj, fields) {
  if (fields.id && fields.id != '') {
    // update
    Object.keys(fields).forEach( key => {
      if (key !== 'id') {
        obj.filter(item => item.id == fields.id)[0][key] = fields[key];
      }
    });
    saveObj(obj);
    return obj;
  } else {
    // add
    let newItem = {};
    newItem.id = getNewId(obj);
    Object.keys(fields).forEach( key => {
      if (key !== 'id') {
        newItem[key] = fields[key];
      }
    });
    obj.push(newItem);
    saveObj(obj);
    return obj;
  }
}

function deleteItem (obj, fields) {
  obj = obj.filter( item => item.id != fields.id);
  saveObj(obj);
  return obj;
}


// Additional functions

function saveObj (obj) {
  try {
    if (!fs.existsSync(path.join(__dirname, '../backup'))) {
      fs.mkdirSync(path.join(__dirname, '../backup'));
    }
    fs.copyFileSync(objPath, path.join(__dirname, '../backup', 'data-backup_'+new Date()));
    fs.writeFileSync(objPath, JSON.stringify({ data: obj}));
  } catch (e) {
    console.log('ERROR backuping and saving file: '+e);
  }
}

function getNewId (obj) {
  return Math.max(...obj.map( item => item.id)) + 1;
}


module.exports = {initObj, getObj, updateItem, deleteItem}
