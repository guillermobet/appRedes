import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import firebase from 'firebase';

import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = LoginPage;

  constructor(platform: Platform) {

    firebase.initializeApp({
      apiKey: "AIzaSyCBrymRmqhCV5-RMpdYEWmW8m0JUjyARik",
    authDomain: "real-2c494.firebaseapp.com",
    databaseURL: "https://real-2c494.firebaseio.com",
    storageBucket: "real-2c494.appspot.com",
    messagingSenderId: "825836910279"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.rootPage = LoginPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
