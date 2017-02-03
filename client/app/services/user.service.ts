import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {

	constructor(private http: Http) {}

	addUser(user) {
		//{email: user.email, password: user.password}
			
		let data = new URLSearchParams
		data.append('email', user.email);
		data.append('password', user.password);
		return this.http.post('/users', data)
			.map(res => res.json())
			.catch(err => {
				return Observable.throw(err);
			});
	}

	loginUser(user) {
		let data = new URLSearchParams
		data.append('email', user.email);
		data.append('password', user.password);
		return this.http.post('/users/login', data)
			.map(res => res.json())
			.catch(err => {
				return Observable.throw(err);
			});

	}

}
