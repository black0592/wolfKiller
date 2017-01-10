var io = require('socket.io'),
    colors = require('colors');
var playerObj = require('./src/player/player.js');
var room = require('./src/room/room.js');
room = new room();
var logger = require('./src/tools/log.js');

var server = io(24110);

server.on('connection', function(socket) {
    socket.on('login', function(data) {
        new playerObj(socket, data, room);
    });
});


console.log('===========服务器开启。。。端口24110==========');