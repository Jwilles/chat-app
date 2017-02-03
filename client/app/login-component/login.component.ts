import { Component } from "@angular/core";
import { Router }    from "@angular/router";
import * as globalVars from "../services/global";
import {Inject} from "@angular/core";
import { UserService } from "../services/user.service";


import '/socket.io/socket.io.js';
declare var io;

@Component({
    moduleId: module.id,
    selector: "login",
    template: `
	
	<div class="vertical-center">
		 	<div class="container">	
				<div class="row">
					<div class="col-md-4 col-md-offset-4 well">	
							<h2 class= "text-center">Chat Login:</h2>
							<form #form="ngForm" (ngSubmit)="login(email, password)">
								
								<div class="form-group">
									<label>Email: </label>
									<div class="input-group">
										<input class="form-control" #email type="text" name="email" placeholder="example@gmail.com" required>
									</div>
								</div>

								<div class="form-group">
									<label>Password: </label>
									<div class="input-group">
										<input class="form-control" #password type="password" name="password" placeholder="password" required>
									</div>
								</div>
							
								<div class="form-group">			
									<button type="submit" class="btn btn-primary btn-block">Login</button>
									<div>
										<a [routerLink]="['']" class="btn btn-link btn-block">Register</a>
									</div>
								</div>
							</form>
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
	
		h2 {
			margin: 24px 0;
		}
	
		}
		.form-control {
			align-items: center;
			
		}
		.col-md-4 col-md-offset-4 well {
			display: inline-block;
		}
	
		`]

    })

export class LoginComponent {
    email: string = null;
    protected router;
    protected globalVars = globalVars;


    constructor( 
	private service: UserService,
	@Inject(Router) router: Router
		) {
      	  		this.router = router;
    		}				

//    login(email, password) {
//		console.log('working');
//		var user = {
//			email: email.value,
//			password: password.value
//		}
//		this.globalVars.socket = io({ query: "userName=" + this.email });
//		this.globalVars.socket.emit('authentication', {email: email.value, password: password.value});
//		this.router.navigate(["chat"]);
//
// 	}	

     login(email, password) {
		var user = {
			email: email.value,
			password: password.value
		}
		this.service.loginUser(user).subscribe(
				resUser => {
				//	console.log('success');
				//	console.log(resUser);
					this.globalVars.socket = io({ query: "userName=" + resUser.email });
					this.router.navigate(["lobby"]);
				},
				error => {
					window.alert('Email or Password incorrect');
					console.log(error);
				}
			);
	
	}


//    submit(data) {
//      this.email = data.value;
//      if (this.email) {
//      	this.globalVars.socket = io({ query: "userName=" + this.email });
//        this.router.navigate(["chat"]);
//      }
//    }
//
//    addEmail($event, email) {
//      if ($event.which === 13) { // ENTER_KEY
//        this.submit(email);
//      }
//    }
}
