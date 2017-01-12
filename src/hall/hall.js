var hall = require('./hall.module.js');
var event = require('events');
var roomIndex = 0;
var playerIndex = 0;

function Hall() {
    this.hallData = new hall();
    //告诉hell我进来了。
    this.on('playerIn', PlayerIn.bind(this));
    this.on('playerOut', PlayerOut.bind(this));
    this.on('createRoom', CreateRoom.bind(this));
}

Hall.prototype = new event();
Hall.prototype.constructor = event;
module.exports = Hall;
//响应函数
function PlayerIn(playerObj) {
    //增加一个唯一标示id
    playerObj.playerData.id = playerIndex;
    playerIndex++;
    this.hallData.addPlayer(playerObj);
    console.log("大厅加入玩家", playerObj.playerData.name);
    this.refesh(playerObj);
}

function PlayerOut(playerObj) {
    var name = playerObj.playerData.name;
    var hasRoom = playerObj.playerData.hasRoom;
    console.log(hasRoom ? '玩家创建过房间' : '玩家没有属于自己的房间');
    if (this.hallData.leavePlayer(playerObj)) {
        console.log("玩家", name, "离开了大厅");
        if (hasRoom) {
            var id = playerObj.playerData.myRoomId;
            this.hallData.deleteRoom(id);
        }
        this.refesh(playerObj);
    } else {
        console.error("大厅内没找到", name);
    }
}

function CreateRoom(data) {
    data.player.playerData.myRoomId = roomIndex;
    var player = data.player;
    var roomName = data.roomName;
    console.log("玩家", player.playerData.name, "创建了一个房间名字是", roomName);
    this.hallData.createRoom({
        name: roomName,
        id: roomIndex,
        onwer: player
    });
    roomIndex++;
    console.log(this.hallData.roomList);
    this.refesh(player);
}

Hall.prototype.refesh = function(playerObj) {
    //返回大厅信息
    var playerList = [];
    for (var i in this.hallData.playerList) {
        playerList[i] = this.hallData.playerList[i].playerData.name;
    }
    var roomList = [];
    for (var i in this.hallData.roomList) {
        roomList[i] = this.hallData.roomList[i].roomData.name;
    }
    playerObj.socket.emit('refesh', { roomList: roomList, playerList: playerList });
    playerObj.socket.broadcast.emit('refesh', { roomList: roomList, playerList: playerList });
}