/*!
 * dist/getFormObj.js
 * webapputils-ds (https://github.com/dstegen/webapputils-ds)
 * Copyright 2021 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapputils-ds/blob/master/LICENSE)
 */

'use strict';

const formidable = require('formidable');


function getFormObj (req) {
  let formObj = {};
  let form = new formidable.IncomingForm();
	return new Promise((resolve, reject) => {
		form.parse(req, function (err, fields, files) {
			if (err) {
				reject(err);
			} else {
				formObj.fields = fields;
        formObj.files = files;
				resolve(formObj);
			}
    });
	});
}


module.exports = getFormObj;
