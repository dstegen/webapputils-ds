/*!
 * tests/index.js
 * webapputils-ds (https://github.com/dstegen/webapputils-ds)
 * Copyright 2020 Daniel Stegen <info@danielstegen.de>
 * Licensed under MIT (https://github.com/dstegen/webapputils-ds/blob/master/LICENSE)
 */

'use strict';

 // Required Moduls
const fork = require('child_process').fork;

let myForks = [];
let i = 0;

myForks[i] = fork('./tests/getIPs_test');
