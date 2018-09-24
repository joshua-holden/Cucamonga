import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireObject } from '@angular/fire/database';
import { Account } from '../../classes';
import { AngularfireDbProvider } from '../../providers/angularfiredb-service/angularfiredb-service';
import { Observable } from "rxjs";

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

    private userId: any;
    private account: Observable<AngularFireObject<Account>>;

    constructor(public navCtrl: NavController,
        public afa: AngularFireAuth,
        public afdb: AngularfireDbProvider,
        public navParams: NavParams) {
        this.afa.authState.subscribe(auth => {
            this.account = afdb.getAccount(auth.uid);
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

}
