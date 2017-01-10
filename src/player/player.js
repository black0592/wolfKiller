var player = require('./player.module.js');
var event = require('events');

function Player(socket, data, room) {
    this.socket = socket;
    this.room = room;

    this.playerData = new player(data);
    //告诉room我进来了。
    this.room.emit('playerIn', this);
    //注册socket事件
    socket.on('disconnect', disconnect.bind(this));
}
Player.prototype = new event();
Player.prototype.constructor = event;

//相应函数
function disconnect() {
    console.log(this.playerData.name + '断开连接');
    this.room.emit('playerOut', this);
}


module.exports = Player;