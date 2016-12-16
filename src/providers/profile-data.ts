import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the ProfileData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class ProfileData {
  // We'll use this to create a database reference to the userProfile node.
  userProfile: any; 

  // We'll use this to create an auth reference to the logged in user.
  currentUser: any; 


  constructor() {
    this.currentUser = firebase.auth().currentUser;
    this.userProfile = firebase.database().ref('/userProfile');
  }

  getUserProfile(): any {
    return this.userProfile.child(this.currentUser.uid);
  }

  getUserProfileUID(uid: string): any{
    return this.userProfile.child(uid);
  }

  updateName(firstName: string, lastName: string): any {
    return this.userProfile.child(this.currentUser.uid).update({
      firstName: firstName,
      lastName: lastName,
    });
  }

  setCredit(ammount: number): any {
    return this.userProfile.child(this.currentUser.uid).update({
      credit: ammount
    });
  }

  remoteSetCredit(other: string, ammount: number): any {
    return firebase.database().ref('/userProfile/'+other).update({
      credit: ammount
    });
  }

  updateDOB(birthDate: string): any {
    return this.userProfile.child(this.currentUser.uid).update({
      birthDate: birthDate,
    });
  }

  updateEmail(newEmail: string): any {
    this.currentUser.updateEmail(newEmail).then(() => {
      this.userProfile.child(this.currentUser.uid).update({
        email: newEmail
      });
    }, (error) => {
      console.log(error);
    });
  }

  updatePassword(newPassword: string): any {
    this.currentUser.updatePassword(newPassword).then(() => {
      console.log("Password Changed");
    }, (error) => {
      console.log(error);
    });
  }
}