import { Component } from "@angular/core";
import { Router }    from "@angular/router";
import * as globalVars from "../services/global";
import {Inject} from "@angular/core";
import { UserService } from "../services/user.service";


@Component({
    moduleId: module.id,
    selector: "registration",
    template: `
		 <div class="vertical-center">
		 	<div class="container">	
				<div class="row">
					<div class="col-md-4 col-md-offset-4 well">	
							<h2 class= "text-center">Register</h2>
							<form #form="ngForm" (ngSubmit)="register(email, password)">
								
								<div class="form-group">
									<label>Email: </label>
									<div class="input-group">
										<span class="input-group-addon">
											<i class="glyphicon glyphicon-user"></i>
										</span>	
										<input class="form-control" #email type="text" name="email" placeholder="example@gmail.com" required>
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
									<button type="submit" class="btn btn-primary btn-block">Register</button>
									<div>
										<a [routerLink]="['login']" class="btn btn-link btn-block">Login</a>
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

export class RegistrationComponent {

	protected router;

	constructor(
		private service: UserService,
		@Inject(Router) router: Router
		) { 
			this.router = router
		}

		
	register(email, password) {
		var user = {
			email: email.value,
			password: password.value
		}
		this.service.addUser(user).subscribe(
				resUser => {
					this.router.navigate(["login"]);
				},
				error => {
					window.alert('Email already has account');
				}
			);
	}
}
