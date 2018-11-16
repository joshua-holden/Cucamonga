import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { AccountEditPage } from '../account-edit/account-edit';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireObject } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';
import { Account, Posting, Reservation, getPriceString } from '../../classes';
import { AngularfireDbProvider } from '../../providers/angularfiredb-service/angularfiredb-service';
import { Observable } from "rxjs";
import { EditListingPage } from '../edit-listing/edit-listing';
import { ListingPage } from '../listing/listing';

@IonicPage()
@Component({
    selector: 'page-account',
    templateUrl: 'account.html',
})
export class AccountPage {

    private account: Observable<{}>;
    private posts: Posting[] = [];
    private reservations = [];

    /**
     * Constructor for account.
     * @constructor
     */
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
                this.afdb.getAllReservations().valueChanges().subscribe(reservations => {
                    reservations.filter(reservation => reservation.userID === auth.uid)
                        .forEach(reservation => {
                          this.afdb.getPost(reservation.postID).subscribe(post => {
                              this.reservations.push({ reservation: reservation, posting: post });
                              console.log(this.reservations);
                        });
                    });
                    
                })
            }
        });
    }

    priceString = getPriceString;

    presentPopover(myEvent) {
        let popover = this.popoverCtrl.create(PopoverPage);
        popover.present({
            ev: myEvent
        });
    }

    editAccount() {
        this.navCtrl.push(AccountEditPage)
    }

    openEditPosting(post) {
      this.navCtrl.push(EditListingPage, post);
    }

    openViewPosting(post) {
      this.navCtrl.push(ListingPage, post);
    }
}

