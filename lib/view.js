/*!
 * lib/view.js
 * webapp-ds (https://github.com/dstegen/webapp-ds)
 * Copyright 2020 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapp-ds/blob/master/LICENSE)
 */

const SendObj = require('./SendObj');

function view (wsport) {
  let sendObj = new SendObj();
  sendObj.data = `
    <!DOCTYPE HTML>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <!-- Bootstrap, jquery and CSS -->
        <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="/public/styles.css">
        <title>webapp-ds</title>
      </head>
      <body>
        <main class="container p-5">
          <h1>Hello World!</h1>
        </main>
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="/node_modules/jquery/dist/jquery.min.js"></script>
        <script src="/node_modules/popper.js/dist/umd/popper.min.js"></script>
        <script src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="/public/scripts.js"></script>
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
  return sendObj;
}

module.exports = view;
