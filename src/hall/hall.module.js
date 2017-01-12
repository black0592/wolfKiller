var room = require('../room/room.js');

function Hall() {
    //房间的列表
    this.roomList = [];
    //玩家的列表
    this.playerList = [];
}


Hall.prototype.createRoom = function(option) {
    var roomBuffer = new room(option);
    this.roomList.push(roomBuffer);
}

Hall.prototype.deleteRoom = function(id) {
    for (var i = 0; i < this.roomList.length; i++) {
        if (this.roomList[i].roomData.id == id) {
            this.roomList.splice(i, 1);
            console.log("删除房间", id, '成功');
            return true;
        }
    }
    console.log("删除房间", id, '失败原因是没找到这个房间');
    return false;
}

//添加玩家
Hall.prototype.addPlayer = function(p) {
    this.playerList.push(p);
};

//删除玩家
Hall.prototype.leavePlayer = function(p) {
    for (var i = 0; i < this.playerList.length; i++) {
        if (this.playerList[i].playerData.id == p.playerData.id) {
            this.playerList.splice(i, 1);
            return true;
        }
    }
    return false;
}

module.exports = Hall;