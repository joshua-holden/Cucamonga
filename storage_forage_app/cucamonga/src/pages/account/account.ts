import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { HTTP } from '@ionic-native/http';
import { PopoverPage } from '../popover/popover';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireObject } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';
import { Account, Posting } from '../../classes';
import { AngularfireDbProvider } from '../../providers/angularfiredb-service/angularfiredb-service';
import { FirestoreProvider } from '../../providers/firestore-service/firestore-service';
import { Observable } from "rxjs";
import { EditListingPage } from '../edit-listing/edit-listing';

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
        public file: File, 
        public http: HTTP,
        public afa: AngularFireAuth,
        public afdb: AngularfireDbProvider,
        public fsp: FirestoreProvider,
        public navParams: NavParams) {
        this.afa.authState.subscribe(auth => {
            if (auth != null) this.account = afdb.getAccount(auth.uid);
            this.afdb.getAllPosts().valueChanges().subscribe(posts => {
                this.posts = posts.filter(post => post.userID === auth.uid);
            });
        });

  }

  openListing(post) {
    var id = post.userID;
    var title = post.title;
    var address = post.address;
    var description = post.description;
    var price = post.price;
    var size = post.size;
    let amenities = post.amenities;
    let images = post.images;
    let data = {
      posterID: id,
      title: title,
      address: address,
      description: description,
      price: price,
      size:size,
      amenities: amenities
    };
    console.log(data);
    this.navCtrl.push(EditListingPage, data);
  }

  presentPopover(myEvent) {
      let popover = this.popoverCtrl.create(PopoverPage);
      popover.present({
          ev: myEvent
      });
  }
}
