/*
    房间的事件层
        1. 玩家登入
        2. 玩家登出
*/
var roomModule = require('./room.module.js');
var event = require('events');
var index = 1;

function Room() {
    this.on('playerIn', PlayerIn.bind(this));
    this.on('playerOut', PlayerOut.bind(this));
    this.roomData = new roomModule();

}
Room.prototype = new event();
Room.prototype.constructor = event;
//相应区域
function PlayerIn(playerObj) {
    //增加一个唯一标示id
    playerObj.playerData.id = index;
    index++;
    this.roomData.addPlayer(playerObj);
    console.log("房间加入玩家", playerObj.playerData.name);
    this.roomData.testFunc();
}

function PlayerOut(playerObj) {
    var name = playerObj.playerData.name;
    if (this.roomData.leavePlayer(playerObj)) {
        console.log("玩家", name, "离开了房间");
    } else {
        console.log("房间内没找到", name);
    }
}

module.exports = Room;