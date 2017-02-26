import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router }    from "@angular/router";
import {Inject} from "@angular/core";
import { SocketService } from "../services/socket.service";


@Component({
  moduleId: module.id,
  selector: "lobby",
  template: `
	
	<header>
		<h3>Welcome to the conversation:</h3>
		<button class="send btn btn-link" (click)="logout()" >Logout</button>
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
					</div>
					<div>
						<input id="message-boxID" #messagebox placeholder="Type your message here" (keyup)="sendEnter($event, messagebox)"  autocomplete="off" value="" autofocus required>
		                  		<button class="send" (click)="sendMessage(messagebox)">Send</button>
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


export class LobbyComponent implements OnInit, OnDestroy {
	
	ref: any;
	username: string;
	protected router;	
	messages =[];
	users = [];
	connection;
	message;
	
	constructor(
		@Inject(Router) router: Router,
		private sockService: SocketService) {
					
			this.router = router		
			let ref= this;
						
//			this.socket.on('sendUsername', function(username) {
//				ref.username = username;	
//			});
//	
//			this.socket.on('updateUserList', function(list) {
//				console.log(list);
//				ref.users = list;
//			});
//	

	}
		
	
	sendMessage(message) {
		this.sockService.sendMessage(message.value) 
		console.log(message.value);
		$("#message-boxID").val("");	
	}

	sendEnter($event, messagebox) {
        	if ($event.which === 13) { 
            		this.sendMessage(messagebox);
        	}
    	}


	logout() {
		this.router.navigate(["login"]);
	}

	ngOnInit() {
		this.connection = this.sockService.getMessages().subscribe(message => {
      			this.messages.push(message);
		});
		console.log('init');
	}

	ngOnDestroy() {
		this.connection.unsubscribe();
	}

}	

