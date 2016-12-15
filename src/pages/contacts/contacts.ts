import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactsData } from '../../providers/contacts-data';

/*
  Generated class for the Contacts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {

  constructor(public nav: NavController, public contactsData: ContactsData) {
    this.nav = nav;
    this.contactsData = contactsData;
  }

  createContact(email: string, name: string) {
    this.contactsData.addContact(email, name).then(() => {
      this.nav.pop();
    });
  }

}
