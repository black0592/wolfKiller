/*
    房间的事件层
        1. 玩家登入
        2. 玩家登出
*/
var roomModule = require('./room.module.js');
var event = require('events');

function Room(option, io) {
    this.io = io;
    this.on('playerIn', PlayerIn.bind(this));
    this.on('playerOut', PlayerOut.bind(this));
    this.roomData = new roomModule(option);
    this.emit('playerIn', option.onwer);

}
Room.prototype = new event();
Room.prototype.constructor = event;
//相应区域
function PlayerIn(playerObj) {
    this.roomData.addPlayer(playerObj);
    console.log(this.roomData.name, "房间加入玩家", playerObj.playerData.name);
    this.Refresh(playerObj);
    this.roomData.testFunc();
}

function PlayerOut(playerObj) {
    var name = playerObj.playerData.name;

    if (this.roomData.leavePlayer(playerObj)) {
        console.log("玩家", name, "离开了房间", this.roomData.name);
    } else {
        console.log("房间", this.roomData.name, "内没找到", name);
    }
}

Room.prototype.Refresh = function(who) {
    var buffer = { roomname: this.roomData.name, playerList: [] };
    for (var i in this.roomData.playerList) {
        buffer.playerList.push({
            name: this.roomData.playerList[i].playerData.name,
            id: this.roomData.playerList[i].playerData.id
        });
    }
    console.log(this.io);
    this.io.to(this.roomData.id).emit('roomInfoRefresh', buffer);
}

module.exports = Room;