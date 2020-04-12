# webapputils-ds #
#### simple utils for making nodejs web apps programming more easy ####

## Installation ##

```
npm install webapputils-ds
```

## Example ##

Start example with
```
node node_modules/webapputils-ds/example/index.js
```

**Example login credentials:**

Name: Dani

Password: 123

## Usage ##

```
const { cookie, SendObj, uniSend, getFormObj, authenticate } = require('webapputils-ds');
```

- **cookie(request)** returns the cookie-object, access cookie-properties like this:
```
cookie(request).sessionid
```
- **SendObj()** returns a new sendObj, you can use properties for statusCode and cookies, or add data later
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

- **getFormObj(request)** returns a promis and the form fields and files in data, use like this:
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

- **authenticate** provides methodes for authentication:
  - ***authenticate.login(passwdObj, myName, myPassword, sessionFilePath)*** returns an uuid-v4 sessionid, if successful, otherwise *undefined*
  - ***authenticate.logout(sessionId, sessionFilePath)*** returns nothing
  - ***authenticate.loggedIn(sessionId, sessionFilePath)*** returns *true* if user is logged in, otherwise *false*
  - ***authenticate.addPasswd(passwdObj, myName, myPassword)*** returns passwdObj with new user and password added

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
