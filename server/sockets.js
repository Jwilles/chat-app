var io = require('socket.io');


module.exports = function(socket) {

	//Emit Message
	socket.on('message', function(message) {
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



//	// Emit file to room
//	socket.on('userFile', function (file) {
//		var name = socket.handshake.query.userName;
//		var room = socket.rooms[1]
//		var imageObj = {
//				name: name,
//				file: file
//			};
//		io.sockets.in(room).emit('fileMessage', imageObj);
//	});

};
