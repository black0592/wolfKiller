var ip = 'http://127.0.0.1';
var port = 24110;
var socket = null;

function connectServer() {
    socket = io.connect(ip + ':' + port);
    console.log("连接服务器");
}

function loginServer() {
    console.log('登录');
    var name = document.getElementById('username').value;
    if (name.length == 0) { alert('请输入用户名'); return; }
    socket.emit('login', { name: name });
}