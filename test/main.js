
new Vue({
    el:'#app',
    data: {
        message:'Hello World!',
        ip:'http://127.0.0.1',
        port:24110,
        roomList:[],
        playerList:[],
        socket:null,
        username:'',
        roomName:''
    },
    methods:{
        onMessage:function(){
            this.socket = io.connect( this.ip + ':' +  this.port);
            this.socket.on('refesh', function(data) {
                console.log(data);
                this.roomList = data.roomList;
                this.playerList = data.playerList;
                console.log("收到了消息");
            }.bind(this));
        },
        connectServer:function(){
            this.onMessage();
            console.log("连接服务器");
        },
        loginServer:function(){
            console.log('登录');
            var name = this.username;
            if (name.length == 0) { alert('请输入用户名'); return; }
            this.socket.emit('login', { name: name });
        },
        createRoom:function(){
            if(this.roomName.length == 0){alert('请输入房间名');return;}
            this.socket.emit('createRoom',{
                roomName:this.roomName
            });
        }
    }
});


    function loginServer() {

    }
