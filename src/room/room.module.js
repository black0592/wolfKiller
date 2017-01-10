/*
    游戏room的数据层
*/
function Room() {
    this.playerList = [];

}

//添加玩家
Room.prototype.addPlayer = function(p) {
    this.playerList.push(p);
};

//删除玩家
Room.prototype.leavePlayer = function(p) {
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