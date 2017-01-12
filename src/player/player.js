var player = require('./player.module.js');
var event = require('events');

function Player(socket, data, hall) {
    this.socket = socket;
    this.hall = hall;
    this.isInRoom = false;
    this.playerData = new player(data);
    //告诉room我进来了。
    this.hall.emit('playerIn', this);
    //注册socket事件
    socket.on('disconnect', disconnect.bind(this));
    socket.on('createRoom', createRoom.bind(this));
}
Player.prototype = new event();
Player.prototype.constructor = event;

//响应函数
function disconnect() {
    console.log(this.playerData.name + '断开连接');
    this.hall.emit('playerOut', this);
}

function createRoom(data) {
    data.player = this;
    this.playerData.hasRoom = true;
    this.hall.emit('createRoom', data);
}

module.exports = Player;