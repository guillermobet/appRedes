import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';
import { ListaPage } from '../lista/lista';
import { ContactsPage } from '../contacts/contacts';
import { ProfileData } from '../../providers/profile-data';
import { FormBuilder, Validators } from '@angular/forms'
import { AuthData } from '../../providers/auth-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public transferForm;
  public userProfile: any;
  loading: any;

  constructor(public nav: NavController, public formBuilder: FormBuilder, public profileData: ProfileData, public authData: AuthData, public loadingCtrl: LoadingController) {
    this.nav = nav;
    this.transferForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      money: ['', Validators.compose([Validators.required])]
    });

    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
    });
  }

  goToProfile() {
    this.nav.push(ProfilePage);
  }

  goToLista() {
    this.nav.push(ListaPage);
  }

  goToContacts() {
    this.nav.push(ContactsPage);
  }

  logOut(){
    this.authData.logoutUser().then(() => {
      this.nav.setRoot(LoginPage);
    });
  }

  transferMoney(){
    this.loading = this.loadingCtrl.create({content:'Transfiriendo...'});
    this.loading.present();
    var self = this;
    if (this.userProfile.credit - this.transferForm.value.money >= 0){
      this.profileData.userProfile.orderByChild('email')
        .startAt(this.transferForm.value.email)
        .endAt(this.transferForm.value.email)
        .once('value', function(snap, ){
           var foundUser = snap.val();
           console.log(foundUser);
           if (foundUser == "null"){
           console.log("Usuario invalido");
           } else {
              for (var i in foundUser){
              self.profileData.getUserProfileUID(i).once('value', (data) => {
                var waiting = data.val();
                self.profileData.setCredit(self.userProfile.credit - self.transferForm.value.money);
                self.profileData.remoteSetCredit(i, parseInt(waiting.credit) + parseInt(self.transferForm.value.money) );
                self.profileData.addRecord(waiting.email,self.userProfile.email,self.transferForm.value.money);
              });
             }
           }
        });
    }
    this.loading.dismiss();
  }
}
