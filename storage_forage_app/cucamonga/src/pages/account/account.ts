import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularfireDbProvider } from '../../providers/angularfiredb-service/angularfiredb-service';
import { Posting, getPriceString } from '../../classes';
import { AccountEditPage } from '../account-edit/account-edit';
import { EditListingPage } from '../edit-listing/edit-listing';
import { ListingPage } from '../listing/listing';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import { Observable } from "rxjs";

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
     * @constructor
     */
    constructor(public navCtrl: NavController,
        public popoverCtr: PopoverController,
        public afa: AngularFireAuth,
        public afdb: AngularfireDbProvider) {
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
                        });
                    });
                    
                })
            }
        });
    }

    priceString = getPriceString;

    /**
     * Presents the modal which logs the user out.
     * @param myEvent
     */
    presentPopover(myEvent) {
      let popover = this.popoverCtr.create(PopoverPage);
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

