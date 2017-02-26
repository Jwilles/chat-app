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
		<button class="send btn btn-primary" id="logoutbutton" (click)="logout()" >Logout</button>
	</header>
	
	<div class="container">
			
			<div class ="row">
				<div class="col-md-8 col-md-offset-2 well">
					<div>
						<h4>Messages:</h4>
					</div>
					
					<div>	
						<div *ngFor="let message of messages">
							<ul>
							 	<li class="list-group-item">
									<p><strong>{{message.email}}:</strong></p>
									<p>{{message.message}}</p>	
								</li>
							</ul> 
						</div>	
					</div>
					<div>
						<input id="message-boxID" #messagebox placeholder="message" (keyup)="sendEnter($event, messagebox)"  autocomplete="off" value="" autofocus required>
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

		h3 {
			margin: 20px;
		}

		#logoutbutton {
			margin: 20px;
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
	}
		
	
	sendMessage(message) {
		var newMessage = {
			email: localStorage.getItem('currentUser'),
			message: message.value
		}
		console.log(newMessage);
		this.sockService.sendMessage(newMessage) 
		$("#message-boxID").val("");	
	}

	sendEnter($event, messagebox) {
        	if ($event.which === 13) { 
            		this.sendMessage(messagebox);
        	}
    	}


	logout() {
		localStorage.removeItem('currentUser')
		this.router.navigate(["login"]);
	}

	ngOnInit() {
		this.connection = this.sockService.getMessages().subscribe(message => {
      			this.messages.push(message);
		});
	}

	ngOnDestroy() {
		this.connection.unsubscribe();
	}

}	

