/*!
 * examples/views/viewLogin.js
 * webapputils-ds (https://github.com/dstegen/webapputils-ds)
 * Copyright 2021 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapputils-ds/blob/master/LICENSE)
 */

const {SendObj} = require('../../../webapputils-ds');

function viewLogin () {
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
       <div class="container p-5 d-flex justify-content-center">
        <div>
          <h1>Login</h1>
          <form id="login" action="/login" method="post">
            <input type="text" id="username" name="username" placeholder="Name" value="" required/>
            <input type="password" id="password" name="password" placeholder="Passwort" value="" required/>
            <input type="submit" class="btn btn-sm btn-primary" value="Login" />
          </from>
        </div>
       </div>
       <!-- jQuery first, then Bootstrap bundled JS -->
       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
     </body>
   </html>
 `;
 return sendObj;
}

module.exports = viewLogin;
