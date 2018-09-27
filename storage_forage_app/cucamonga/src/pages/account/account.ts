import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireObject } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';
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
    private account: Observable<{}>;
    private posts: AngularFireList<any>;

    constructor(public navCtrl: NavController,
        public popoverCtrl: PopoverController,
        public afa: AngularFireAuth,
        public afdb: AngularfireDbProvider,
        public navParams: NavParams) {
        this.afa.authState.subscribe(auth => {
            if(auth != null) this.account = afdb.getAccount(auth.uid);
        });

        /*this.posts = this.fdb.list('/posts/', ref =>ref.orderByChild('userID').equalTo(account.uid));
        console.log(posts);*/

  }

  presentPopover(myEvent) {
      let popover = this.popoverCtrl.create(PopoverPage);
      popover.present({
          ev: myEvent
      });
  }
}
