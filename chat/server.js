var express = require("express");
var path = require("path");
var app = express();

var server = app.listen(8000, function(){
	console.log('listening on port 8000');
})
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render("index");
})
var io = require("socket.io").listen(server);
io.sockets.on('connection', function(socket){
	var user = "";
	console.log("sockets ready...");
	socket.on('name', function(data){
		console.log(data.name + " has signed on");
		user = data.name;
		io.emit('login', {name: data.name});
	})
	socket.on('message', function(data){
		console.log(data.message);
		io.emit('broadcast', {message: data.message, name: data.name});
		
	})
	socket.on('disconnect', function(){
		console.log("signed off" + user);
		io.emit('leave', {user: user});
	})
})
