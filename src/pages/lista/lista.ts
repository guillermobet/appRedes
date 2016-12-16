import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';
/*
  Generated class for the Lista page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html'
})
export class ListaPage {
  public transacciones: any[] = [];
  constructor(public navCtrl: NavController) {
  	firebase.database().ref('/records').on('value', data => {
        let rawList = [];
        data.forEach( snap => {
          rawList.push({
            receiver: snap.val().receiver,
            sender: snap.val().sender,
            money: snap.val().money,
          });
          return false;
        });
        this.transacciones = rawList;
    });
    console.log(this.transacciones);
  }

  ionViewDidLoad() {
    console.log('Hello ListaPage Page');
    console.log(this.transacciones);
  }

}
