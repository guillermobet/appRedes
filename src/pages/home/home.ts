import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { ContactsPage } from '../contacts/contacts';
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public transferForm;
  constructor(public nav: NavController, public formBuilder: FormBuilder) {
    this.nav = nav;
    this.transferForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      money: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }


  goToProfile() {
    this.nav.push(ProfilePage);
  }

  goToContacts() {
    this.nav.push(ContactsPage);
  }
}
