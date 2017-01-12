/*
    游戏room的数据层
*/
function Room(opt) {
    this.playerList = [];
    this.onwer = null;
    this.name = null;
    this.id = null;
    for (var i in opt) {
        this[i] = opt[i];
    }
    console.log(opt.onwer);
    opt.onwer.playerData.hasRoom = true;
}

//添加玩家
Room.prototype.addPlayer = function(p) {
    p.playerData.myRoomId = this.id;
    p.playerData.inRoom = true;
    p.socket.join(p.playerData.myRoomId);
    this.playerList.push(p);
};

//删除玩家
Room.prototype.leavePlayer = function(p) {
    p.playerData.hasRoom = false;
    p.playerData.inRoom = false;
    for (var i = 0; i < this.playerList.length; i++) {
        if (this.playerList[i].playerData.id == p.playerData.id) {
            this.playerList.splice(i, 1);
            return true;
        }
    }
    return false;
}

Room.prototype.testFunc = function(data) {
    console.log('当前服务器中有', this.playerList.length, '名玩家');
    for (var i in this.playerList) {
        console.log('玩家名字', this.playerList[i].playerData.name);
    }
}
module.exports = Room;