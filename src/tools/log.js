var log = require('console').Console;
var path = require('path');
var fs = require('fs');
var logPath = path.resolve(__dirname, '..', '..', 'log');
const output = fs.createWriteStream(logPath + '/日志.log');
const errorOutput = fs.createWriteStream(logPath + '/错误日志.log');
const logtools = new log(output, errorOutput);

module.exports = logtools;