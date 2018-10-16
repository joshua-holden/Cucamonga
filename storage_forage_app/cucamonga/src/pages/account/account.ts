import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { AccountEditPage } from '../account-edit/account-edit';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireObject } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';
import { Account, Posting } from '../../classes';
import { AngularfireDbProvider } from '../../providers/angularfiredb-service/angularfiredb-service';
import { Observable } from "rxjs";
import { EditListingPage } from '../edit-listing/edit-listing';

@IonicPage()
@Component({
    selector: 'page-account',
    templateUrl: 'account.html',
})
export class AccountPage {

    private account: Observable<{}>;
    private posts: Posting[] = [];

    constructor(public navCtrl: NavController,
        public popoverCtrl: PopoverController,
        public afa: AngularFireAuth,
        public afdb: AngularfireDbProvider,
        public navParams: NavParams) {
        this.afa.authState.subscribe(auth => {
            if (auth != null) {
                this.account = afdb.getAccount(auth.uid);
                this.afdb.getAllPosts().valueChanges().subscribe(posts => {
                    this.posts = posts.filter(post => post.userID === auth.uid);
                });
            }
        });
    }

    presentPopover(myEvent) {
        let popover = this.popoverCtrl.create(PopoverPage);
        popover.present({
            ev: myEvent
        });
    }

    editAccount() {
        this.navCtrl.push(AccountEditPage)
    }

  openListing(post) {
    var postID = post.postID;
    var title = post.title;
    var address = post.address;
    var description = post.description;
    var price = post.price;
    var size = post.size;
    let amenities = post.amenities;
    let images = post.images;
    let data = {
      postID: postID,
      title: title,
      address: address,
      description: description,
      price: price,
      size:size,
      amenities: amenities,
      images: images
    };
    console.log(data);
    this.navCtrl.push(EditListingPage, data);
  }
}

