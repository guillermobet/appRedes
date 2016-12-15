import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { ContactsPage } from '../contacts/contacts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  constructor(public nav: NavController) {
    this.nav = nav;
  }

  goToProfile() {
    this.nav.push(ProfilePage);
  }

  goToContacts() {
    this.nav.push(ContactsPage);
  }
}
