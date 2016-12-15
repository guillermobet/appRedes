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
      apiKey: "AIzaSyDCRGFqw0D3e7rLgOL8RjxjIni_xZz2SJg",
      authDomain: "aurea-46900.firebaseapp.com",
      databaseURL: "https://aurea-46900.firebaseio.com",
      storageBucket: "aurea-46900.appspot.com",
      messagingSenderId: "751011646268"
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
