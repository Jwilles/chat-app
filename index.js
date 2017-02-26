
//-----------------Require-------------------
var express = require('express');
var path = require('path');
var _ = require('underscore');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var routes = require('./server/routes');
//var sockets = require('./server/sockets');

//-----------------Config---------------------
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//----------------Variable Init-------------------
var userArr = [];

//-----------------Routes---------------------
routes(app);

//----------------Sockets----------------------
io.on('connection', function(socket) {
	//Emit Message
	socket.on('new-message', function(message) {
		var name = socket.handshake.query.userName;
		var messageObj = {
				name: name,
				message: message
			};
		io.sockets.emit('message', messageObj);
	});
	

	// Emit Socket username
	socket.on('getUsername', function() {
		socket.emit('sendUsername', socket.handshake.query.userName);
	});


});

//io.on('connection', sockets);


//----------------Listen----------------------
http.listen(3000, function() {
	console.log('server listening on port: 3000');
});
