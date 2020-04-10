/*!
 * lib/deliver.js
 * webapp-ds (https://github.com/dstegen/webapp-ds)
 * Copyright 2020 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapp-ds/blob/master/LICENSE)
 */

'use strict';

// Required Moduls
const fs = require('fs');
const path = require('path');
const mimetype = require('mimetype');
const uniSend = require('./uniSend');
let SendObj = require('./SendObj');


function deliver (request, response) {
  let procDir = path.join(__dirname, '../');
  let sendObj = new SendObj();
  sendObj.contentType = mimetype.lookup(request.url.substr(1));
  sendObj = getMyFile(sendObj, path.join(procDir, request.url));
  uniSend(sendObj, response);
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
