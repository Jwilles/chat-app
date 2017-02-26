
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

//-----------------Routes---------------------
routes(app);

//----------------Sockets----------------------
io.on('connection', function(socket) {
	console.log('connection');
	//Emit Message
	socket.on('new-message', function(message) {
		io.sockets.emit('message', message);
	});
});

//io.on('connection', sockets);


//----------------Listen----------------------
http.listen(3000, function() {
	console.log('server listening on port: 3000');
});
