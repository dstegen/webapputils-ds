/*!
 * example/views/view.js
 * webapputils-ds (https://github.com/dstegen/webapputils-ds)
 * Copyright 2020 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapputils-ds/blob/master/LICENSE)
 */

// Required modules
const {SendObj} = require('../../../webapputils-ds');

function view (wsport, obj, msg='') {
  let sendObj = new SendObj();
  if (obj[0]) {
    sendObj.data = `
      <!DOCTYPE HTML>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <!-- Bootstrap, jquery and CSS -->
          <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.min.css">
          <link rel="stylesheet" href="/node_modules/webapputils/example/public/styles.css">
          <title>webapp-ds</title>
        </head>
        <body>
          <main class="container p-5 h-100">
            <h1>Hello World!</h1>
            <h3>${msg}</h3>
            <div class="table-responsive">
              <table border="1">
                <tr>
                  <th class="px-3 py-1 font-weight-bold">
                  ${Object.keys(obj[0]).join('</th><th class="px-3 py-1">')}
                </th>
                </tr>
                <tr>
                ${obj.map(tableRow).join('</tr><tr>')}
                </tr>
                <tr>
                  <td colspan="${Object.keys(obj[0]).length + 2}" class="px-3 py-1 text-right"><a href="/edit" class="btn-sm btn-success">add</a></td>
                </tr>
              </table>
            </div>
            <hr />
            <div class="d-flex justify-content-center">
              <a href="logout" class="btn-sm btn-secondary my-3 texte-right">logout</a>
            </div>
          </main>
          <!-- jQuery first, then Popper.js, then Bootstrap JS -->
          <script src="/node_modules/jquery/dist/jquery.min.js"></script>
          <script src="/node_modules/popper.js/dist/umd/popper.min.js"></script>
          <script src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
          <script src="/node_modules/webapputils/example/public/scripts.js"></script>
          <script>
          // Websockets
            const hostname = window.location.hostname ;
            const socket = new WebSocket('ws://'+hostname+':${wsport}/', 'protocolOne', { perMessageDeflate: false });
            socket.onopen =  function () {
              socket.onmessage = function (msg) {
                location.reload();
                console.log(msg.data);
              };
            };
          </script>
        </body>
      </html>
    `;
  }
  return sendObj;
}

function tableRow (item) {
  let returnHtml = '';
  Object.keys(item).forEach((key, i) => {
    returnHtml += `<td class="px-3 py-1">${item[key]}</td>`;
  });
  returnHtml += `
    <td class="px-3 py-1">
      <form id="delform" action="/delete" method="post">
        <input type="text" name="id" class="d-none" hidden value="${item.id}" />
        <input type="submit" class="btn-sm btn-danger" value="delete" />
      </form>
    </td>
    <td class="px-3 py-1">
    <form id="editform" action="/edit" method="post">
      <input type="text" name="id" class="d-none" hidden value="${item.id}" />
      <input type="submit" class="btn-sm btn-primary" value="edit" />
    </form>
    </td>
  `;
  return returnHtml;
}


module.exports = view;
