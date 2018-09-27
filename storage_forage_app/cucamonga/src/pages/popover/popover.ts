import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
    template: `
      <ion-list>
        <button ion-item (click)="close()">Logout</button>
      </ion-list>
  `
})
export class PopoverPage {
    constructor(public afa: AngularFireAuth, public navCtrl: NavController, public viewCtrl: ViewController) { }

    close() {
        this.viewCtrl.dismiss();
        this.navCtrl.setRoot(LoginPage);
        this.afa.auth.signOut().then(auth => {

        })
        .catch(err => {
            console.log(err);
        });

    }
}
