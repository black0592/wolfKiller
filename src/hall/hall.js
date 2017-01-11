var hall = require('./hall.module.js');
var event = require('events');
var index = 1;

function Hall() {
    this.hallData = new hall();
    //告诉hell我进来了。
    this.on('playerIn', PlayerIn.bind(this));
    this.on('playerOut', PlayerOut.bind(this));
}
Hall.prototype = new event();
Hall.prototype.constructor = event;

//响应函数
function PlayerIn(playerObj) {
    //增加一个唯一标示id
    playerObj.playerData.id = index;
    index++;
    this.hallData.addPlayer(playerObj);
    console.log("大厅加入玩家", playerObj.playerData.name);
    //返回大厅信息
    var playerList = [];
    for (var i in this.hallData.playerList) {
        playerList[i] = this.hallData.playerList[i].playerData.name;
    }
    playerObj.socket.emit('intoHall', { roomList: this.hallData.roomList, playerList: playerList });
    playerObj.socket.broadcast.emit('intoHall', { roomList: this.hallData.roomList, playerList: playerList });
}

function PlayerOut(playerObj) {
    var name = playerObj.playerData.name;
    if (this.hallData.leavePlayer(playerObj)) {
        console.log("玩家", name, "离开了大厅");
        var playerList = [];
        for (var i in this.hallData.playerList) {
            playerList[i] = this.hallData.playerList[i].playerData.name;
        }
        playerObj.socket.broadcast.emit('intoHall', { roomList: this.hallData.roomList, playerList: playerList });
    } else {
        console.error("大厅内没找到", name);
    }
}


module.exports = Hall;