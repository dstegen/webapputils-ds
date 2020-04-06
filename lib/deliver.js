/*!
 * lib/deliver.js
 * webapp-ds (https://github.com/dstegen/webapp-ds)
 * Copyright 2020 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapp-ds/blob/master/LICENSE)
 */


// Required Moduls
const fs = require('fs');
const path = require('path');
const mimetype = require('mimetype');
let sendObj = require('./sendObj');


function deliver (request) {
  let procDir = path.join(__dirname, '../');
  sendObj.contentType = mimetype.lookup(request.url.substr(1));
  sendObj = getMyFile(sendObj, path.join(procDir, request.url));
  return sendObj;
}

// Additional function
function getMyFile (sendObjLocal, pathLocal) {
  try {
    sendObjLocal.data = fs.readFileSync(pathLocal.split('?')[0]);
  } catch (e) {
    sendObjLocal.statusCode = 404;
    sendObjLocal.data = null;
  }
  return sendObjLocal;
}

module.exports = deliver;
