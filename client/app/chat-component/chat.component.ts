import { Component, OnInit } from "@angular/core";
import * as globalVars from "../services/global";
import { Router }    from "@angular/router";
import {Inject} from "@angular/core";



import '/socket.io/socket.io.js';

@Component({
  moduleId: module.id,
  selector: "chat-page",
  template: `
	<header>
		<h3>Welcome to the {{room}} conversation:</h3>
		<button class="send btn btn-link" (click)="leaveConvo()" >Leave Conversation</button>
	</header>
	
	<div class="container">
			<div class ="row">
				<div class="col-md-4 well">
					<div>
		        		    	<h4>Connected Users:</h4>
		        		  </div>	
					
					<div *ngFor="let user of users">
						{{user}}
					</div>
				</div>
				<div class="col-md-8 well">
					<div>
						<h4>Messages:</h4>
					</div>
					
					<div>	
						<div *ngFor="let message of messages">
							<ul>
							 	<li class="list-group-item">
									<p><strong>{{message.name}}:</strong></p>
									<p>{{message.message}}</p>'	
								</li>
							</ul> 
						</div>	
						<ul id="messages"></ul>
					</div>
					<div>
						<input id="message-boxID" #messagebox placeholder="Type your message here" (keyup)="sendEnter($event, messagebox)"  autocomplete="off" value="" autofocus required>
		                  		<button class="send" (click)="sendMessage(messagebox)">Send</button>
						<div class="filebutton">
							Select File
							<input type="file" #fileIn id="file">
							<button class="send" (click)="sendFile(fileIn)">File Send</button>
							
						</div>
					</div>
				</div>
			</div>
	</div>
      	`
})


export class ChatComponent implements OnInit{
	
	ref: any;
	messageInit = { name: 'System', message: 'Welcome'};
	messages: Array<String>;
	users: number[];
	room: string;

//	messages.push(messageInit);
	protected router;	

	constructor(@Inject(Router) router: Router) {
		this.router = router
		let ref= this;
		
		globalVars.socket.on('fileMessage', function(fileMessage) {
	
			var $messages = jQuery('#messages');
			var $message = jQuery('<li class="list-group-item"></li>');
			
			var mockFile = '<img src="' + fileMessage.file + '"/>'		
			$message.append('<p><strong>' + fileMessage.name + ': ' + '</strong></p>');
			$message.append('<p>' + mockFile + '</p>');
			$messages.append($message);		
		});

		
		globalVars.socket.on('updateUserList', function(list) {
			console.log(list);
			ref.users = list;
		});

		globalVars.socket.on('sendRoom', function(room) {
			ref.room = room[1];
			console.log(room);
		});


		globalVars.socket.on('message', function(message) {
	
		//	ref.messages.push(message);		
			var $messages = jQuery('#messages');
			var $message = jQuery('<li class="list-group-item"></li>');
					
			$message.append('<p><strong>' + message.name + ': ' + '</strong></p>');
			$message.append('<p>' + message.message + '</p>');
			$messages.append($message);		
		});
	}

	sendFile(file) {
		console.log('sendFile');
		//mock encoding to base64 string
		var result = 'base64string'
    	   	globalVars.socket.emit('userFile', result);
	}

	leaveConvo() {
		
		globalVars.socket.emit('exitRoom');
		this.router.navigate(["lobby"]);


	}
		
	sendMessage(message) {
		globalVars.socket.emit('message', message.value) 
		$("#message-boxID").val(" ");	
	}

	sendEnter($event, messagebox) {
        if ($event.which === 13) { 
            this.sendMessage(messagebox);
        }
    }

    	

    ngOnInit() {
	globalVars.socket.emit('getRoom');
    }	

}
