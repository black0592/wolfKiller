/*
    
*/


function Player(data) {
    this.myRoomId = null;
    this.hasRoom = false;
    for (var i in data) {
        this[i] = data[i];
    }
}

module.exports = Player;