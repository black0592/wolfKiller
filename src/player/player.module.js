function Player(data) {
    for (var i in data) {
        this[i] = data[i];
    }
}

module.exports = Player;