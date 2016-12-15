import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';	

/*
  Generated class for the EventData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ContactsData {

	public currentUser: any;
	public lastMoves: any;
	public contacts: any;

  constructor() {
    this.currentUser = firebase.auth().currentUser.uid;
    this.lastMoves = firebase.database().ref('userProfile/' + this.currentUser + '/lastMoves');
    this.contacts = firebase.database().ref('userProfile/' + this.currentUser + '/contacts');
  }

  addContact(email: string, name: string): any {
  	this.contacts('value', function(snapshot) {
  		if (!snapshot.exists()) {
  			return this.contacts.push({
  				name: name,
  				email: email
  			}).then( newContact => {
  				this.contacts.child(newContact.key).child('id').set(newContact.key);
  			});
  		}
  	});
  }

  getContacts(): any {
    return this.contacts;
  }
}
