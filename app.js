var io = require('socket.io'),
    colors = require('colors');
var playerObj = require('./src/player/player.js');
var hall = require('./src/hall/hall.js');
var logger = require('./src/tools/log.js');
hall = new hall();
var server = io(24110);

server.on('connection', function(socket) {
    socket.on('login', function(data) {
        new playerObj(socket, data, hall);
    });
});


console.log('===========服务器开启。。。端口24110==========');