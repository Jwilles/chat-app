
var express = require('express');
var path = require('path');
var _ = require('underscore');
var bodyParser = require('body-parser');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


//Config
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Init place holder db
var accountArr = [];
var userArr = [];
var roomArr = [];

//-------------------Routes--------------------
app.get('/chat', (req, res) => {
	res.redirect('/');
});

app.get('/login', (req, res) => {
	res.redirect('/');
});

app.get('/lobby', (req, res) => {
	res.redirect('/');
});


app.post('/users', (req, res) => {
//	console.log(req.body);
	var newAccount = {
		email: req.body.email,
		password: req.body.password
	};
	accountIndex = _.findIndex(accountArr, function(account) {
		return account.email == newAccount.email;	
	});
	console.log(accountIndex);
	if (accountIndex == -1) {
		accountArr.push(newAccount); 
		res.send(newAccount);
	} else {
		res.status(400).send(new Error('Email already in use'));
	}
});

app.post('/users/login', (req, res) => {
	var reqAccount = {
		email: req.body.email,
		password: req.body.password
	};

	accountIndex = _.findIndex(accountArr, function(account) {
			return account.email == reqAccount.email;
		});
	//fix here
	if (accountIndex == -1) {
	 	return res.status(400).send(new Error('Login Failed'));
	} else if (accountArr[accountIndex].password == reqAccount.password) {
		return res.send(reqAccount);
	}
	res.status(400).send(new Error('login Failed'));
});


//-------------------------------Sockets---------------------------------
io.on('connection', function(socket) {
	//userArr.push( {name: socket.handshake.query.userName});
//	io.emit('updateUserList', userArr);	
	
//	socket.on('disconnect', function () {
//		var name = socket.handshake.query.userName;
//		userIndex = _.findIndex(userArr, function(user) {
//			return user.name == name;
//		});
//		if (userIndex != -1) {
//			userArr.splice(userIndex, 1);
//		//	io.emit('updateUserList', userArr);
//		}
//	});

	socket.on('newRoom', function(newRoom) {
		var userList = newRoom.users.split(',');
		userList.forEach(function(userName, i, arr) {
			arr[i] = userName.trim();
		}); 
		userList.push(newRoom.creator);
		//console.log(userList);
		if (userList.length <  10) {
			roomArr.push({
				roomName: newRoom.roomName,
				users: userList,
				currentUsers: []
			});

			io.emit('updateRooms', roomArr);
		}
	}); 

	socket.on('message', function(message) {
		var name = socket.handshake.query.userName;
		var room = socket.rooms[1]
		var messageObj = {
				name: name,
				message: message
			};
		io.sockets.in(room).emit('message', messageObj);
	});
	
	socket.on('getUsername', function() {
		socket.emit('sendUsername', socket.handshake.query.userName);
	});

	socket.on('joinRoom', function(room) {
		socket.join(room);

		roomIndex = _.findIndex(roomArr, function(roomObj) {
			return roomObj.roomName == room
		}); 
		console.log(roomIndex);
		if (roomIndex != -1) {
			roomArr[roomIndex].currentUsers.push(socket.handshake.query.userName);
			console.log(roomArr[roomIndex].currentUsers);
			io.sockets.in(room).emit('updateUserList', roomArr[roomIndex].currentUsers);
		}
	});
	
	socket.on('exitRoom', function() {
		var room = socket.rooms[1];
		console.log(room);
		var name = socket.handshake.query.userName;

		socket.leave();
		console.log(socket.rooms);	
		roomIndex = _.findIndex(roomArr, function(roomObj) {
			return roomObj.roomName == room
		}); 
	
		if (roomIndex != -1) {
			userIndex = _.findIndex(roomArr[roomIndex].currentUsers, function(user) {
				return user == name
			});

			if(userIndex != -1) {
				roomArr[roomIndex].currentUsers.splice(userIndex, 1);
				io.sockets.in(room).emit('updateUserList', roomArr[roomIndex].currentUsers);
			}
		}
		
	});

	socket.on('getRoom', function () {
		//console.log(socket.rooms);
		socket.emit('sendRoom', socket.rooms);
	});

	socket.on('checkRooms', function() {
		io.emit('updateRooms', roomArr);	
	});

});





http.listen(3000, function() {
	console.log('server listening on port: 3000');
});
