# webapputils-ds #
#### npm package with simple utils for making nodejs web apps programming more easy ####

## Installation ##

```
npm install webapputils-ds
```

## Use example ##

Start example with
```
node node_modules/webapputils-ds/example/index.js
```

**Example login credentials:**

Name: Dani

Password: 123

## Usage ##

```
const { cookie, SendObj, uniSend, getFormObj, authenticate, Auth } = require('webapputils-ds');
```

- **cookie(request)** returns the cookie-object, access cookie-properties like this:
```
cookie(request).sessionid
```
- **SendObj()** returns a new sendObj, you can use properties for statusCode and cookies and add the data later
```
let sendObj = new SendObj(302);  //redirect to '/'
let sendObj = new SendObj(302, [sessionid=1001]);  //redirect to '/' with sessionid in cookie
let sendObj = new SendObj();
sendObj.data = '<!DOCTYPE HTML><html lang="en"><body><h1>Hello World!</h1></body></html>'
```

- use **uniSend(sendObj, response)** for sending the response
```
uniSend(new SendObj(302, [sessionid=1001]), response);
uniSend(sendObj, response);
```

- **getFormObj(request)** returns a promise and the form fields and files in data object, use like this:
```
getFormObj(request).then(
  data => {
    uniSend(new SendObj(302, ['sessionid='+authenticate.login(passwd, data.fields.username, data.fields.password, sessionFilePath)]), response);
  }
).catch(
  error => {
    console.log('ERROR login: '+error.message);
});
```

- **authenticate** ***(deprecated)*** provides methods for authentication:
  - **passwdObj-format**: { 'userId': 'bcrypt(password)'}
  - ***authenticate.login(passwdObj, myUserId, myPassword, sessionFilePath)*** returns an uuid-v4 sessionid, if successful, otherwise *undefined*
  - ***authenticate.logout(sessionId, sessionFilePath)*** returns nothing
  - ***authenticate.loggedIn(sessionId, sessionFilePath)*** returns *true* if user is logged in, otherwise *false*
  - ***authenticate.addPasswd(passwdObj, myUserId, myPassword)*** returns passwdObj with new user and password added
  - ***authenticate.getUserId(sessionId, sessionFilePath)*** returns userId for logged in user with sessionId


- **Auth()** is the new class module for authentication, and will replace *authenticate*
```
const authenticate = new Auth(sessionFilePath);
```
```
authenticate.login(passwdObj, myUserId, myPassword); //returns an uuid-v4 sessionid if successful, otherwise undefined
authenticate.loggedIn(sessionId); //returns true if user is logged in, otherwise false
authenticate.getUserId(sessionId); //returns the userId, given in the login
authenticate.addPasswd(passwdObj, myUserId, myPassword); //returns passwdObj with new user and password added
authenticate.logout(sessionId); //returns nothing
```


## Changelog ##

#### v0.4.5 ###
- added new class module Auth.js for authentication
- added unit test for Auth.js module
- updated example with new Auth.js module
- old authenticate.js is marked as deprecated
- removed popper.js from dependencies

#### v0.4.4 ####
- important bug fix in authenticate

#### v0.4.3 ####
- improved authenticate module
- added authenticate.getUserId

#### v0.4.2 ####
- bug fix in authenticate module
- some code cleanup

## License Code ##

The MIT License (MIT)

Copyright (c) 2020 Daniel Stegen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Authors: Daniel Stegen

Email: info@danielstegen.de
