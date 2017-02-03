//index.js 

//-----------------Require-------------------
var express = require('express');
var path = require('path');
var _ = require('underscore');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

//-----------------Config------------------
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//----------Init Place Holder DB----------
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

//POST Register
app.post('/users', (req, res) => {
	//create new account and hash password
	var newAccount = {
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
	};
	//check if account name is used and add to db is unused
	accountIndex = _.findIndex(accountArr, function(account) {
		return account.email == newAccount.email;	
	});
	if (accountIndex == -1) {
		accountArr.push(newAccount); 
		res.send(newAccount);
	} else {
		res.status(400).send(new Error('Email already in use'));
	}
});

// POST Login
app.post('/users/login', (req, res) => {
	//create new login object
	var reqAccount = {
		email: req.body.email,
		password: req.body.password
	};
		
	//find account and check password
	accountIndex = _.findIndex(accountArr, function(account) {
			return account.email == reqAccount.email;
		});
	if (accountIndex == -1) {
	 	return res.status(400).send(new Error('Login Failed'));
	} else if (bcrypt.compareSync(reqAccount.password, accountArr[accountIndex].password)) {
		return res.send(reqAccount);
	}
	res.status(400).send(new Error('login Failed'));
});


//-------------------------------Sockets---------------------------------
io.on('connection', function(socket) {

	//Create new conversation
	socket.on('newRoom', function(newRoom) {
		var userList = newRoom.users.split(',');
		userList.forEach(function(userName, i, arr) {
			arr[i] = userName.trim();
		}); 
		userList.push(newRoom.creator);
		if (userList.length <  10) {
			roomIndex = _.findIndex(roomArr, function(roomObj) {
				return roomObj.roomName == newRoom.roomName
			}); 
			if (roomIndex == -1) {
				roomArr.push({
					roomName: newRoom.roomName,
					users: userList,
					currentUsers: []
				});
				
				io.emit('updateRooms', roomArr);
			} else {
				socket.emit('duplicateRoom')
			}
		} else {
			socket.emit('tooBig')
		}
	}); 
	
	// Emit file to room
	socket.on('userFile', function (file) {
		var name = socket.handshake.query.userName;
		var room = socket.rooms[1]
		var imageObj = {
				name: name,
				file: file
			};
		io.sockets.in(room).emit('fileMessage', imageObj);
	});
	
	//Emit message to room
	socket.on('message', function(message) {
		var name = socket.handshake.query.userName;
		var room = socket.rooms[1]
		var messageObj = {
				name: name,
				message: message
			};
		io.sockets.in(room).emit('message', messageObj);
	});
	
	// Emit socket username
	socket.on('getUsername', function() {
		socket.emit('sendUsername', socket.handshake.query.userName);
	});

	// Add user to room and update room user list 
	socket.on('joinRoom', function(room) {
		socket.join(room);

		roomIndex = _.findIndex(roomArr, function(roomObj) {
			return roomObj.roomName == room
		}); 
		if (roomIndex != -1) {
			roomArr[roomIndex].currentUsers.push(socket.handshake.query.userName);
			io.sockets.in(room).emit('updateUserList', roomArr[roomIndex].currentUsers);
		}
	});
	
	// Remove user from room and update room user list
	socket.on('exitRoom', function() {
		var room = socket.rooms[1];
		var name = socket.handshake.query.userName;

		socket.leave(room);
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
	
	// get room name
	socket.on('getRoom', function () {
		socket.emit('sendRoom', socket.rooms);
	});

	// update room list
	socket.on('checkRooms', function() {
		io.emit('updateRooms', roomArr);	
	});

});





http.listen(3000, function() {
	console.log('server listening on port: 3000');
});
