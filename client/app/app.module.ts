import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { appRoutes } from './app.routing';
import { AppComponent } from './app.component';



import { routing, appRoutingProviders } from './app.routing';

import { LobbyModule } from './lobby-component/index';
import { RegistrationModule } from './registration-component/index';
import { LoginModule } from './login-component/index';
import { UserService } from './services/user.service';
import { SocketService } from './services/socket.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@NgModule({
	imports: [ 
		BrowserModule,
		HttpModule,
		FormsModule,
		routing,
		RouterModule,
		RouterModule.forRoot(appRoutes),
		LoginModule,
		RegistrationModule,
		LobbyModule
	 ],
	declarations: [ 
		AppComponent 
	],
	providers: [
		UserService,
		SocketService
	],
	bootstrap: [ 
		AppComponent
	 ]
})

export class AppModule {}
