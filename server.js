const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/index.html')
});

app.post('/chat/',(req,res)=>{
	res.sendFile(__dirname+'/chat.html');
	//console.log(req.body.nickname);
});


const users = {}


io.on('connection',(socket)=>{

	//io.on.emit("users","hello")

	socket.on('msg', (msg)=>{
		socket.broadcast.emit('msg', msg);
	})
	socket.on('login',function(data){
		console.log(data.UserId+' connected')
	})
	socket.on('disconnect', function(){
		console.log('user '+users[socket.id]+' disconected')
	})
	socket.on('chat', function(id){
		users[id] = req.body.nickname
		console.log(req.body.nickname)
	})
})


http.listen(3000,function(){
	console.log('Listening on port 3000')
});



















/*
let counter = 0
setInterval(() => {
	io.to('contador').emit('msg', counter++)
},1000)
*/

//socket.join('contador')
//console.log('new connection', socket.id)
//console.log(msg)
//socket.broadcast.emit('msg', socket.id+' connected')