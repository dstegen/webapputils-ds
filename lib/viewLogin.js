/*!
 * viewLogin.js
 * webapp-ds (https://github.com/dstegen/webapp-ds)
 * Copyright 2020 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapp-ds/blob/master/LICENSE)
 */

const {SendObj} = require('../webapputils');

function viewLogin () {
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
       <title>familyChat</title>
     </head>
     <body>
       <div class="container p-5">
         <h1>Login</h1>
         <form id="login" action="/login" method="post">
           <input type="text" id="username" name="username" placeholder="Name" value="" required/>
           <input type="password" id="password" name="password" placeholder="Passwort" value="" required/>
           <input type="submit" class="btn-sm btn-primary" value="Login" />
         </from>
       </div>
       <!-- jQuery first, then Popper.js, then Bootstrap JS -->
       <script src="/node_modules/jquery/dist/jquery.min.js"></script>
       <script src="/node_modules/popper.js/dist/umd/popper.min.js"></script>
       <script src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
       <script src="/public/scripts.js"></script>
     </body>
   </html>
 `;
 return sendObj;
}

module.exports = viewLogin;
