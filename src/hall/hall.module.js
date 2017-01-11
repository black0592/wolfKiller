var room = require('../room/room.js');

function Hall() {
    //房间的列表
    this.roomList = [];
    //玩家的列表
    this.playerList = [];
}


Hall.prototype.createRoom = function(option) {
    room = new room(option);
    this.roomList.push(room);
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