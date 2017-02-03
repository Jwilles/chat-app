import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
	moduleId: module.id,
	selector: 'my-app',
	template: `
	<!--	<header>
			<div class="page-header">
				<h2>Welcome to the chat app!</h2>	
			</div>
		</header>-->
		<div >
			<router-outlet></router-outlet>
		</div>	
	`,
	styles: [`
		.jumbotron {box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2); }
	`]
})

export class AppComponent {}
