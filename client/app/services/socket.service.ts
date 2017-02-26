import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
//import * as io from 'socket.io-client';

import '/socket.io/socket.io.js';


@Injectable()
export class SocketService {
 
  private io: any;	 
  //private host: string = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
  private url = 'http://localhost:3000';  
  private socket;
  private name;

  sendMessage(message){
    this.socket.emit('new-message', message);    
  }
  
  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);    
      });
      //return () => {
      //  this.socket.disconnect();
      //};  
    })     
    return observable;
  }  
}
