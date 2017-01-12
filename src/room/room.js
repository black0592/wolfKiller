/*
    房间的事件层
        1. 玩家登入
        2. 玩家登出
*/
var roomModule = require('./room.module.js');
var event = require('events');
var roomIndex = 0;

function Room(option, onwer) {
    this.on('playerIn', PlayerIn.bind(this));
    this.on('playerOut', PlayerOut.bind(this));
    option.roomId = roomIndex;
    this.roomData = new roomModule(option, onwer);
    roomIndex++;
}
Room.prototype = new event();
Room.prototype.constructor = event;
//相应区域
function PlayerIn(playerObj) {
    this.roomData.addPlayer(playerObj);
    console.log(this.roomData.name, "房间加入玩家", playerObj.playerData.name);
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

module.exports = Room;