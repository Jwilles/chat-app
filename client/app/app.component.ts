import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
	moduleId: module.id,
	selector: 'my-app',
	template: `
		<div >
			<router-outlet></router-outlet>
		</div>	
	`,
	styles: [`
	`]
})

export class AppComponent {}
