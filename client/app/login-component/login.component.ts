import { Component } from "@angular/core";
import { Router }    from "@angular/router";
import {Inject} from "@angular/core";
import { UserService } from "../services/user.service";



@Component({
    moduleId: module.id,
    selector: "login",
    template: `
	
	<div class="vertical-center">
		 	<div class="container">	
				<div class="row">
					<div class="col-md-4 col-md-offset-4 well">	
							<h2 class= "text-center">Login</h2>
							<form #form="ngForm" (ngSubmit)="login(email, password)">
								
								<div class="form-group">
									<label>Username: </label>
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-user"></i>
										</span>	
										<input class="form-control" #email type="text" name="email" placeholder="user123" required>
									</div>
								</div>

								<div class="form-group">
									<label>Password: </label>
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-asterisk"></i>
										</span>	
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
    
    protected router;


    constructor( 
	private service: UserService,
	@Inject(Router) router: Router
		) {
      	  		this.router = router;
    		}				


     login(email, password) {
		var user = {
			email: email.value,
			password: password.value
		}
		this.service.loginUser(user).subscribe(
				resUser => {
					localStorage.setItem('currentUser', resUser.email);
					this.router.navigate(["lobby"]);
				},
				error => {
					window.alert('Email or Password incorrect');
				}
			);
	
	}
}
