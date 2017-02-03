import { Component, OnInit } from "@angular/core";
import { Router }    from "@angular/router";
import * as globalVars from "../services/global";
import {Inject} from "@angular/core";



import '/socket.io/socket.io.js';

@Component({
  moduleId: module.id,
  selector: "lobby",
  template: `

         		
	<header>
		<h3>Welcome to the chat lobby:</h3>
		<button class="send btn btn-link" (click)="logout()">Logout</button>
	</header>
	<div class="container">
		<div class ="row">
			<div class="col-md-6 well">
	        		    	<h4 class="text-center">Create Room</h4>
					
					<form #form="ngForm" (ngSubmit)="createRoom(roomName, users)">
					
						<div class="form-group">
							<label>Room Name: </label>
							<div class="input group">
								<input #roomName type="text" name="roomName" placeholder="room" required>
							</div>
						</div>
	
					<div class="form-group">
						<label>Emails: (Separated by a comma) </label>
						<div class="input-group">
							<input #users type="text" name="users" placeholder="example@gmail.com, example2@gmail.com" required>
						</div>
					</div>
				
					
					<button type="submit" class="btn btn-primary">Create</button>
				</form>
		
				
			</div>
			<div class="col-md-6 well text-center">
					<h4 class ="text-center">Conversations:</h4>
					
					<div *ngFor="let room of rooms">
						<button class="send btn btn-primary" (click)="joinRoom(room)">Join: {{room.roomName}}</button>
						<div>
							<strong>Users:</strong>
							<div *ngFor="let user of room.users">
								{{user}}
							</div>
						</div>
					</div>
			</div>
		</div>
	</div>
      	`,
	styles: [`
	    	.vertical-center {
			min-height: 100vh;
			margin: 0;
			display: flex;
			align-items: center;
		}
	
		.form-control {
			align-items: center;
			
		}
	
	`]

})


export class LobbyComponent implements OnInit {
	
	ref: any;
	username: string;
	rooms: number[];
	protected router;	

	constructor(@Inject(Router) router: Router) {
					
		this.router = router		
		let ref= this;
		let temp;
		
		globalVars.socket.on('tooBig', function() {
			window.alert('Chat room too big! Less than 10 people max!');
		});

		globalVars.socket.on('duplicateRoom', function() {
			window.alert('Room name already exists! Please select another!');
		});

			
		globalVars.socket.on('updateRooms', function(roomList) {
			ref.rooms = roomList;
		});

		globalVars.socket.on('sendUsername', function(username) {
			ref.username = username;	
		});
	}
		
	createRoom(roomName, users) {
		var newRoom = { 
			roomName: roomName.value,
			users: users.value,
			creator: this.username
		};

		globalVars.socket.emit('newRoom', newRoom);
	}

	joinRoom(room) {
		if (room.users.indexOf(this.username) != -1) {
			globalVars.socket.emit('joinRoom', room.roomName);
			this.router.navigate(["chat"]);
		}
	}

	logout() {
		globalVars.socket.disconnect();
		this.router.navigate(["login"]);
	}

	ngOnInit() {
		globalVars.socket.emit('checkRooms');
		globalVars.socket.emit('getUsername');
	}

}	

