const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


//ROTAS
app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/index.html')
});

app.get('/chat',(req,res)=>{
	res.sendFile(__dirname+'/chat.html');
});



//Usuarios
const users = {}


//Socket.IO
io.on('connection',(socket)=>{

	//io.on.emit("users","hello")

	socket.on('msg', (msg)=>{
		socket.broadcast.emit('msg',{user:users[socket.id],msg:msg});
		console.log(users)
	})
	socket.on('login',function(data){
		console.log(socket.id+":"+data.userId+' connected');
		users[socket.id] = data.userId;
	})
	socket.on('disconnect', function(){
		console.log('user '+users[socket.id]+' disconected')
		delete users[socket.id]
	})
})


//Listener
http.listen(3000,function(){
	console.log('Listening on port 3000')
});



















/*
let counter = 0
setInterval(() => {
	io.to('contador').emit('msg', counter++)
},1000)
*/
//users[id] = req.body.nickname
//socket.join('contador')
//console.log('new connection', socket.id)
//console.log(msg)
//socket.broadcast.emit('msg', socket.id+' connected')