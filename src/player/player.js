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
    socket.on('joinRoom', joinRoom.bind(this));
}
Player.prototype = new event();
Player.prototype.constructor = event;

//响应函数
function disconnect() {
    console.log(this.playerData.name + '断开连接');
    this.hall.emit('playerOut', this);
}

function createRoom(data) {
    if (this.playerData.hasRoom) return;
    data.player = this;
    this.hall.emit('createRoom', data);
}

function joinRoom(data) {
    if (this.playerData.inRoom) return;
    data.player = this;
    data.id = data.id;
    this.hall.emit('joinRoom', data);
}

module.exports = Player;