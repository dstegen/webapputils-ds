/*!
 * example/views/viewEdit.js
 * webapputils-ds (https://github.com/dstegen/webapputils-ds)
 * Copyright 2020 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapputils-ds/blob/master/LICENSE)
 */

const {SendObj} = require('../../../webapputils-ds');

function viewEdit (itemObj) {
  let sendObj = new SendObj();
  sendObj.data = `
  <!DOCTYPE HTML>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <!-- Bootstrap, jquery and CSS -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
      <style>
        a, a:hover {
          text-decoration: none;
        }
      </style>
      <title>webapputils-ds</title>
    </head>
    <body>
      <main class="container p-5 h-100">
        <h1>Edit/add item</h1>
        <form action="/update" method="post">
          <input type="text" name="id" class="d-none" hidden value="${itemObj.id}" />
          ${formInputs(itemObj)}
          <input type="submit" class="btn btn-sm btn-primary" value="add/update" />
        </form>
        <hr />
        <div class="d-flex justify-content-end">
          <a href="/" class="btn btn-sm btn-secondary">cancle</a>
        </div>
      </main>
      <!-- jQuery first, then Bootstrap bundled JS -->
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
    </body>
  </html>
  `;
  return sendObj;
}


// Additional functions

function formInputs (itemObj) {
  let returnHtml = ''
  if (Object.keys(itemObj).length > 0) {
    Object.keys(itemObj).forEach( key => {
      if (key !== 'id') {
        returnHtml += `<input type="text" class="mr-3" name="${key}" value="${itemObj[key]}" placeholder="${key}" />`;
      }
    });
  }
  return returnHtml;
}

module.exports = viewEdit;
