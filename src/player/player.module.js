/*
    
*/


function Player(data) {
    //我所在的房间号
    this.myRoomId = null;
    //我是否在房间里
    this.inRoom = false;
    this.hasRoom = false;
    //我得名字
    this.name = null;
    //我得id
    this.id = null;
    for (var i in data) {
        this[i] = data[i];
    }

}

module.exports = Player;