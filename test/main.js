var app = angular.module('app',[]);
angular.element(document).ready(function () {

    angular.bootstrap(document, ['app']);
});
app.controller('mainController',function($scope){
    $scope.ip = 'http://127.0.0.1';
    $scope.port = 24110;
    $scope.roomList = ["邱上哲的房间","路人的房间"];
    $scope.playerList = ["邱上哲","路人甲","路人乙"];
    function onMessage(){
        socket = io.connect($scope.ip + ':' + $scope.port);
        socket.on('intoHall', function(data) {
            $scope.roomList = data.roomList;
            $scope.playerList = data.playerList;
        });
    }
    $scope.connectServer = function() {
        onMessage();
        console.log("连接服务器");
    }

    $scope.loginServer = function() {
        console.log('登录');
        var name = document.getElementById('username').value;
        if (name.length == 0) { alert('请输入用户名'); return; }
        socket.emit('login', { name: name });
    }


})
