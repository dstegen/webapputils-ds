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
      <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.min.css">
      <link rel="stylesheet" href="/node_modules/webapputils/example/public/styles.css">
      <title>webapputils-ds</title>
    </head>
    <body>
      <main class="container p-5 h-100">
        <h1>Edit/add item</h1>
        <form action="/update" method="post">
          <input type="text" name="id" class="d-none" hidden value="${itemObj.id}" />
          ${formInputs(itemObj)}
          <input type="submit" class="btn-sm btn-primary" value="add/update" />
        </form>
        <hr />
        <div class="d-flex justify-content-end">
          <a href="/" class="btn-sm btn-secondary">cancle</a>
        </div>
      </main>
      <!-- jQuery first, then Popper.js, then Bootstrap JS -->
      <script src="/node_modules/jquery/dist/jquery.min.js"></script>
      <script src="/node_modules/popper.js/dist/umd/popper.min.js"></script>
      <script src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
      <script src="/node_modules/webapputils/example/public/scripts.js"></script>
    </body>
  </html>
  `;
  return sendObj;
}


// Additional functions

function formInputs (itemObj) {
  let returnHtml = ''
  if (Object.keys(itemObj).length > 0) {
    Object.keys(itemObj).forEach((key, i) => {
      if (key !== 'id') {
        returnHtml += `<input type="text" class="mr-3" name="${key}" value="${itemObj[key]}" placeholder="${key}" />`;
      }
    });
  }
  return returnHtml;
}

module.exports = viewEdit;
