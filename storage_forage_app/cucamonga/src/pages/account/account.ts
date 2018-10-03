import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireObject } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';
import { Account, Posting } from '../../classes';
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
    private posts: Posting[] = [];

    constructor(public navCtrl: NavController,
        public popoverCtrl: PopoverController,
        public afa: AngularFireAuth,
        public afdb: AngularfireDbProvider,
        public navParams: NavParams) {
        this.afa.authState.subscribe(auth => {
            if (auth != null) this.account = afdb.getAccount(auth.uid);
            this.afdb.getAllPosts().valueChanges().subscribe(posts => {
                this.posts = posts.filter(post => post.userID === auth.uid);
            });
        });

  }

  presentPopover(myEvent) {
      let popover = this.popoverCtrl.create(PopoverPage);
      popover.present({
          ev: myEvent
      });
  }
}
